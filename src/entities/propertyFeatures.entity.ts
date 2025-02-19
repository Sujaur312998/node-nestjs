import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyFeatures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column()
  parkingSpots: number;

  @Column()
  area: number;

  @Column()
  hasBalcony: boolean;

  @Column()
  hasSwimmingPool: boolean; 

  @Column()
  hasGardenYard: boolean;

  @OneToOne(()=>Property, Property=>Property.propertyFeatures)
  @JoinColumn()
  property: Property;
}