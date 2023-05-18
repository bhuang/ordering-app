import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService, 
    private readonly rmqService: RmqService) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }

  @EventPattern('orders_fetched')
  async handleOrdersFetched(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.ping(data);
    this.rmqService.ack(context);
  }
}
