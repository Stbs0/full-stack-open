const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");
const Author = require("./models/Author");
const Book = require("./models/Book");
const resolvers = require("./grapghql/resolvers");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const http = require("http");
const typeDefs = require("./grapghql/typedefs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
mongoose.set("debug",false)
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

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET,
          );
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    }),
  );

  const PORT = 4001;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`),
  );
};

start();
