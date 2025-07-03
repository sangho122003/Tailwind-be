import { PartialType } from '@nestjs/swagger';
import { CreateVideoBlockSecondDto } from './create-video-block-second.dto';

export class UpdateVideoBlockSecondDto extends PartialType(CreateVideoBlockSecondDto) {}
