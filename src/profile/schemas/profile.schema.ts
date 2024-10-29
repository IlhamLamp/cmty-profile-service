import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
    @Prop({ type: Number, required: true, unique: true, })
    user_id: number;

    @Prop({ type: String, required: true, })
    first_name: string;

    @Prop({ type: String, required: false, })
    last_name: string;

    @Prop({ type: String, unique: true, required: true })
    username: string;

    @Prop({ type: Number, required: false, })
    phone: number;

    @Prop({ type: Date })
    birthday: Date;

    @Prop({ type: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip_code: { type: Number },
    }})
    address: {
        street: string;
        city: string;
        state: string;
        zip_code: number;
    };

    @Prop({ type: String })
    profile_picture: string;

    @Prop({ type: String })
    profile_cover: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role', required: false, })
    role: MongooseSchema.Types.ObjectId;

    @Prop({ type: {
        value: { type: String, required: true },
        label: { type: String, required: true },
    }})
    experience: {
        value: string;
        label: string;
    };
      
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Tag', required: false, }])
    tags: MongooseSchema.Types.ObjectId[];

    @Prop({ type: String })
    about: string;

    @Prop([
    {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        icon: { type: String, required: false},
        link: { type: String, required: false },
        is_exist: { type: Boolean, default: false },
    },
    ])
    social_links: Array<{ id: number; name: string; icon: string; link: string; is_exist: boolean }>;

    @Prop({ type: Boolean, default: true })
    is_active: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
