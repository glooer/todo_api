import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { Task } from './task/task.entity';
import { TaskModule } from './task/task.module';
import { User } from './users/user.entity';


@Module({
  imports: [
    AuthModule,
    TaskModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Task],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      },
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class AppModule {}
