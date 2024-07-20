import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrafficViolationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  violation_date?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  violation_type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  fine_amount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  points_deducted?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;
}
