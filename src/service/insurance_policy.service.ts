import { Injectable } from '@nestjs/common';
import { InsurancePolicyRepository } from 'src/repository/insurance_policy.repository';
import { InsurancePolicy } from 'src/entity/pg_lookup_traffic/insurance_policy.entity';
import { CreateInsurancePolicyDto } from 'src/DTO/insurancePolicy/createInsurancePolicy.dto';
import { UpdateInsurancePolicyDto } from 'src/DTO/insurancePolicy/updateInsurancePolicy.dto';

@Injectable()
export class InsurancePolicyService {
  constructor(
    private readonly insurancePolicyRepository: InsurancePolicyRepository,
  ) {}

  async getInsurancePolicyById(policyId: string): Promise<InsurancePolicy> {
    const policy = await this.insurancePolicyRepository.findOne({ where: { id: policyId } });
    if (!policy) {
      throw new Error('Policy not found');
    }
    return policy;
  }

  async createInsurancePolicy(policy: CreateInsurancePolicyDto): Promise<InsurancePolicy> {
    const newPolicy = this.insurancePolicyRepository.create(policy);
    return this.insurancePolicyRepository.save(newPolicy);
  }

  async updateInsurancePolicy(policyId: string, policyData: UpdateInsurancePolicyDto): Promise<InsurancePolicy> {
    const existingPolicy = await this.getInsurancePolicyById(policyId);
    if (!existingPolicy) {
      throw new Error('Policy not found');
    }
    await this.insurancePolicyRepository.update(policyId, policyData);
    return this.getInsurancePolicyById(policyId);
  }

  async deleteInsurancePolicy(policyId: string): Promise<void> {
    await this.insurancePolicyRepository.delete(policyId);
  }
}
