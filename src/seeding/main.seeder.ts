import { faker } from "@faker-js/faker";
import { Property } from "../entities/property.entity";
import { PropertyFeatures } from "../entities/propertyFeatures.entity";
import { PropertyType } from "../entities/propertyType.entity";
import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";


export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager):
    Promise<void> {
    const typeRepo = dataSource.getRepository(PropertyType);
    console.log('Seeding PropertyType...');
    const propertyType = await typeRepo.save([
      { value: 'Condo' },
      { value: 'Apartment' },
    ])

    console.log('Seeding User...');
    const userFactory = factoryManager.get(User)
    const users = await userFactory.saveMany(10);

    console.log('Seeding Property...');

    const propertyFactory = factoryManager.get(Property)
    const propertyFeaturesFactory = factoryManager.get(PropertyFeatures)
    const properties = await Promise.all(
      Array(50)
        .fill("")
        .map(async (item) => {
          const property = await propertyFactory.make({
            user: faker.helpers.arrayElement(users),
            type: faker.helpers.arrayElement(propertyType),
            propertyFeatures: await propertyFeaturesFactory.save()
          });
          console.log('property', property);
          return property;
        })
    )

    console.log("Properties", properties);
    const propertyRepo = dataSource.getRepository(Property);
    console.log("propertyRepo", propertyRepo);
    await propertyRepo.save(properties);

  }
}