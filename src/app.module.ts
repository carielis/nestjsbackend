import { DateScalar } from './date.scalar';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.1.48',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'stage',
      synchronize: true,
      entities: ['../src/**/*.entity.ts ', '../dist/**/*.entity.js'],
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
      buildSchemaOptions: {
        dateScalarMode: 'isoDate',
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
