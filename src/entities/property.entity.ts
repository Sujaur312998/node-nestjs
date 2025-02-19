import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeatures } from "./propertyFeatures.entity";
import { User } from "./user.entity";
import { PropertyType } from "./propertyType.entity";

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @OneToOne(
    () => PropertyFeatures,
    propertyFeatures => propertyFeatures.property,
    { cascade: true }
  )
  propertyFeatures: PropertyFeatures;

  @ManyToOne(() => User,user => user.properties)
  @JoinColumn({name:'OwnerId'})
  user:User


  @ManyToMany(() => User, user => user.likedProperties)
  likedBy:User[]

  @ManyToOne(() => PropertyType)
  type: PropertyType;
}