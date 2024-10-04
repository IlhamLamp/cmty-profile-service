import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './schemas/profile.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('create')
  async createProfile(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.createProfile(createProfileDto);
  }

  // @Get()
  // async findAll() {
  //   return this.profileService.findAll();
  // }

  @Get(':id')
  async getProfileById(@Param('id') id: string): Promise<Profile> {
    return this.profileService.getProfileById(id);
  }

  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto): Promise<Profile> {
    return this.profileService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
