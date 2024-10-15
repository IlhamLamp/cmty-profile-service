import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const createdProfile = new this.profileModel(createProfileDto);
    return createdProfile.save();
  }

  async getAllProfile(): Promise<Profile[]> {
    return this.profileModel.find().exec();
  }

  async getProfileByUserId(user_id: number): Promise<Profile> {
    return this.profileModel.findOne({ user_id }).exec();
  }

  async viewProfileByUsername(username: string): Promise<Profile> {
    return this.profileModel.findOne({ username }).exec();
  }

  async updateProfileByUserId(user_id: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    return this.profileModel.findOneAndUpdate({user_id}, updateProfileDto, { new: true }).exec();
  }

  async deleteProfileByUserId(user_id: number): Promise<Profile> {
    return this.profileModel.findOneAndDelete({ user_id }).exec();
  }

  async searchProfilesByName(query: string): Promise<Profile[]> {
    return this.profileModel.find({
      $or: [
        { first_name: new RegExp(query, 'i') },
        { last_name: new RegExp(query, 'i') },
        { username: new RegExp(query, 'i') },
      ],
    }).exec();
  }
}
