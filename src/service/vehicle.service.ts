import { Injectable, Scope } from '@nestjs/common';
import { Vehicle } from 'src/entity/pg_lookup_traffic/vehicle.entity';
import { VehicleRepository } from 'src/repository/vehicle.repository';

@Injectable({ scope: Scope.REQUEST })
export class VehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
  ) { }

  async getVehicleById(vehicleId: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({where: {id: vehicleId}}).catch((error) => { throw new Error(error); });
    return vehicle;
  }

  async createVehicle(vehicle: Vehicle) {
    return this.vehicleRepository.save(vehicle);
  }

  async updateVehicle(vehicleId: string, vehicleData: Partial<Vehicle>) {
    return this.vehicleRepository.update(vehicleId, vehicleData);
  }

  async deleteVehicle(vehicleId: string): Promise<void> {
    await this.vehicleRepository.delete(vehicleId);
  }
}
