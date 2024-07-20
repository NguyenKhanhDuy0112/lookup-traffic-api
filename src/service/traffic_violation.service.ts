import { Injectable, Scope } from '@nestjs/common';
import { CreateTrafficViolationDto } from 'src/DTO/trafficViolation/createTrafficViolation.dto';
import { UpdateTrafficViolationDto } from 'src/DTO/trafficViolation/updateTrafficViolation.dto';
import { TrafficViolation } from 'src/entity/pg_lookup_traffic/traffic_violation.entity';
import { TrafficViolationRepository } from 'src/repository/traffic_violation.repository';


@Injectable({ scope: Scope.REQUEST })
export class TrafficViolationService {
  constructor(
    private readonly trafficViolationRepository: TrafficViolationRepository,
  ) { }

  async getTrafficViolationById(violationId: string): Promise<TrafficViolation> {
    const violation = await this.trafficViolationRepository.findOne({ where: { id: violationId } }).catch((error) => { throw new Error(error); });
    return violation; 
  }

  async createTrafficViolation(violation: CreateTrafficViolationDto): Promise<TrafficViolation> {
    const newTrafficViolation = this.trafficViolationRepository.create(violation);
    return this.trafficViolationRepository.save(newTrafficViolation);
  }

  async updateTrafficViolation(violationId: string, violationData: UpdateTrafficViolationDto): Promise<TrafficViolation> {
    const existingPolicy = await this.getTrafficViolationById(violationId);
    if (!existingPolicy) {
      throw new Error('Traffic not found');
    }
    await this.trafficViolationRepository.update(violationId, violationData);
    return this.getTrafficViolationById(violationId);
  }

  async deleteTrafficViolation(violationId: string): Promise<void> {
    await this.trafficViolationRepository.delete(violationId);
  }
}
