import {
    Body, Controller, Get, Put, Post, Delete, Param, HttpCode, UseGuards,
  } from '@nestjs/common';
  import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
  import { VehicleService } from '../service/vehicle.service';
  import { Vehicle } from 'src/entity/pg_lookup_traffic/vehicle.entity';
  import { TokenAuthGuard } from 'src/middleware/auth/token.guard';
  import { User } from 'src/middleware/user.decorator';
  
  @Controller('vehicle')
  @ApiTags('vehicle')
  @ApiBearerAuth()
  @UseGuards(TokenAuthGuard)
  export class VehicleController {
    constructor(
      private readonly vehicleService: VehicleService,
    ) { }
  
    @Get('/:id')
    @ApiResponse({ type: Vehicle, status: 200 })
    async getVehicleById(@Param('id') vehicleId: string): Promise<Vehicle> {
      return this.vehicleService.getVehicleById(vehicleId);
    }
  
    @Post()
    @ApiResponse({ type: Vehicle, status: 201 })
    async createVehicle(@User() user, @Body() vehicle: Vehicle) {
      vehicle.user = user;
      return this.vehicleService.createVehicle(vehicle).catch((error) => { throw new Error(error); });
    }
  
    @Put('/:id')
    @HttpCode(204)
    @ApiResponse({ type: Vehicle, status: 204 })
    async updateVehicle(@Param('id') vehicleId: string, @Body() vehicle: Partial<Vehicle>) {
      return this.vehicleService.updateVehicle(vehicleId, vehicle).catch((error) => { throw new Error(error); });
    }
  
    @Delete('/:id')
    @HttpCode(204)
    @ApiResponse({ type: null, status: 204 })
    async deleteVehicle(@Param('id') vehicleId: string) {
      await this.vehicleService.deleteVehicle(vehicleId).catch((error) => { throw new Error(error); });
    }
  }
  