import * as bcrypt from 'bcrypt';

class BcryptUtils {
  public static async hashPassword(rawPassword: string) {
    const salt = Number(process.env.SALT) || 10;
    const hashPassword = await bcrypt.hash(rawPassword, salt);
    return hashPassword;
  }

  public static async ComparePassword(
    rawPassword: string,
    hashPassword: string
  ) {
    return await bcrypt.compare(rawPassword, hashPassword);
  }
}

export default BcryptUtils;
