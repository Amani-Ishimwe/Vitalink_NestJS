import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReceptionistsService } from './receptionists.service';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { UpdateReceptionistDto } from './dto/update-receptionist.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('receptionists')
export class ReceptionistsController {
  constructor(private readonly receptionistsService: ReceptionistsService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createReceptionistDto: CreateReceptionistDto) {
    return this.receptionistsService.create(createReceptionistDto);
  }

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.receptionistsService.findAll();
  }

  @Roles('ADMIN','RECEPTIONIST')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receptionistsService.findOne(id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceptionistDto: UpdateReceptionistDto) {
    return this.receptionistsService.update(id, updateReceptionistDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receptionistsService.remove(id);
  }
}
