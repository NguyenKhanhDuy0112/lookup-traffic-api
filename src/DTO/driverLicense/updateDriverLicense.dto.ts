import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDriverLicenseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  license_number?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  license_type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  issued_date?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expiration_date?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  issuing_authority?: string;
}
