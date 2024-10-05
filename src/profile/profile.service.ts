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

  async getProfileById(id: string): Promise<Profile> {
    return this.profileModel.findById(id).exec();
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    return this.profileModel.findByIdAndUpdate(id, updateProfileDto, { new: true }).exec();
  }

  async deleteProfile(id: string): Promise<Profile> {
    return this.profileModel.findByIdAndDelete(id).exec();
  }
}
