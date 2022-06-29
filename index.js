const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { Category } = require("./resolvers/Category");
const { Product } = require("./resolvers/Product");
const { db } = require("./db");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Mutation,
    Category,
  },
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log("Listening at : " + url);
});
