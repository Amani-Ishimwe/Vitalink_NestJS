import { Test, TestingModule } from '@nestjs/testing';
import { WardRoomController } from './ward-room.controller';
import { WardRoomService } from './ward-room.service';

describe('WardRoomController', () => {
  let controller: WardRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WardRoomController],
      providers: [WardRoomService],
    }).compile();

    controller = module.get<WardRoomController>(WardRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
