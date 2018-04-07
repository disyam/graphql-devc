const { Race } = require("../models");

module.exports = {
  Query: {
    allRaces: () => Race.find(),
    race: (obj, { id }) => Race.findById(id)
  },
  Mutation: {
    createRace: (obj, { input }) => Race.create(input),
    updateRace: (obj, { id, input }) =>
      Race.findByIdAndUpdate(id, input, { new: true }),
    removeRace: async (obj, { id }) => {
      try {
        await Race.findByIdAndRemove(id);
        return "OK";
      } catch (error) {
        throw error;
      }
    }
  }
};
