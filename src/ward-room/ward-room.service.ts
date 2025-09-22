
import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomAssign } from "src/entities/roomAssign.entity";
import { Ward } from "src/entities/ward.entity";
import { Repository } from "typeorm";
import { CreateWardDto } from "./dto/create-ward-room.dto";
import { UpdateWardRoomDto } from "./dto/update-ward-room.dto";
import { CreateRoomAssignDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Patient } from "src/entities/patient.entity";



@Injectable()
export class WardsService {
  constructor(
    @InjectRepository(Ward) 
    private wardRepo: Repository<Ward>,
    @InjectRepository(RoomAssign) 
    private roomAssignRepo: Repository<RoomAssign>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>
  ) {}

  async findAll(): Promise<{ wards: Ward[]}> {
    const wards = await this.wardRepo.find();
    return  { wards }
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

  async create(
    dto: CreateWardDto
  ): Promise<{ ward: Ward}> {
    const ward = await this.wardRepo.findOneBy({ id: dto.name})
    if(ward){
      throw new NotFoundException("Ward already exists")
    }
    const newWard = await this.wardRepo.create({
      name: dto.name,
      capacity: dto.capacity
    })
    const savedWard = await this.wardRepo.save(newWard)
    return { ward: savedWard }
  }

  async update(
    id: string, 
    dto: UpdateWardRoomDto
  ): Promise<{ ward: Ward}> {
   const ward = await this.wardRepo.findOneBy({ id: id})
   if(!ward){
    throw new NotFoundException("Ward does not exist")
   }
   Object.assign(ward, dto)
   const updateWard = await this.wardRepo.save(ward)
   return { ward: updateWard}
  }

  async remove(id: string) {
    const ward = await this.findOne(id);
    return this.wardRepo.remove(ward);
  }

  // ---- Room Assignment ----

  async assignRoom(
    dto: CreateRoomAssignDto
  ):Promise<{ assign: RoomAssign}> {
    const ward = await this.wardRepo.findOne({
      where: { id: dto.wardId },
      relations: ["assignments"],
    });
    if (!ward) throw new NotFoundException("Ward not found");

    const activeAssignments = ward.assignments.filter(a => !a.checkOut);
    if (activeAssignments.length >= ward.capacity) {
      throw new BadRequestException("Ward is full");
    }

    const patient = await this.patientRepo.findOneBy({ id: dto.patientId })
    if(!patient){
      throw new Error("Patient Not Found")
    }
    const assign = this.roomAssignRepo.create({
        patientId: patient.id,
        wardId : ward.id,
        checkIn: dto.checkIn
    });
    const saveAssign = await  this.roomAssignRepo.save(assign);
    return { assign: saveAssign}
  }

  async updateAssignment(
    id: string, dto: UpdateRoomDto
  ):Promise <{ updatedAssign: RoomAssign}> {
    const assign = await this.roomAssignRepo.findOneBy({ id: id})
    if(!assign){
      throw new BadRequestException("The Room is not assigned")
    }
    Object.assign(assign, dto)
    const updatedAssign = await this.roomAssignRepo.save(assign)
    return { updatedAssign: updatedAssign}
  }

  async removeAssignment(id: string) {
    const assign = await this.roomAssignRepo.findOne({ where: { id } });
    if (!assign) throw new NotFoundException("Assignment not found");
    return this.roomAssignRepo.remove(assign);
  }
}
