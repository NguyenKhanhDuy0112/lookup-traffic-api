import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/entity/pg_lookup_traffic/user.entity';
import { ConnectionNameEnum } from 'src/share/enum/connection.enum';
import { CreateUserDto } from 'src/DTO/user/createUser.dto';
import { UpdateUserDto } from 'src/DTO/user/updateUser.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User, ConnectionNameEnum.LOOKUP_TRAFFIC)
    private readonly userRepo: Repository<User>,
  ) {}

  create(user: Partial<CreateUserDto>): User {
    return this.userRepo.create(user);
  }

  save(user: CreateUserDto): Promise<CreateUserDto> {
    return this.userRepo.save(user);
  }

  findOne(conditions: FindOneOptions<User>): Promise<User> {
    return this.userRepo.findOne(conditions);
  }

  update(id: string, userData: Partial<UpdateUserDto>): Promise<any> {
    return this.userRepo.update(id, userData);
  }

  delete(id: string): Promise<any> {
    return this.userRepo.delete(id);
  }
}
