import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";
import { join } from "path";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fastName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Property, property => property.user)
  properties: Property[];

  @ManyToMany(() => Property, property => property.likedBy)
  @JoinTable({name:'user_properties'})
  likedProperties:Property[]

}