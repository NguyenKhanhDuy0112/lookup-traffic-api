import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { InsurancePolicy } from 'src/entity/pg_lookup_traffic/insurance_policy.entity';
import { ConnectionNameEnum } from 'src/share/enum/connection.enum';
import { CreateInsurancePolicyDto } from 'src/DTO/insurancePolicy/createInsurancePolicy.dto';
import { UpdateInsurancePolicyDto } from 'src/DTO/insurancePolicy/updateInsurancePolicy.dto';

@Injectable()
export class InsurancePolicyRepository {
  constructor(
    @InjectRepository(InsurancePolicy, ConnectionNameEnum.LOOKUP_TRAFFIC)
    private readonly insurancePolicyRepo: Repository<InsurancePolicy>,
  ) {}

  create(policy: Partial<CreateInsurancePolicyDto>): InsurancePolicy {
    return this.insurancePolicyRepo.create(policy);
  }

  save(policy: InsurancePolicy): Promise<InsurancePolicy> {
    return this.insurancePolicyRepo.save(policy);
  }

  findOne(conditions: FindOneOptions<InsurancePolicy>): Promise<InsurancePolicy> {
    return this.insurancePolicyRepo.findOne(conditions);
  }

  update(id: string, policyData: Partial<UpdateInsurancePolicyDto>): Promise<any> {
    return this.insurancePolicyRepo.update(id, policyData);
  }

  delete(id: string): Promise<any> {
    return this.insurancePolicyRepo.delete(id);
  }
}
