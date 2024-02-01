import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ShippingDetailsDto } from '../../../../common/dtos/shipping-details.dto';

export class PlaceOrderV1RequestDto {
  @Expose()
  @IsNotEmpty({ always: true })
  @ValidateNested({ always: true })
  @Type(() => ShippingDetailsDto)
  shippingDetails: ShippingDetailsDto;
}
