import { Injectable, Scope } from "@nestjs/common"
import { CreateDriverLicenseDto } from "src/DTO/driverLicense/createDriverLicense.dto"
import { UpdateDriverLicenseDto } from "src/DTO/driverLicense/updateDriverLicense.dto"
import { DriverLicense } from "src/entity/pg_lookup_traffic/driver_license.entity"
import { DriverLicenseRepository } from "src/repository/driver_license.repository"

@Injectable({ scope: Scope.REQUEST })
export class DriverLicenseService {
    constructor(private readonly driverLicenseRepository: DriverLicenseRepository) {}

    async getDriverLicenseById(licenseId: string): Promise<DriverLicense> {
        const license = await this.driverLicenseRepository.findOne({ where: { id: licenseId } }).catch((error) => {
            throw new Error(error)
        })
        return license
    }

    async createDriverLicense(license: CreateDriverLicenseDto): Promise<DriverLicense> {
        const newLicense = this.driverLicenseRepository.create(license)
        return this.driverLicenseRepository.save(newLicense)
    }

    async updateDriverLicense(licenseId: string, licenseData: UpdateDriverLicenseDto): Promise<DriverLicense> {
        const existingPolicy = await this.getDriverLicenseById(licenseId)
        if (!existingPolicy) {
            throw new Error("License not found")
        }
        await this.driverLicenseRepository.update(licenseId, licenseData)
        return this.getDriverLicenseById(licenseId)
    }

    async deleteDriverLicense(licenseId: string): Promise<void> {
        await this.driverLicenseRepository.delete(licenseId)
    }
}
