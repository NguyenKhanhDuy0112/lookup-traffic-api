import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { AuditEntity } from "./audit.entity"
import { Vehicle } from "./vehicle.entity"
import { TrafficViolation } from "./traffic_violation.entity"
import { DriverLicense } from "./driver_license.entity"

@Entity({ name: "users" })
export class User extends AuditEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    username: string

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    gender: string

    @Column({ nullable: true })
    full_name: string

    @Column({ nullable: true })
    phone_number: string

    @Column({ nullable: true })
    address: string

    @Column({ nullable: true })
    dob: Date

    @Column({ nullable: true })
    cccd: string

    @Column({ nullable: true })
    avatar: string

    @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
    vehicles: Vehicle[]

    @OneToMany(() => TrafficViolation, (violation) => violation.user)
    violations: TrafficViolation[]

    @OneToMany(() => DriverLicense, (license) => license.user)
    licenses: DriverLicense[]
}
