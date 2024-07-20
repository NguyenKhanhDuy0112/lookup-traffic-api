import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "path"
import { JwtModule } from "@nestjs/jwt"
import { serviceProvider } from "./provider/service.provider"
import { controllerProvider } from "./provider/controller.provider"
import { ConnectionNameEnum } from "./share/enum/connection.enum"
import { config } from "./config"
import { repositoryProvider } from "./provider/repository.provider"
import { UnitOfWork } from "./repository/unitOfWork"
import { InsurancePolicy } from "./entity/pg_lookup_traffic/insurance_policy.entity"
import { DriverLicense } from "./entity/pg_lookup_traffic/driver_license.entity"
import { User } from "./entity/pg_lookup_traffic/user.entity"
import { Vehicle } from "./entity/pg_lookup_traffic/vehicle.entity"
import { TrafficViolation } from "./entity/pg_lookup_traffic/traffic_violation.entity"

const pgLookupTraffic = config.POSTGRES_LOOKUP_TRAFFIC

@Module({
    imports: [
        JwtModule.register({
            signOptions: {
                issuer: "lookup-traffic.com",
            },
        }),
        TypeOrmModule.forRoot({
            name: ConnectionNameEnum.LOOKUP_TRAFFIC,
            type: "postgres",
            host: pgLookupTraffic.HOST,
            port: Number(pgLookupTraffic.PORT),
            username: pgLookupTraffic.USERNAME,
            password: pgLookupTraffic.PASSWORD,
            database: pgLookupTraffic.DATABASE,
            entities: [join(__dirname, "/**/pg_lookup_traffic/*.entity{.ts,.js}")],
            synchronize: false,
            migrationsRun: false,
            schema: "public",
            logging: true,
            ssl: false,
        }),
        TypeOrmModule.forFeature(
            [DriverLicense, InsurancePolicy, User, Vehicle, TrafficViolation],
            ConnectionNameEnum.LOOKUP_TRAFFIC
        ),
    ],
    controllers: [...controllerProvider],
    providers: [UnitOfWork, ...repositoryProvider, ...serviceProvider],
})
export class AppModule {}
