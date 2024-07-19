import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateCustomerUseCase } from 'src/applications/use-cases/customer/customer.use-case';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('customers')
@ApiTags('customers')
export class CustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Customer successfully created.' })
  async createUser(@Body() args: CreateCustomerDto) {
    return await this.createCustomerUseCase.create(args);
  }

  @Patch(':customerId')
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
