import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tag, TagDocument } from "./schemas/tag.schema";
import { Model } from "mongoose";
import { CreateTagDto } from "./dto/create-tag.dto";
import { tagsData } from "data/tags";

@Injectable()
export class TagService {
    constructor(@InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>) {}

    async getAllTags(): Promise<Tag[]> {
        return this.tagModel.find().exec();
    }

    async createTag(createTagDto: CreateTagDto): Promise<Tag> {
        const createdTag = new this.tagModel(createTagDto);
        return createdTag.save();
    }

    async updateTag(id: string, name: string): Promise<Tag> {
        return this.tagModel.findByIdAndUpdate(id, { name }, { new: true }).exec();
    }

    async deleteTag(id: string): Promise<void> {
        await this.tagModel.findByIdAndDelete(id).exec();
    }

    async bulkInsertTags(): Promise<any> {
        const bulkOps = tagsData.map(tag => ({
            updateOne: {
                filter: { name: tag.name },
                update: { $set: tag },
                upsert: true,
            }
        }));

        return this.tagModel.bulkWrite(bulkOps);
    }

    async bulkDeleteTags(): Promise<any> {
        return this.tagModel.deleteMany({});
    }

    async searchTagsByName(query: string): Promise<Tag[]> {
        const filter: any = {
            name: new RegExp(query, 'i'),
        }
        return this.tagModel.find(filter).exec();
    }

}