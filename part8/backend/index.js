const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const Author = require("./models/Author");
const Book = require("./models/Book");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
mongoose.set("strictQuery", false);
require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Book {
title: String!
published: Int!
author: Author!
genres: [String!]!
}

type Author {
  name: String!
  born: Int
  id:ID!
  bookCount: Int
  }

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String,genre: String): [Book!]!
  allAuthors: [Author!]!
    me: User

}

  type Mutation {
  addBook(
  title: String!
  author: String!
  published: Int!
  genres: [String!]!   

  ) : Book 

  editAuthor(name:String!, setBornTo:Int!) : Author

   createUser(
    username: String!
    favoriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token
  }
`;
const resolvers = {
  Query: {
    authorCount: async () =>
      await Author.collection.countDocuments({}).catch((err) => {
        throw new GraphQLError(err);
      }),

    bookCount: async () => await Book.find({}).length,
    allBooks: async (root, args) => {
      let query = {};
      console.log(args.genre);
      args.author && (query.author = args.author);
      args.genre && (query.genres = { $in: args.genre });
      return await Book.find(query).catch((err) => console.log(err));
    },

    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },
  Book: {
    author: async (root) => {
      return await Author.findById(root.author);
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

      return await book.save().catch((err) => {
        throw new GraphQLError("error1", {
          extensions: {
            code: "BAD_USER_INPUT",
            err,
          },
        });
      });
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET,
        );
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (error) {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
            err,
          },
        });
      }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
