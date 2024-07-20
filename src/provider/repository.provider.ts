import { Provider } from '@nestjs/common';
import { DriverLicenseRepository } from "src/repository/driver_license.repository";
import { InsurancePolicyRepository } from "src/repository/insurance_policy.repository";
import { TrafficViolationRepository } from "src/repository/traffic_violation.repository";
import { UserRepository } from "src/repository/user.repository";
import { VehicleRepository } from "src/repository/vehicle.repository";

export const repositoryProvider: Provider[] = [
  InsurancePolicyRepository,
  TrafficViolationRepository,
  UserRepository,
  VehicleRepository,
  DriverLicenseRepository,
];
