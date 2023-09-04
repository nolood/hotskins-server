import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inventory } from './inventories/inventories.model';
import { InventoriesModule } from './inventories/inventories.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SkinsModule } from './skins/skins.module';
import { CratesModule } from './crates/crates.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Inventory],
      autoLoadModels: true,
    }),
    UsersModule,
    InventoriesModule,
    AuthModule,
    SkinsModule,
    CratesModule,
  ],
})
export class AppModule {}
