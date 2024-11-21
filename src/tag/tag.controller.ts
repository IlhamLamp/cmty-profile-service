import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TResponse } from 'src/types/type';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAllTags(): Promise<TResponse> {
    try {
      const allTags = await this.tagService.getAllTags();
      return {
        status: 200,
        message: 'Successfully get all tags',
        data: allTags,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          message: 'An error occurred while get all tags',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create')
  async createTag(@Body() createTagDto: CreateTagDto): Promise<TResponse> {
    try {
      const role = await this.tagService.createTag(createTagDto);
      return {
        status: 201,
        message: 'Tag created successfully',
        data: role,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          message: 'An error occurred while creating the tag',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('bulk-insert')
  async bulkInsertTags(): Promise<TResponse> {
    try {
      const result = await this.tagService.bulkInsertTags();
      return {
        status: 201,
        message: 'Bulk insert/upsert tags successfull',
        data: {
          insertedCount: result.upsertedCount || 0,
          modifiedCount: result.modifiedCount || 0,
          upsertedCount: result.upsertedCount || 0,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          message: 'An error occurred while bulk insert tag',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('bulk-delete')
  async bulkDeleteTags(): Promise<TResponse> {
    try {
      const result = await this.tagService.bulkDeleteTags();
      return {
        status: 201,
        message: 'Bulk delete successfully',
        data: {
          deletedCount: result.deletedCount || 0,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          message: 'An error occurred while bulk delete tag',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  async searchRolesByName(@Query('name') name: string): Promise<TResponse> {
    try {
      const tags = await this.tagService.searchTagsByName(name);
      if (tags.length == 0) {
        return {
          status: 400,
          message: `Tags ${name} not found`,
          data: tags,
        };
      }
      return {
        status: 200,
        message: 'Tags retrieved successfully',
        data: tags,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          message: 'An error occurred while searching for tags',
          error: error.message,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
