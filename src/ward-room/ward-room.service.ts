
import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomAssign } from "src/entities/roomAssign.entity";
import { Ward } from "src/entities/ward.entity";
import { Repository } from "typeorm";
import { CreateWardDto } from "./dto/create-ward-room.dto";
import { UpdateWardRoomDto } from "./dto/update-ward-room.dto";
import { CreateRoomAssignDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";



@Injectable()
export class WardsService {
  constructor(
    @InjectRepository(Ward) private wardRepo: Repository<Ward>,
    @InjectRepository(RoomAssign) private roomAssignRepo: Repository<RoomAssign>,
  ) {}

  async findAll() {
    return this.wardRepo.find();
  }

  async findOne(id: string) {
    const ward = await this.wardRepo.findOne({
      where: { id },
      relations: ["assignments", "assignments.patient"],
    });
    if (!ward) throw new NotFoundException("Ward not found");

    const activeAssignments = ward.assignments.filter(a => !a.checkOut);
    const usage = activeAssignments.length;

    return { ...ward, usage };
  }

  async create(dto: CreateWardDto) {
    const ward = this.wardRepo.create(dto);
    return this.wardRepo.save(ward);
  }

  async update(id: string, dto: UpdateWardRoomDto) {
    await this.wardRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const ward = await this.findOne(id);
    return this.wardRepo.remove(ward);
  }

  // ---- Room Assignment ----

  async assignRoom(dto: CreateRoomAssignDto) {
    const ward = await this.wardRepo.findOne({
      where: { id: dto.wardId },
      relations: ["assignments"],
    });
    if (!ward) throw new NotFoundException("Ward not found");

    const activeAssignments = ward.assignments.filter(a => !a.checkOut);
    if (activeAssignments.length >= ward.capacity) {
      throw new BadRequestException("Ward is full");
    }

    const assign = this.roomAssignRepo.create(dto);
    return this.roomAssignRepo.save(assign);
  }

  async updateAssignment(id: string, dto: UpdateRoomDto) {
    await this.roomAssignRepo.update(id, dto);
    return this.roomAssignRepo.findOne({ where: { id } });
  }

  async removeAssignment(id: string) {
    const assign = await this.roomAssignRepo.findOne({ where: { id } });
    if (!assign) throw new NotFoundException("Assignment not found");
    return this.roomAssignRepo.remove(assign);
  }
}
