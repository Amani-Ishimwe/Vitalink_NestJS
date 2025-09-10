import { User } from './../entities/user.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles('ADMIN')
  @Get()
  findAll(
    @Req() req,
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10) {
    return this.usersService.findAll(req.user, page, limit);
  }
 
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.usersService.findOne(id, req.user);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
