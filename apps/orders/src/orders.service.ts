import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrderRepository } from './orders.repository';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RmqModule, RmqService } from '@app/common';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository, @Inject(BILLING_SERVICE) private billingClient: ClientProxy) {}

  async createOrder(request: CreateOrderRequest) {
    Logger.log("creating an order!");
    const order = await this.orderRepository.create(request);
    this.billingClient.emit('order_created', { request });
    return order;
  }

  async getOrders() {
    Logger.log("get orders!") 
    this.billingClient.emit('orders_fetched', { abc: 123 });
    return this.orderRepository.find({});
  }
}
