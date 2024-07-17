import { Module } from '@nestjs/common';
import { ApiDocsIndexController } from './api-docs-index.controller';

@Module({
  imports: [],
  controllers: [ApiDocsIndexController],
  providers: [],
})
export class ModuleDocsIndexModule {}
