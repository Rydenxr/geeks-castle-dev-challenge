import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerUseCase } from 'src/applications/use-cases/customer/customer.use-case';
import { CreateCustomerDto } from '../../applications/dtos/create-customer.dto';
import { UpdateCustomerDto } from '../../applications/dtos/update-customer.dto';

@Controller('customers')
@ApiTags('customers')
export class CustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Customer successfully created.' })
  createUser(@Body() args: CreateCustomerDto) {
    return this.createCustomerUseCase.create(args);
  }

  @Patch(':customerId')
  @ApiResponse({ status: 200, description: 'Customer successfully updated.' })
  async updateCustomer(
    @Param('customerId') customerId: string,
    @Body() args: UpdateCustomerDto,
  ) {
    await this.createCustomerUseCase.update(customerId, args);
    return {
      message: 'Customer updated successfully',
    };
  }
}
