import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        logging: false,
        // Configuración optimizada para ~200 usuarios concurrentes
        connectTimeoutMS: 5000, // 5 segundos timeout de conexión
        extra: {
          connectionTimeoutMillis: 2000, // 2 segundos para establecer conexión
          statement_timeout: 2000, // 2 segundos timeout para statements
          idle_in_transaction_session_timeout: 2000,
          max: 50, // Pool máximo para soportar alta concurrencia
          min: 10, // Mantener 10 conexiones listas
          idleTimeoutMillis: 30000, // Mantener conexiones 30s antes de cerrarlas
        }
      }),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
