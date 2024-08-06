import { Collection, DateTimeType, Entity, ManyToMany, ManyToOne, Property, Rel} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { User } from '../user/user.entity.js';

@Entity()
export class Buy extends BaseEntity {

  @Property({nullable: false}) //Agregué un atributo para hacer una prueba
  description!: string;

  @Property({ type: DateTimeType})
  fechaHora = new Date();

  //Relacion con la entidad usuario
  @ManyToOne(() => User, {nullable: false})
  user!: Rel<User>

  //Relacion con la entidad entrada
  /*
  @OneToMany(() => Ticket, (ticket) => ticket.buy)
  tickets = new Collection<Ticket>(this)
  */

  //Relacion con la entidad productos
  /*
  @ManyToMany(() => Product, (product) => product.buy)
  products = new Collection<Producto>(this)
  */
}