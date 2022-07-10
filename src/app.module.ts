import { Module } from '@nestjs/common';
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-54-170-90-26.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'qzwsrmfcvtlqtu',
      password: 'b82b527dfd081a89476a5703890d5c5c7758f7575a7eaf53f50f355aff4b699d',
      database: 'd96p5v1kvhdlju',
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
