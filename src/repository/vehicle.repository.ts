import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Vehicle } from 'src/entity/pg_lookup_traffic/vehicle.entity';
import { ConnectionNameEnum } from 'src/share/enum/connection.enum';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectRepository(Vehicle, ConnectionNameEnum.LOOKUP_TRAFFIC)
    private readonly vehicleRepo: Repository<Vehicle>,
  ) {}

  create(vehicle: Partial<Vehicle>): Vehicle {
    return this.vehicleRepo.create(vehicle);
  }

  save(vehicle: Vehicle): Promise<Vehicle> {
    return this.vehicleRepo.save(vehicle);
  }

  findOne(conditions: FindOneOptions<Vehicle>): Promise<Vehicle> {
    return this.vehicleRepo.findOne(conditions);
  }

  update(id: string, vehicleData: Partial<Vehicle>): Promise<any> {
    return this.vehicleRepo.update(id, vehicleData);
  }

  delete(id: string): Promise<any> {
    return this.vehicleRepo.delete(id);
  }
}
