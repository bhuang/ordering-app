import { Module } from "@nestjs/common";
import { RmqService } from "./rmq.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

interface RmqModuleOptions {
    name: string;
}
@Module({
    providers: [RmqService],
    exports: [RmqService]
})
export class RmqModule {
    static register({ name }: RmqModuleOptions) {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [configService.get<string>('RABBIT_MQ_URI')],
                                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
                            },
                        }),
                        inject: [ConfigService]
                    }
                ])
            ],
            exports: [ClientsModule]
        }
    }
}