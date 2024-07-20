import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FindOneOptions, Repository } from "typeorm"
import { DriverLicense } from "src/entity/pg_lookup_traffic/driver_license.entity"
import { ConnectionNameEnum } from "src/share/enum/connection.enum"
import { CreateDriverLicenseDto } from "src/DTO/driverLicense/createDriverLicense.dto"
import { UpdateDriverLicenseDto } from "src/DTO/driverLicense/updateDriverLicense.dto"

@Injectable()
export class DriverLicenseRepository {
    constructor(
        @InjectRepository(DriverLicense, ConnectionNameEnum.LOOKUP_TRAFFIC)
        private readonly driverLicenseRepo: Repository<DriverLicense>
    ) {}

    create(license: Partial<CreateDriverLicenseDto>): DriverLicense {
        return this.driverLicenseRepo.create(license)
    }

    save(license: DriverLicense): Promise<DriverLicense> {
        return this.driverLicenseRepo.save(license)
    }

    findOne(conditions: FindOneOptions<DriverLicense>): Promise<DriverLicense> {
        return this.driverLicenseRepo.findOne(conditions)
    }

    update(id: string, licenseData: Partial<UpdateDriverLicenseDto>): Promise<any> {
        return this.driverLicenseRepo.update(id, licenseData)
    }

    delete(id: string): Promise<any> {
        return this.driverLicenseRepo.delete(id)
    }
}
