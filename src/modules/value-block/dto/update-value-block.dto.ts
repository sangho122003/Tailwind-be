import { PartialType } from '@nestjs/swagger';
import { CreateValueBlockDto } from './create-value-block.dto';

export class UpdateValueBlockDto extends PartialType(CreateValueBlockDto) {}
