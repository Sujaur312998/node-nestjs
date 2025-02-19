import { faker } from "@faker-js/faker";
import { Property } from "../entities/property.entity";
import { setSeederFactory } from "typeorm-extension";

export const PropertyFactory = setSeederFactory(Property, () => {
  const property = new Property();

  property.name = faker.location.street();
  property.description = faker.lorem.paragraph();
  property.price = faker.number.int({ min: 1000, max: 10000 });

  return property;
});
