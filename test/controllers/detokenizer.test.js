import sinon from "sinon";
import supertest from "supertest";
import server from "../../index.js";
import tokenRepository from "../../src/repositories/tokenRepository.js";

describe("detokenize service", () => {
  afterEach(function () {
    server.close();
    sinon.restore();
  });

  describe("Failure test", () => {
    it("- Should not call storage and return 400 if request body is not valid", async function () {
      const getPanByStub = sinon
        .stub(tokenRepository, "getPanBy")
        .callsFake(sinon.fake.returns([]));
      const res = await supertest(server).post("/detokenize").send({});

      sinon.assert.notCalled(getPanByStub);

      expect(res.status).toBe(400);
      expect(res.text).toBe("Request body can not be empty");
    });

    it("- Should return 404 if any of the tokens not exist in token storage", async function () {
      sinon
        .stub(tokenRepository, "getPanBy")
        .callsFake(sinon.fake.returns(["5-4-3-2-1"]));
      const res = await supertest(server)
        .post("/detokenize")
        .send(["1-2-3-4-5", "5-4-3-2-1", "6-5-4-3-2-1"]);

      expect(res.status).toBe(404);
      expect(res.text).toBe("Token not found");
    });
  });

  describe("Happy Path", () => {
    it("- Should return 200 and result from token storage", async function () {
      const mockResult = ["5-4-3-2-1"];
      const getPanBySpy = sinon
        .stub(tokenRepository, "getPanBy")
        .callsFake(sinon.fake.returns(mockResult));

      const res = await supertest(server)
        .post("/detokenize")
        .send(["1-2-3-4-5"]);

      sinon.assert.called(getPanBySpy);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockResult);
    });
  });
});
