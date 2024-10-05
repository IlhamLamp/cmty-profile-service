import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, HttpException, HttpStatus, Request, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TResponse } from 'src/types/type';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProfile(@Body() createProfileDto: CreateProfileDto): Promise<TResponse> {
    try {
      const profile = await this.profileService.createProfile(createProfileDto);
      return {
        status: 201,
        message: 'Profile created successfully',
        data: profile,
      };
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'An error occurred while creating the profile',
        error: error.message,
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProfile(): Promise<TResponse> {
    try {
      const allProfile = await this.profileService.getAllProfile();
      return {
        status: 201,
        message: 'Successfully get all profiles',
        data: allProfile,
      };
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'An error occurred while creating the profile',
        error: error.message,
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProfileById(@Param('id') id: string, @Request() req: any): Promise<TResponse> {
    try {
      const profile = await this.profileService.getProfileById(id);
      if (!profile) {
        throw new HttpException({
          status: 'error',
          message: 'Profile not found',
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      if (req.user.id !== profile.user_id) {
        throw new UnauthorizedException('You are not authorized to access this profile');
      }
      return {
        status: 200,
        message: 'Profile retrieved successfully',
        data: profile,
      };
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'An error occurred while retrieving the profile',
        error: error.message,
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProfile(@Param('id') id: string, @Request() req: any, @Body() updateProfileDto: UpdateProfileDto): Promise<TResponse> {
    try {
      const updatedProfile = await this.profileService.updateProfile(id, updateProfileDto);
      if (!updatedProfile) {
        throw new HttpException({
          status: 400,
          message: 'Profile not found',
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      if (req.user.id !== updatedProfile.user_id) {
        throw new UnauthorizedException('You are not authorized to access this profile');
      }
      return {
        status: 201,
        message: 'Profile updated successfully',
        data: updatedProfile,
      };
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'An error occurred while updating the profile',
        error: error.message,
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProfile(@Param('id') id: string, @Request() req: any): Promise<TResponse> {
    try {
      const deletedProfile = await this.profileService.deleteProfile(id);
      if (!deletedProfile) {
        throw new HttpException({
          status: 400,
          message: 'Profile not found',
          data: null,
        }, HttpStatus.NOT_FOUND);
      }
      if (req.user.id !== deletedProfile.user_id) {
        throw new UnauthorizedException('You are not authorized to access this profile');
      }
      return {
        status: 200,
        message: 'Profile deleted successfully',
        data: deletedProfile,
      };
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'An error occurred while deleting the profile',
        error: error.message,
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
