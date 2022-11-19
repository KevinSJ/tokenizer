import sinon from "sinon";
import { Hash } from "crypto";
import tokenizer from "../../src/util/tokenizer";

describe("tokenizer", () => {
  it("should throw error if not passing string", () => {
    expect(() => tokenizer.tokenize(12345)).toThrowError(
      "Incorrect input format for PAN"
    );
  });

  it("- Should call genereate token from plainTextPAN", () => {
    const fakePan = "fakePan";

    const hashStub = sinon.createStubInstance(Hash);
    hashStub.digest.returns("hhhh");

    const token = tokenizer.tokenize(fakePan);

    hashStub.update.calledOnceWithExactly(fakePan, "utf8");
    hashStub.digest.calledImmediatelyAfter(hashStub.update);

    expect(token.length).toBe(fakePan.length);
  });
});
