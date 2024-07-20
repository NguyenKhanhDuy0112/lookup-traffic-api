import { getNowUTCTime } from 'src/share/utils';
import { Column, BeforeUpdate, BeforeInsert } from 'typeorm';

export abstract class AuditEntity {
  @Column({ nullable: true })
  public updated_at: Date = null;

  @Column({ nullable: true })
  public created_at: Date = null;

  @BeforeUpdate()
  public setUpdatedDate() {
    this.updated_at = getNowUTCTime();
  }

  @BeforeInsert()
  public setCreatedAtDate() {
    this.created_at = getNowUTCTime();
  }
}
