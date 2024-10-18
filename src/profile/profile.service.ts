import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/role/schemas/role.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    if (!createProfileDto.role) {
      const defaultRole = await this.roleModel.findOne({ name: 'A Learner'});
      if (!defaultRole) {
        throw new HttpException('Default role not found', HttpStatus.NOT_FOUND);
      }
      createProfileDto.role = defaultRole._id;
    }

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
