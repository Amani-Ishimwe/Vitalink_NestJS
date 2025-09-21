import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
      @InjectRepository(User)
      private readonly userRepository: Repository<User>

  async create(
    createUserDto: CreateUserDto
  ):Promise<{ user: User}> {
    const user = await this.userRepository.findOneBy({ email: createUserDto.email })
    if (user){
      throw new Error('User already exists')
    }
    const newUser = this.userRepository.create(createUserDto)
    const savedUser = await this.userRepository.save(newUser)
    return { user: savedUser}
  }

  async findAll(
    requestingUser: {role: string},
    page: number = 1,
    limit: number = 10
  ): Promise<{ users: User[] }> {
    const skip = (page - 1) * limit;
    const users = await this.userRepository.find({
      skip,
      take: limit
    })
    return { users }
  }

  async findOne(
    userId: string, requestingUser:{ id: string, role: string}
  ):Promise<{ user: User}>{
    const user = await this.userRepository.findOneBy({ id: userId})
    if(!user){
      throw new Error('User not found')
    }
    return { user }
  }

  async update(
    id: string, updateUserDto: UpdateUserDto
  ): Promise<{ user: User }> {
    const user = await this.userRepository.findOneBy({ id: id })
    if (!user) {
      throw new Error('User not found')
    }
    Object.assign(user, updateUserDto)
    const updatedUser = await this.userRepository.save(user)
    return { user: updatedUser }
  }

  async remove(id: string): Promise<void>{
    const user = await this.userRepository.findOneBy({ id: id})
    if(!user){
      throw new Error('User not found')
    }
    await this.userRepository.remove(user)
  }
}
