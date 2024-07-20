import { AuthController } from "src/controller/auth.controller"
import { DriverLicenseController } from "src/controller/driver_license.controller"
import { InsurancePolicyController } from "src/controller/insurance_policy.controller"
import { TrafficViolationController } from "src/controller/traffic_violation.controller"
import { UserController } from "src/controller/user.controller"
import { VehicleController } from "src/controller/vehicle.controller"

export const controllerProvider = [
    InsurancePolicyController,
    DriverLicenseController,
    UserController,
    VehicleController,
    TrafficViolationController,
    AuthController,
]
