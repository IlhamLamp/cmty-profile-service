import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
    @Prop({ type: String, required: true,})
    name: string;

    @Prop({ type: String, required: false,})
    description: string;

    @Prop({ type: Boolean, required: false, default: true,})
    is_active: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);