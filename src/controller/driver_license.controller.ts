import { Body, Controller, Get, Put, Post, Delete, Param, HttpCode, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiResponse } from "@nestjs/swagger"
import { DriverLicenseService } from "../service/driver_license.service"
import { DriverLicense } from "src/entity/pg_lookup_traffic/driver_license.entity"
import { TokenAuthGuard } from "src/middleware/auth/token.guard"
import { User } from "src/middleware/user.decorator"
import { CreateDriverLicenseDto } from "src/DTO/driverLicense/createDriverLicense.dto"
import { UpdateDriverLicenseDto } from "src/DTO/driverLicense/updateDriverLicense.dto"

@Controller("driver-license")
@ApiTags("driver-license")
@ApiBearerAuth()
@UseGuards(TokenAuthGuard)
export class DriverLicenseController {
    constructor(private readonly driverLicenseService: DriverLicenseService) {}

    @Get("/:id")
    @ApiResponse({ type: DriverLicense, status: 200 })
    async getDriverLicenseById(@Param("id") licenseId: string): Promise<DriverLicense> {
        return this.driverLicenseService.getDriverLicenseById(licenseId)
    }

    @Post()
    @ApiResponse({ type: DriverLicense, status: 201 })
    async createDriverLicense(@User() user, @Body() license: CreateDriverLicenseDto) {
        return this.driverLicenseService.createDriverLicense(license).catch((error) => {
            throw new Error(error)
        })
    }

    @Put("/:id")
    @HttpCode(204)
    @ApiResponse({ type: DriverLicense, status: 204 })
    async updateDriverLicense(@Param("id") licenseId: string, @Body() license: UpdateDriverLicenseDto) {
        return this.driverLicenseService.updateDriverLicense(licenseId, license).catch((error) => {
            throw new Error(error)
        })
    }

    @Delete("/:id")
    @HttpCode(204)
    @ApiResponse({ type: null, status: 204 })
    async deleteDriverLicense(@Param("id") licenseId: string) {
        await this.driverLicenseService.deleteDriverLicense(licenseId).catch((error) => {
            throw new Error(error)
        })
    }
}
