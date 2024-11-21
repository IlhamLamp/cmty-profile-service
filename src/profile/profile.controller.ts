import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  Request,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TResponse } from 'src/types/type';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('register')
  async registerProfile(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<TResponse> {
    try {
      const profile = await this.profileService.createProfile(createProfileDto);
      return {
        status: 201,
        message: 'Profile register successfully',
        data: profile,
      };
    } catch (error) {
      console.error('Error in registerProfile:', error);
      throw new HttpException(
        {
          status: 'error',
          message: 'An error occurred while creating the profile',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<TResponse> {
    try {
      const profile = await this.profileService.createProfile(createProfileDto);
      return {
        status: 201,
        message: 'Profile created successfully',
        data: profile,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'An error occurred while creating the profile',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProfile(): Promise<TResponse> {
    try {
      const allProfile = await this.profileService.getAllProfile();
      return {
        status: 200,
        message: 'Successfully get all profiles',
        data: allProfile,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'An error occurred while get all profile',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchProfileByName(
    @Query('name') name: string,
    @Query('is_active') isActive?: string,
  ): Promise<TResponse> {
    try {
      if (name === '')
        return {
          status: 400,
          message: 'Please insert name as query',
          data: null,
        };
      const activeStatus = isActive ? JSON.parse(isActive) : undefined;
      const profiles = await this.profileService.searchProfilesByName(
        name,
        activeStatus,
      );
      if (profiles.length === 0) {
        return {
          status: 400,
          message: `Profiles ${name} not found`,
          data: profiles,
        };
      }
      return {
        status: 200,
        message: 'Profiles retrieved successfully',
        data: profiles,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          message: 'An error occurred while searching for profiles',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfileForLoggedInUser(@Request() req: any): Promise<TResponse> {
    try {
      const profile = await this.profileService.getProfileByUserId(req.user.id);
      if (!profile) {
        throw new HttpException(
          {
            status: 'error',
            message: 'Profile not found',
            data: null,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        status: 200,
        message: 'Profile retrieved successfully',
        data: profile,
      };
    } catch (error) {
      console.error('Error retrieving profile:', error);
      throw new HttpException(
        {
          status: 'error',
          message: 'An error occurred while retrieving the profile',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('view/:username')
  async viewProfileByUsername(
    @Param('username') username: string,
    @Request() req: any,
  ): Promise<TResponse> {
    try {
      const profile = await this.profileService.viewProfileByUsername(username);
      if (!profile) {
        throw new HttpException(
          {
            status: 'error',
            message: 'Profile not found',
            data: null,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        status: 200,
        message: 'Profile retrieved successfully',
        data: profile,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'An error occurred while retrieving the profile',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:user_id')
  async updateProfileByUserId(
    @Param('user_id') user_id: number,
    @Request() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<TResponse> {
    try {
      if (req.user.id !== Number(user_id)) {
        throw new UnauthorizedException(
          'You are not authorized to access this profile',
        );
      }
      const updatedProfile = await this.profileService.updateProfileByUserId(
        user_id,
        updateProfileDto,
      );
      if (!updatedProfile) {
        throw new HttpException(
          {
            status: 400,
            message: 'Profile not found',
            data: null,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        status: 201,
        message: 'Profile updated successfully',
        data: updatedProfile,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'An error occurred while updating the profile',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
