import {
    Body, Controller, Get, Put, Post, Delete, Param, HttpCode, UseGuards,
  } from '@nestjs/common';
  import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
  import { TrafficViolationService } from '../service/traffic_violation.service';
  import { TrafficViolation } from 'src/entity/pg_lookup_traffic/traffic_violation.entity';
  import { TokenAuthGuard } from 'src/middleware/auth/token.guard';
  import { User } from 'src/middleware/user.decorator';
import { CreateTrafficViolationDto } from 'src/DTO/trafficViolation/createTrafficViolation.dto';
import { UpdateTrafficViolationDto } from 'src/DTO/trafficViolation/updateTrafficViolation.dto';
  
  @Controller('traffic-violation')
  @ApiTags('traffic-violation')
  @ApiBearerAuth()
  @UseGuards(TokenAuthGuard)
  export class TrafficViolationController {
    constructor(
      private readonly trafficViolationService: TrafficViolationService,
    ) { }
  
    @Get('/:id')
    @ApiResponse({ type: TrafficViolation, status: 200 })
    async getTrafficViolationById(@Param('id') violationId: string): Promise<TrafficViolation> {
      return this.trafficViolationService.getTrafficViolationById(violationId);
    }
  
    @Post()
    @ApiResponse({ type: TrafficViolation, status: 201 })
    async createTrafficViolation(@User() user, @Body() violation: CreateTrafficViolationDto) {
      return this.trafficViolationService.createTrafficViolation(violation).catch((error) => { throw new Error(error); });
    }
  
    @Put('/:id')
    @HttpCode(204)
    @ApiResponse({ type: TrafficViolation, status: 204 })
    async updateTrafficViolation(@Param('id') violationId: string, @Body() violation: UpdateTrafficViolationDto) {
      return this.trafficViolationService.updateTrafficViolation(violationId, violation).catch((error) => { throw new Error(error); });
    }
  
    @Delete('/:id')
    @HttpCode(204)
    @ApiResponse({ type: null, status: 204 })
    async deleteTrafficViolation(@Param('id') violationId: string) {
      await this.trafficViolationService.deleteTrafficViolation(violationId).catch((error) => { throw new Error(error); });
    }
  }
  