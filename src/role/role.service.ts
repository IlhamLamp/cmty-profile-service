import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { rolesData } from 'data/roles';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async getAllRoles(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async updateRole(
    id: string,
    name: string,
    description: string,
  ): Promise<Role> {
    return this.roleModel
      .findByIdAndUpdate(id, { name, description }, { new: true })
      .exec();
  }

  async deleteRole(id: string): Promise<void> {
    await this.roleModel.findByIdAndDelete(id).exec();
  }

  async bulkInsertRoles(): Promise<any> {
    const bulkOps = rolesData.map((role) => ({
      updateOne: {
        filter: { name: role.name },
        update: { $set: role },
        upsert: true,
      },
    }));

    return this.roleModel.bulkWrite(bulkOps);
  }

  async bulkDeleteRoles(): Promise<any> {
    return this.roleModel.deleteMany({});
  }

  async searchRolesByName(query: string, isActive?: boolean): Promise<Role[]> {
    const filter: any = {
      name: new RegExp(query, 'i'),
    };
    if (typeof isActive !== 'undefined') {
      filter.is_active = isActive;
    }
    return this.roleModel.find(filter).exec();
  }
}
