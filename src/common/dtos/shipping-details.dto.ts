import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShippingDetailsDto {
  @Expose()
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  givenNames!: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  familyNames!: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  city!: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  postalCode!: number;

  @Expose()
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  countryCode!: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  address!: string;
}
