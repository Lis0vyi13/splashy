import { PrismaClient } from 'generated/prisma';

export class AuthUtils {
  static async generateUniqueUsername(
    prisma: PrismaClient,
    email: string,
  ): Promise<string> {
    const base = email
      .split('@')[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');

    let username = base;
    let counter = 1;

    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${base}${counter}`;
      counter++;
    }

    return username;
  }
}
