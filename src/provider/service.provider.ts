import { Provider } from "@nestjs/common"
import { AuthService } from "src/service/auth.service"
import { DriverLicenseService } from "src/service/driver_license.service"
import { InsurancePolicyService } from "src/service/insurance_policy.service"
import { TrafficViolationService } from "src/service/traffic_violation.service"
import { UserService } from "src/service/user.service"
import { VehicleService } from "src/service/vehicle.service"

export const serviceProvider: Provider[] = [
    AuthService,
    UserService,
    TrafficViolationService,
    InsurancePolicyService,
    VehicleService,
    DriverLicenseService,
]
