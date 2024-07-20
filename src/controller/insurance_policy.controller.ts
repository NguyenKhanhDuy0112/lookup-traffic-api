import {
    Body, Controller, Get, Put, UseGuards, Post, Delete, Param, HttpCode,
  } from '@nestjs/common';
  import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
  import { InsurancePolicyService } from '../service/insurance_policy.service';
  import { InsurancePolicy } from 'src/entity/pg_lookup_traffic/insurance_policy.entity';
  import { CreateInsurancePolicyDto } from 'src/DTO/insurancePolicy/createInsurancePolicy.dto';
  import { UpdateInsurancePolicyDto } from 'src/DTO/insurancePolicy/updateInsurancePolicy.dto';
import { TokenAuthGuard } from 'src/middleware/auth/token.guard';
  
  @Controller('insurance-policy')
  @ApiTags('insurance-policy')
  @ApiBearerAuth()
  @UseGuards(TokenAuthGuard)
  export class InsurancePolicyController {
    constructor(
      private readonly insurancePolicyService: InsurancePolicyService,
    ) { }
  
    @Get('/:id')
    @ApiResponse({ type: InsurancePolicy, status: 200 })
    async getInsurancePolicyById(@Param('id') policyId: string): Promise<InsurancePolicy> {
      return this.insurancePolicyService.getInsurancePolicyById(policyId);
    }
  
    @Post()
    @ApiResponse({ type: InsurancePolicy, status: 200 })
    async createInsurancePolicy(@Body() createInsurancePolicyDto: CreateInsurancePolicyDto) {
      return this.insurancePolicyService.createInsurancePolicy(createInsurancePolicyDto);
    }
  
    @Put('/:id')
    @HttpCode(204)
    @ApiResponse({ type: InsurancePolicy, status: 200 })
    async updateInsurancePolicy(@Param('id') policyId: string, @Body() updateInsurancePolicyDto: UpdateInsurancePolicyDto) {
      return this.insurancePolicyService.updateInsurancePolicy(policyId, updateInsurancePolicyDto);
    }
  
    @Delete('/:id')
    @HttpCode(204)
    @ApiResponse({ type: null, status: 204 })
    async deleteInsurancePolicy(@Param('id') policyId: string) {
      await this.insurancePolicyService.deleteInsurancePolicy(policyId);
    }
  }
  