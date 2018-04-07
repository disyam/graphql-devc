const { makeExecutableSchema } = require("graphql-tools");
const gql = require("graphql-tag");

const resolvers = require("./resolvers");

const typeDefs = gql`
  type Query {
    "get all races"
    allRaces: [Race!]!
    "get one race by id"
    race(id: ID!): Race!
  }

  "mutation"
  type Mutation {
    "create race"
    createRace(input: RaceInput!): Race!
    "update race"
    updateRace(id: ID!, input: RaceInput!): Race!
    "remove race"
    removeRace(id: ID!): String!
  }

  "faction enum"
  enum FactionEnum {
    Alliance
    Horde
  }

  "race"
  type Race {
    "id"
    id: ID!
    "name"
    name: String!
    "faction"
    faction: FactionEnum!
    "capital"
    capital: String!
    "leaders"
    leaders: [String!]!
    "mount"
    mount: String!
  }

  "race input"
  input RaceInput {
    "name"
    name: String!
    "faction"
    faction: FactionEnum!
    "capital"
    capital: String!
    "leaders"
    leaders: [String!]!
    "mount"
    mount: String!
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
