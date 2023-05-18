import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { AbstractDocument } from "@app/common"
import { extend } from "joi"
import { strict } from "assert"

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    phoneNumber: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);