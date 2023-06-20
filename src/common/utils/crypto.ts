import { genSaltSync, compare, hash } from 'bcryptjs';

const salt = genSaltSync(10);

export const encryptPassword = async (password: string): Promise<string> => {
  const hashed = await hash(password, salt);
  return hashed;
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const isMatch = await compare(password, hash);
  return isMatch;
};
