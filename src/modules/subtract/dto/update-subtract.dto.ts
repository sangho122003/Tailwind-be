import { PartialType } from '@nestjs/swagger';
import { CreateSubtractDto } from './create-subtract.dto';

export class UpdateSubtractDto extends PartialType(CreateSubtractDto) {}
