import { PartialType } from '@nestjs/swagger';
import { CreateVideoBlockDto } from './create-video-block.dto';

export class UpdateVideoBlockDto extends PartialType(CreateVideoBlockDto) {}
