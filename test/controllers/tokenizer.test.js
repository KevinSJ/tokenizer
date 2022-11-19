import sinon from "sinon";
import supertest from "supertest";
import server from "../../index.js";
import tokenRepository from "../../src/repositories/tokenRepository.js";

describe("tokenize service", () => {
  afterEach(function () {
    server.close();
    sinon.restore();
  });

  describe("Failure test", () => {
    it("- Should not call storage and return 400 if request body is not valid", async function () {
      const generateTokenStub = sinon
        .stub(tokenRepository, "generateTokensFor")
        .callsFake(sinon.fake.returns([]));
      const res = await supertest(server).post("/tokenize").send({});

      sinon.assert.notCalled(generateTokenStub);

      expect(res.status).toBe(400);
      expect(res.text).toBe("Request body can not be empty");
    });
  });

  describe("Happy Path", () => {
    it("- Should return 200 and the generated token from token storage", async function () {
      const mockResult = ["5-4-3-2-1"];
      const generateTokenStub = sinon
        .stub(tokenRepository, "generateTokensFor")
        .callsFake(sinon.fake.returns(mockResult));

      const res = await supertest(server).post("/tokenize").send(["1-2-3-4-5"]);

      sinon.assert.called(generateTokenStub);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockResult);
    });
  });
});
