import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: CreateOrderRequest) {
    console.log('asdf');
    return this.ordersService.createOrder(request);
  }

  @Get('all/:order_id')
  
  async getOrders(@Param() params: any) {
    console.log('order id of ' + params.order_id);
    return this.ordersService.getOrders();
  }
}
