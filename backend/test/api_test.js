const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const knex = require("../src/config/knex");

const createServer = require("../src/server");
const server = createServer();

describe("api-test", () => {
  let request;
  let expect;
  beforeEach(() => {
    request = chai.request(server);
    expect = chai.expect;
  });
  //--------------------------------------------------------------

  describe("[get: /api/areas]", () => {
    it("Should have status is 200.", done => {
      request.get("/api/areas").end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
    });

    it("Must be obj in array.", done => {
      request.get("/api/areas").end((err, res) => {
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.be.an("object");
        done();
      });
    });

    it("All data in the area table must be returned.", async () => {
      const dbData = await knex("areas");
      request.get("/api/areas").end((err, res) => {
        expect(res.body.length).to.equal(dbData.length);
      });
    });
  });

  //--------------------------------------------------------------

  describe("[get: /api/spots/:area]", () => {
    it("Should have status is 200.", () => {
      request.get("/api/spots/1").end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
    });

    it("Must be obj in array.", done => {
      request.get("/api/spots/1").end((err, res) => {
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.be.an("object");
        done();
      });
    });

    it("Must return data matching the path parameter.", async () => {
      const dbData = await knex("tourist_spots").where({ area_id: 1 });
      request.get("/api/spots/1").end((err, res) => {
        expect(res.body).to.eql(dbData);
      });
    });
  });

  //--------------------------------------------------------------
});
