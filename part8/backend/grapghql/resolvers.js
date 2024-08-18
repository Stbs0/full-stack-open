const { PubSub } = require("graphql-subscriptions");
const Book = require("../models/Book");
const { GraphQLError } = require("graphql");
const Author = require("../models/Author");
const User = require("../models/User");
const pubsub = new PubSub();
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    authorCount: async () =>
      await Author.collection.countDocuments({}).catch((err) => {
        throw new GraphQLError(err);
      }),

    bookCount: async () => await Book.find({}).length,
    allBooks: async (root, args) => {
      let query = {};
      console.log("BOOK_find");
      args.author && (query.author = args.author);
      args.genre && (query.genres = { $in: args.genre });
      return await Book.find(query).populate("author").catch((err) => console.log(err));
    },

    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },
 
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          throw new GraphQLError("Author not found", {
            extensions: {
              code: "NOT_FOUND",
              invalidArg: "author",
            },
          });
        }
        const book = new Book({ ...args, author: author._id });

        await book.save();

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

        return book;
      } catch (error) {
        throw new GraphQLError("Saving user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      return await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true },
      ).catch((err) => {
        throw new GraphQLError("error2", {
          extensions: {
            code: "BAD_USER_INPUT",
            err,
          },
        });
      });
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return await user.save().catch((err) => {
        throw new GraphQLError("error3", {
          extensions: {
            code: "BAD_USER_INPUT",
            err,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};
module.exports = resolvers;
