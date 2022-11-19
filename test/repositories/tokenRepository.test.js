import sinon from "sinon";
import { tokenCollection } from "../../src/connectors/dbConnector.js";
import tokenRepository from "../../src/repositories/tokenRepository.js";

import tokenizer from "../../src/util/tokenizer.js";

describe("token repository test", () => {
  afterEach(function () {
    sinon.restore();
  });

  describe("getTokensBy", () => {
    const mockItem = { token: "token" };
    const fakePan = "fakePan";

    it("- Should return token if item is found", function () {
      const tokenFindOneStub = sinon
        .stub(tokenCollection, "findOne")
        .callsFake(sinon.fake.returns(mockItem));

      const token = tokenRepository.getTokensBy(fakePan);

      sinon.assert.calledWith(tokenFindOneStub, { pan: { $eq: fakePan } });

      expect(token).toEqual(mockItem.token);
    });

    it("- Should return null if item is not found", function () {
      const tokenFindOneStub = sinon
        .stub(tokenCollection, "findOne")
        .callsFake(sinon.fake.returns(null));

      const token = tokenRepository.getTokensBy(fakePan);

      sinon.assert.calledWith(tokenFindOneStub, { pan: { $eq: fakePan } });

      expect(token).toBeUndefined();
    });
  });

  describe("generateTokensFor", () => {
    const mockItem = { token: "token" };
    const fakePan = "fakePan";
    const generatedToken = "generated";

    it("- Should not generate and return existing token if exists", function () {
      const tokenFindOneStub = sinon
        .stub(tokenRepository, "getTokensBy")
        .callsFake(sinon.fake.returns(mockItem.token));

      const tokens = tokenRepository.generateTokensFor([fakePan]);

      sinon.assert.calledWith(tokenFindOneStub, fakePan);

      expect(tokens).toEqual([mockItem.token]);
    });

    it("- Should return generated token if token look up return undefined", function () {
      const tokenFindOneStub = sinon
        .stub(tokenRepository, "getTokensBy")
        .callsFake(sinon.fake.returns(undefined));
      const tokenizeStub = sinon
        .stub(tokenRepository, "generateAndInsertToken")
        .callsFake(sinon.fake.returns(generatedToken));

      const tokens = tokenRepository.generateTokensFor([fakePan]);

      sinon.assert.calledWith(tokenFindOneStub, fakePan);
      sinon.assert.calledWith(tokenizeStub, fakePan);

      expect(tokens).toEqual([generatedToken]);
    });
  });

  describe("getPanBy", () => {
    it("- Should return found tokens from collection", () => {
      const foundItems = [{ pan: "1" }, { pan: "2" }, { pan: "3" }];
      const pans = foundItems.map(({ pan }) => pan);
      const tokensToFind = ["3", "4", "5"];
      const tokenCollectionFindStub = sinon
        .stub(tokenCollection, "find")
        .callsFake(sinon.fake.returns(foundItems));

      const tokens = tokenRepository.getPanBy(tokensToFind);

      tokenCollectionFindStub.calledWith({ token: { $in: tokensToFind } });
      expect(tokens).toEqual(pans);
    });
  });

  describe("generateAndInsertToken", () => {
    const generatedToken = "token";
    const fakePan = "fakePan";

    it("- Should return generated token if token look up return undefined", function () {
      const tokenizeStub = sinon
        .stub(tokenizer, "tokenize")
        .callsFake(sinon.fake.returns(generatedToken));

      const collectionInsertSpy = sinon.spy(tokenCollection, "insert");

      const token = tokenRepository.generateAndInsertToken(fakePan);

      sinon.assert.calledWith(tokenizeStub, fakePan);
      sinon.assert.calledWithMatch(collectionInsertSpy, {
        token: generatedToken,
        pan: fakePan,
      });

      expect(token).toEqual(generatedToken);
    });
  });
});
