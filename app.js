const { graphqlKoa, graphiqlKoa } = require("apollo-server-koa");
const koaBody = require("koa-bodyparser");
const koaRouter = require("koa-router");

const schema = require("./modules/schema");

module.exports = app => {
  const router = new koaRouter();
  router.post("/graphql", koaBody(), graphqlKoa({ schema, debug: false }));
  router.get("/graphiql", graphiqlKoa({ endpointURL: "/graphql" }));
  app.use(router.routes());
  app.use(router.allowedMethods());
  return app;
};
