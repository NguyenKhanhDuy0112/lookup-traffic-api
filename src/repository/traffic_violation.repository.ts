import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { TrafficViolation } from 'src/entity/pg_lookup_traffic/traffic_violation.entity';
import { ConnectionNameEnum } from 'src/share/enum/connection.enum';
import { CreateTrafficViolationDto } from 'src/DTO/trafficViolation/createTrafficViolation.dto';
import { UpdateTrafficViolationDto } from 'src/DTO/trafficViolation/updateTrafficViolation.dto';

@Injectable()
export class TrafficViolationRepository {
  constructor(
    @InjectRepository(TrafficViolation, ConnectionNameEnum.LOOKUP_TRAFFIC)
    private readonly trafficViolationRepo: Repository<TrafficViolation>,
  ) {}

  create(violation: Partial<CreateTrafficViolationDto>): TrafficViolation {
    return this.trafficViolationRepo.create(violation);
  }

  save(violation: TrafficViolation): Promise<TrafficViolation> {
    return this.trafficViolationRepo.save(violation);
  }

  findOne(conditions: FindOneOptions<TrafficViolation>): Promise<TrafficViolation> {
    return this.trafficViolationRepo.findOne(conditions);
  }

  update(id: string, violationData: Partial<UpdateTrafficViolationDto>): Promise<any> {
    return this.trafficViolationRepo.update(id, violationData);
  }

  delete(id: string): Promise<any> {
    return this.trafficViolationRepo.delete(id);
  }
}
