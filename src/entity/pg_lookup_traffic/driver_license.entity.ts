import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { AuditEntity } from './audit.entity';
import { User } from './user.entity';

@Entity({ name: 'driver_licenses' })
export class DriverLicense extends AuditEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ nullable: false })
    license_number: string;

  @Column({ nullable: true })
    license_type: string;

  @Column({ nullable: false })
    issued_date: Date;

  @Column({ nullable: false })
    expiration_date: Date;

  @Column({ nullable: true })
    issuing_authority: string;

  @ManyToOne(() => User, (user) => user.licenses)
  @JoinColumn({ name: 'user_id' })
    user: User;
}
