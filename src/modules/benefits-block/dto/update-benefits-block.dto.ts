import { PartialType } from '@nestjs/swagger';
import { CreateBenefitsBlockDto } from './create-benefits-block.dto';

export class UpdateBenefitsBlockDto extends PartialType(CreateBenefitsBlockDto) {}
