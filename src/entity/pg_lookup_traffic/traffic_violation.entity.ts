import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { AuditEntity } from './audit.entity';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';

@Entity({ name: 'traffic_violations' })
export class TrafficViolation extends AuditEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ nullable: false })
    violation_date: Date;

  @Column({ nullable: true })
    violation_type: string;

  @Column({ nullable: true })
    location: string;

  @Column({ nullable: true })
    fine_amount: number;

  @Column({ nullable: true })
    points_deducted: number;

  @Column({ nullable: true })
    status: string;

  @ManyToOne(() => User, (user) => user.violations)
  @JoinColumn({ name: 'user_id' })
    user: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.violations)
  @JoinColumn({ name: 'vehicle_id' })
    vehicle: Vehicle;
}
