import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  lastname: string;

  @IsDateString()
  @ApiProperty()
  birthday: Date;

  @IsOptional()
  @ApiProperty()
  age?: number;
}
