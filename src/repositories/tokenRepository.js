import { tokenCollection } from "../connectors/dbConnector.js";
import tokenizer from "../util/tokenizer.js";

const tokenRepository = {
  /**
   * @param {string} plainTextPan
   * @returns {string|null}
   */
  getTokensBy(plainTextPan) {
    const foundItem = tokenCollection.findOne({ pan: { $eq: plainTextPan } });

    return foundItem?.token;
  },

  /**
   * @param {string[]} plainTextPans plain text primary account number
   */
  generateTokensFor(plainTextPans) {
    const generatedTokens = plainTextPans.map((pan) => {
      const token = this.getTokensBy(pan) ?? this.generateAndInsertToken(pan);

      return token;
    });

    return generatedTokens;
  },

  /**
   * @param {string[]} tokens
   * @returns {string[]} list of PAN matching the given tokens
   */
  getPanBy(tokens) {
    return tokenCollection
      .find({ token: { $in: tokens } })
      .map(({ pan }) => pan);
  },

  /**
   * @param {string} pan
   * @returns {string} the generated token
   */
  generateAndInsertToken(pan) {
    const token = tokenizer.tokenize(pan);

    tokenCollection.insert({ token, pan });

    return token;
  },
};

export default tokenRepository;
