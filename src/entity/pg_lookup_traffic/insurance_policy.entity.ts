import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { AuditEntity } from './audit.entity';
import { Vehicle } from './vehicle.entity';

@Entity({ name: 'insurance_policies' })
export class InsurancePolicy extends AuditEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ nullable: false })
    policy_number: string;

  @Column({ nullable: true })
    company: string;

  @Column({ nullable: true })
    coverage_type: string;

  @Column({ nullable: false })
    start_date: Date;

  @Column({ nullable: false })
    end_date: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.policies)
  @JoinColumn({ name: 'vehicle_id' })
    vehicle: Vehicle;
}
