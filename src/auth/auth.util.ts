import { createHash as createCryptoHash } from 'node:crypto'

export const createHash = (password: string) => {
  return createCryptoHash('md5').update(password).digest("hex");
}
