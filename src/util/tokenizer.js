const { createHash, randomBytes } = await import('node:crypto');

const tokenize = (/** @type {string} */ plainTextPAN) => {
  if (typeof plainTextPAN === 'string' && plainTextPAN) {
    const hash = createHash('SHA256');
    const generatedRandomBytes = randomBytes(4);

    hash.update(plainTextPAN);
    hash.update(generatedRandomBytes);

    const token = hash.copy().digest('hex').slice(0, plainTextPAN.length);

    return token;
  }
  throw new Error('Incorrect input format for PAN');
};

export { tokenize };
