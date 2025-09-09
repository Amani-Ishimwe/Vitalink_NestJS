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

  findAll(): Promise<{ users: User[] }> {
    return this.userRepository.find().then(users => ({ users }))
  }

  findOne(id: string): Promise<{ user: User }> {
    return this.userRepository.findOneBy({ id: id }).then(user => {
      if (!user) {
        throw new Error('User not found')
      }
      return { user }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
