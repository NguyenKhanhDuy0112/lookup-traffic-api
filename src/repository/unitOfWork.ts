import { Injectable, Scope } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TrafficViolationRepository } from './traffic_violation.repository';
import { InsurancePolicyRepository } from './insurance_policy.repository';
import { DriverLicenseRepository } from './driver_license.repository';
import { VehicleRepository } from './vehicle.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/pg_lookup_traffic/user.entity';
import { ConnectionNameEnum } from 'src/share/enum/connection.enum';
import { Vehicle } from 'src/entity/pg_lookup_traffic/vehicle.entity';
import { TrafficViolation } from 'src/entity/pg_lookup_traffic/traffic_violation.entity';
import { DriverLicense } from 'src/entity/pg_lookup_traffic/driver_license.entity';
import { InsurancePolicy } from 'src/entity/pg_lookup_traffic/insurance_policy.entity';

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWork {
  constructor(
    @InjectRepository(User, ConnectionNameEnum.LOOKUP_TRAFFIC)
    public userRepo: UserRepository,

    @InjectRepository(TrafficViolation, ConnectionNameEnum.LOOKUP_TRAFFIC)
    public trafficeViolationRepo: TrafficViolationRepository,

    @InjectRepository(InsurancePolicy, ConnectionNameEnum.LOOKUP_TRAFFIC)
    public insurancePolicyRepo: InsurancePolicyRepository,

    @InjectRepository(DriverLicense, ConnectionNameEnum.LOOKUP_TRAFFIC)
    public driverLicenseRepo: DriverLicenseRepository,

    @InjectRepository(Vehicle, ConnectionNameEnum.LOOKUP_TRAFFIC)
    public vehicleRepo: VehicleRepository

  ) { }
}
