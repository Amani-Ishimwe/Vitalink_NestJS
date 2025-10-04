import { User } from './../entities/user.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("Users")
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}


  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary : " Creating new User"})
  @ApiResponse({ status: 201, description: "User Created Successfully" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Fetching all Users"})
  @ApiResponse({ status: 200, description: "Fetching all Users"})
  @ApiQuery({name : "page" , required: false, type :Number, description: "Page number (default: 1) " })
  @ApiQuery({name : "limit" , required: false, type :Number, description: "Items per page (default: 10) " })
  findAll(
    @Req() req,
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10) {
    return this.usersService.findAll(page, limit);
  }
 
  @Get(':id')
  @ApiOperation({ summary: " Fetching Single User "})
  @ApiResponse({ status: 200, description: "User fetched successfully"})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: " Updating Single User "})
  @ApiResponse({ status: 200, description: "User updated successfully"})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: " Deleting Single User "})
  @ApiResponse({ status: 200, description: "User deleted successfully"})
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
