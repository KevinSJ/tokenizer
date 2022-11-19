const { createHash, randomBytes } = await import("node:crypto");

const tokenizer = {
  /**
   * @param {any} plainTextPAN
   */
  tokenize(plainTextPAN) {
    if (typeof plainTextPAN === "string" && plainTextPAN.length > 0) {
      const hash = createHash("SHA256");
      const generatedRandomBytes = randomBytes(4);

      hash.update(plainTextPAN, "utf8");
      hash.update(generatedRandomBytes);

      const token = hash.copy().digest("hex");

      return token.slice(0, plainTextPAN.length);
    }

    throw new Error("Incorrect input format for PAN");
  },
};

export default tokenizer;
