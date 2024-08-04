import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { AuditEntity } from './audit.entity';
import { User } from './user.entity';
import { TrafficViolation } from './traffic_violation.entity';
import { InsurancePolicy } from './insurance_policy.entity';

@Entity({ name: 'vehicles' })
export class Vehicle extends AuditEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ nullable: false })
    vehicle_number: string;

  @Column({ nullable: false })
    image_url: string;

  @Column({ nullable: true })
    vehicle_type: string;

  @Column({ nullable: true })
    brand: string;

  @Column({ nullable: true })
    model: string;

  @Column({ nullable: true })
    color: string;

  @Column({ nullable: true })
    year_of_manufacture: number;

  @ManyToOne(() => User, (user) => user.vehicles)
  @JoinColumn({ name: 'user_id' })
    user: User;

  @OneToMany(() => TrafficViolation, (violation) => violation.vehicle)
    violations: TrafficViolation[];

  @OneToMany(() => InsurancePolicy, (policy) => policy.vehicle)
    policies: InsurancePolicy[];
}
