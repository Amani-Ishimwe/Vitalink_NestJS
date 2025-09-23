import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('departments')
@ApiTags("Departments")
@ApiBearerAuth()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: "Creating  A New Department"})
  @ApiResponse({ status: 201, description: "A New Department Created Successfully"})
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: "Fetching departments"})
  @ApiResponse({ status: 200, description: "Departments fetched successfully"})
  findAll() {
    return this.departmentsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  @ApiOperation({ summary: "Fetching Single Department"})
  @ApiResponse({ status: 200, description:"Department fetched successfully"})
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: "Updating a department"})
  @ApiResponse({ status: 200, description: "A department updated successfully"})
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary : "Deleting a single department"})
  @ApiResponse({ status :200, description: "Department deleted successfully"})
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
