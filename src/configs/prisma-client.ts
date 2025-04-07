import { PrismaClient } from '@prisma/client';

const client = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['error', 'info', 'warn']
      : undefined,
});

export default client;
