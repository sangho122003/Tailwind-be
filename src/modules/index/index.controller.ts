import { Controller, Get, Param } from '@nestjs/common';
import { IndexService } from './index.service';

@Controller('index')
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get(':name')
  getByName(@Param('name') name: string) {
    return this.indexService.getFullPageDataByName(name);
  }
}
