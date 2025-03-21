import {Cascade, Collection, Entity, ManyToOne, OneToMany, Property, Rel,} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Cinema } from '../cinema/cinema.entity.js';
import { Show } from '../show/show.entity.js';

@Entity()
export class Theater extends BaseEntity {

  @Property({ nullable: false })
  numChairs!: number;

  @Property({ nullable: false })
  cantRows!: number;

  @Property({ nullable: false })
  cantCols!: number;
  
  @ManyToOne(() => Cinema, { nullable: false })
  cinema!: Rel<Cinema>;

  @OneToMany(() => Show, (show) => show.theater, { cascade: [Cascade.ALL] })
  shows = new Collection<Show>(this);
}
