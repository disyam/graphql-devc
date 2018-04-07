const { expect } = require("chai").use(require("chai-as-promised"));
const getPort = require("get-port");
const koa = require("koa");

const seed = require("../seeders/seed");
const {
  allRacesQuery,
  raceQuery,
  createRaceMutation,
  updateRaceMutation,
  removeRaceMutation
} = require("./resources/query");

let app, client;

describe("race", () => {
  before(async () => {
    try {
      await seed();
      app = new koa();
      app = require("../app")(app);
      const port = await getPort();
      client = require("./resources/client")(port);
      app.listen(port);
    } catch (error) {
      throw error;
    }
  });
  it("should able to get all races", async () => {
    try {
      const { data: { allRaces } } = await client.query({
        query: allRacesQuery
      });
      expect(allRaces).lengthOf(8);
      expect(allRaces[0].name).a("string");
      expect(allRaces[0].faction).a("string");
      expect(allRaces[0].capital).a("string");
      expect(allRaces[0].leaders).an("array");
      expect(allRaces[0].leaders[0]).a("string");
      expect(allRaces[0].mount).a("string");
    } catch (error) {
      throw error;
    }
  });
  it("should able to get one races", async () => {
    try {
      const { data: { allRaces: [{ id }] } } = await client.query({
        query: allRacesQuery
      });
      const {
        data: { race: { name, faction, capital, leaders, mount } }
      } = await client.query({
        query: raceQuery,
        variables: { id }
      });
      expect(name).equal("Human");
      expect(faction).equal("Alliance");
      expect(capital).equal("Stormwind City");
      expect(leaders).deep.equal(["Varian Wrynn"]);
      expect(mount).equal("Horse");
    } catch (error) {
      throw error;
    }
  });
  it("should able to create race", async () => {
    try {
      const { data: { createRace: { id } } } = await client.mutate({
        mutation: createRaceMutation,
        variables: {
          input: {
            name: "Draenei",
            faction: "Alliance",
            capital: "The Exodar",
            leaders: ["Prophet Velen"],
            mount: "Elekk"
          }
        }
      });
      const {
        data: { race: { name, faction, capital, leaders, mount } }
      } = await client.query({
        query: raceQuery,
        variables: { id }
      });
      expect(name).equal("Draenei");
      expect(faction).equal("Alliance");
      expect(capital).equal("The Exodar");
      expect(leaders).deep.equal(["Prophet Velen"]);
      expect(mount).equal("Elekk");
    } catch (error) {
      throw error;
    }
  });
  it("should able to update race", async () => {
    try {
      const { data: { createRace: { id } } } = await client.mutate({
        mutation: createRaceMutation,
        variables: {
          input: {
            name: "Worgen",
            faction: "Horde",
            capital: "Gilneas City",
            leaders: ["Genn Greymane"],
            mount: "Running Wild"
          }
        }
      });
      await client.mutate({
        mutation: updateRaceMutation,
        variables: {
          id,
          input: {
            name: "Worgen",
            faction: "Alliance",
            capital: "Gilneas City",
            leaders: ["Genn Greymane"],
            mount: "Running Wild"
          }
        }
      });
      const {
        data: { race: { name, faction, capital, leaders, mount } }
      } = await client.query({
        query: raceQuery,
        variables: { id }
      });
      expect(name).equal("Worgen");
      expect(faction).equal("Alliance");
      expect(capital).equal("Gilneas City");
      expect(leaders).deep.equal(["Genn Greymane"]);
      expect(mount).equal("Running Wild");
    } catch (error) {
      throw error;
    }
  });
  it("should able to remove race", async () => {
    try {
      const { data: { createRace: { id } } } = await client.mutate({
        mutation: createRaceMutation,
        variables: {
          input: {
            name: "Blood Elf",
            faction: "Horde",
            capital: "Silvermoon City",
            leaders: ["Lor’themar Theron"],
            mount: "Hawkstrider"
          }
        }
      });
      const { data: { removeRace } } = await client.mutate({
        mutation: removeRaceMutation,
        variables: { id }
      });
      expect(removeRace).equal("OK");
      await expect(
        client.query({
          query: raceQuery,
          variables: { id }
        })
      ).rejectedWith(
        "GraphQL error: Cannot return null for non-nullable field Query.race."
      );
    } catch (error) {
      throw error;
    }
  });
});
