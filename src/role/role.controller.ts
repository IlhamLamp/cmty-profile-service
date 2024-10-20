import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { TResponse } from 'src/types/type';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles(): Promise<TResponse> {
    try {
        const allRoles = await this.roleService.getAllRoles();
        return {
            status: 200,
            message: 'Successfully get all roles',
            data: allRoles,   
        }
    } catch (error) {
        throw new HttpException({
            status: 500,
            message: 'An error occurred while get all roles',
            error: error.message,
            data: null,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('create')
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<TResponse> {
    try {
        const role = await this.roleService.createRole(createRoleDto);
        return {
            status: 201,
            message: 'Role created successfully',
            data: role,
        };
    } catch (error) {
        throw new HttpException({
            status: 500,
            message: 'An error occurred while creating the role',
            error: error.message,
            data: null,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('bulk-insert')
  async bulkInsertRoles(): Promise<TResponse> {
    try {
        const result = await this.roleService.bulkInsertRoles();
        return {
            status: 201,
            message: 'Bulk insert/upsert roles successful',
            data: { 
                insertedCount: result.upsertedCount || 0,
                modifiedCount: result.modifiedCount || 0,  
                upsertedCount: result.upsertedCount || 0,  
            },
        };
    } catch (error) {
        throw new HttpException({
            status: 500,
            message: 'An error occurred while bulk insert role',
            error: error.message,
            data: null,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('bulk-delete')
  async bulkDeleteRoles(): Promise<TResponse> {
    try {
        const result = await this.roleService.bulkDeleteRoles();
        return {
            status: 201,
            message: 'Bulk delete successfully',
            data: { 
                deletedCount: result.deletedCount || 0,  
            },
        };
    } catch (error) {
        throw new HttpException({
            status: 500,
            message: 'An error occurred while bulk delete role',
            error: error.message,
            data: null,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('search')
  async searchRolesByName(
    @Query('name') name: string,
    @Query('is_active') isActive?: string,
  ): Promise<TResponse> {
    try {
        const activeStatus = isActive ? JSON.parse(isActive) : undefined;
        const roles = await this.roleService.searchRolesByName(name, activeStatus);
        if (roles.length == 0) {
            return {
                status: 400,
                message: `Roles ${name} not found`,
                data: roles,
            };
        }
        return {
            status: 200,
            message: 'Roles retrieved successfully',
            data: roles,
        };
    } catch (error) {
        throw new HttpException({
            status: 500,
            message: 'An error occurred while searching for roles',
            error: error.message,
            data: null,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

//   @Put(':id')
//   async updateRole(@Param('id') id: string, @Body('name') name: string, @Body('description') description: string) {
//     return this.roleService.updateRole(id, name, description);
//   }

//   @Delete(':id')
//   async deleteRole(@Param('id') id: string) {
//     return this.roleService.deleteRole(id);
//   }
}