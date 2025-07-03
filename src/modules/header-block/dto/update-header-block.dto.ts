import { PartialType } from '@nestjs/swagger';
import { CreateHeaderBlockDto } from './create-header-block.dto';

export class UpdateHeaderBlockDto extends PartialType(CreateHeaderBlockDto) {}
