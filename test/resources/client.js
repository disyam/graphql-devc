const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { onError } = require("apollo-link-error");
const fetch = require("node-fetch");

module.exports = port => {
  const errorLink = onError(({ networkError }) => {
    if (networkError) {
      if (networkError.result) {
        console.log(networkError.result);
        if (networkError.result.errors.length) {
          networkError.result.errors.forEach(error => {
            console.log(error);
          });
        }
      }
    }
  });
  const httpLink = new HttpLink({
    uri: `http://127.0.0.1:${port}/graphql`,
    fetch
  });
  const link = errorLink.concat(httpLink);
  const cache = new InMemoryCache();
  const defaultOptions = {
    query: {
      fetchPolicy: "network-only"
    }
  };
  return new ApolloClient({
    link,
    cache,
    defaultOptions
  });
};
