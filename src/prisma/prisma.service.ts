import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
    constructor() {
        const adapter = new PrismaNeon({
            connectionString: process.env.DATABASE_URL,
        });
        super({ adapter });
    }
  
  async onModuleInit() {
    // Initialization logic here
    await this.$connect();
  }
  async onModuleDestroy() {
    // Cleanup logic here
    await this.$disconnect();
  }
}
