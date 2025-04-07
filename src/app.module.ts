import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorieController } from './categorie/categorie.controller';
import { CategorieModule } from './categorie/categorie.module';

@Module({
  imports: [CategorieModule],
  controllers: [AppController, CategorieController],
  providers: [AppService],
})
export class AppModule {}
