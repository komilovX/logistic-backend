import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { joiValidationSchema } from './common/config/joi.config'
import { typeOrmModuleOptions } from './common/config/typeorm.config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { HandbookModule } from './handbook/handbook.module'
import { DocumentModule } from './document/document.module'
import { DocumentTypeModule } from './document-type/document-type.module'
import { OrderModule } from './order/order.module'
import { TenderModule } from './tender/tender.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joiValidationSchema(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmModuleOptions,
    }),
    AuthModule,
    UserModule,
    HandbookModule,
    DocumentModule,
    DocumentTypeModule,
    OrderModule,
    TenderModule,
  ],
})
export class AppModule {}
