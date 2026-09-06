import { PartialType } from '@nestjs/swagger';
import { CreateCachDto } from './create-cach.dto.js';

export class UpdateCachDto extends PartialType(CreateCachDto) {}
