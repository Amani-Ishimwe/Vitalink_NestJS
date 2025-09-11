
import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Department } from 'src/entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly depRepo: Repository<Department>
  ){}
  async create(
    createDepartmentDto: CreateDepartmentDto
  ): Promise<{ department: Department }> {
    const department = await this.depRepo.findOneBy({ name: createDepartmentDto.name })
    if(department){
      throw new Error("Department already exists")
    }
    const newDepartment = await this.depRepo.create(createDepartmentDto)
    const savedDepartement = await this.depRepo.save(newDepartment)
    return { department: savedDepartement}
  }

  async findAll(): Promise<{ departments: Department[]}> {
    return this.depRepo.find().then(departments => ({departments}));
  }

  async findOne(id: string) {
    const department = await this.depRepo.findOneBy({ id })
    if(!department){
      throw new Error("Department not found")
    }
    return {department}
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<{ department: Department}> {
    const department = await this.depRepo.findOneBy({ id })
    if(!department){
      throw new Error("Department does not exist")
    }
    this.depRepo.merge(department, updateDepartmentDto)
    const updatedDepartment = await this.depRepo.save(department)
    return {department: updatedDepartment}
  }

async remove(id: string):Promise<{ message: string}> {
    const department = await this.depRepo.findOneBy({ id })
    if(!department){
      throw new Error("Department not found")
    }
    await this.depRepo.remove(department)
    return { message: "Deleted department  sucessfully"}
  }
}

