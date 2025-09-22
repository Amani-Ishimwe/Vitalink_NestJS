import { Injectable } from '@nestjs/common';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { UpdateReceptionistDto } from './dto/update-receptionist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receptionist } from 'src/entities/reception.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Department } from 'src/entities/department.entity';

@Injectable()
export class ReceptionistsService {
  constructor(
    @InjectRepository(Receptionist)
    private readonly receptionistRepo: Repository<Receptionist>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Department)
    private readonly depaRepo : Repository<Department>
  ){}
  async create(
    createReceptionistDto: CreateReceptionistDto
  ): Promise<{ receptionist: Receptionist}> {
    const user = await this.userRepo.findOneBy({ id : createReceptionistDto.userId })
    if(!user){
      throw new Error('User not found')
    }
    if (user.role !== 'RECEPTIONIST'){
      throw new Error('User is not a receptionist')
    }
    const existingReceptionist = await this.receptionistRepo.findOneBy({ userId: createReceptionistDto.userId})
    if(existingReceptionist){
      throw new Error('Receptionist already exists')
    }

    const department = await this.depaRepo.findOneBy({ id: createReceptionistDto.departmentId})
    if(!department){
      throw new Error("Department Does Not Exist")
    }
    const newReceptionist = this.receptionistRepo.create({
      userId: user.id,
      departmentId: department.id
    })
    const savedReceptionist = await this.receptionistRepo.save(newReceptionist)
    return { receptionist: savedReceptionist }
  }

  async findAll(): Promise<{ receptionists: Receptionist[]}> {
    const receptionists = await this.receptionistRepo.find({
      relations: [ "user", "department"]
    })
    return { receptionists }
  }

  async findOne(id: string): Promise<{ receptionist: Receptionist }> {
    const receptionist = await this.receptionistRepo.findOne({ 
      where : { id },
      relations: [ "user", "department"]
     });
    if (!receptionist) {
      throw new Error('Receptionist not found');
    }
    return { receptionist };
  }

  async update(id: string, updateReceptionistDto: UpdateReceptionistDto): Promise<{ receptionist: Receptionist }> {
    const receptionist = await this.receptionistRepo.findOneBy({ id });
    if (!receptionist) {
      throw new Error('Receptionist not found');
    }
    this.receptionistRepo.merge(receptionist, updateReceptionistDto);
    const updatedReceptionist = await this.receptionistRepo.save(receptionist);
    return { receptionist: updatedReceptionist };
  }

  async remove(id: string): Promise<{ message: string }> {
    const receptionist = await this.receptionistRepo.findOneBy({ id });
    if (!receptionist) {
      throw new Error('Receptionist not found');
    }
    await this.receptionistRepo.remove(receptionist);
    return { message: 'Receptionist removed successfully' };
  }
}
