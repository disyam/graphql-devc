const gql = require("graphql-tag");

const raceFields = gql`
  fragment raceFields on Race {
    id
    name
    faction
    capital
    leaders
    mount
  }
`;

const allRacesQuery = gql`
  query allRaces {
    allRaces {
      ...raceFields
    }
  }
  ${raceFields}
`;

const raceQuery = gql`
  query race($id: ID!) {
    race(id: $id) {
      ...raceFields
    }
  }
  ${raceFields}
`;

const createRaceMutation = gql`
  mutation createRace($input: RaceInput!) {
    createRace(input: $input) {
      ...raceFields
    }
  }
  ${raceFields}
`;

const updateRaceMutation = gql`
  mutation updateRace($id: ID!, $input: RaceInput!) {
    updateRace(id: $id, input: $input) {
      ...raceFields
    }
  }
  ${raceFields}
`;

const removeRaceMutation = gql`
  mutation removeRace($id: ID!) {
    removeRace(id: $id)
  }
`;

module.exports = {
  allRacesQuery,
  raceQuery,
  createRaceMutation,
  updateRaceMutation,
  removeRaceMutation
};
