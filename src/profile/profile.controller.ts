import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './schemas/profile.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IResponse } from './dto/response.profile';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProfile(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.createProfile(createProfileDto);
  }

  // @Get()
  // async findAll() {
  //   return this.profileService.findAll();
  // }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProfileById(@Param('id') id: string): Promise<IResponse> {
    try {
      const profile = await this.profileService.getProfileById(id);

      if (!profile) {
        return {
          status: 'error',
          message: 'Profile not found',
          data: null,
        };
      }

      return {
        status: 'success',
        message: 'Profile retrieved successfully',
        data: profile,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'An error occurred while retrieving the profile',
        error: error.message,
        data: null,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto): Promise<Profile> {
    return this.profileService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
