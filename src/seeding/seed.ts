import { pgConfig } from "../../dbConfig";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { PropertyFactory } from "./property.factory";
import { PropertyFeaturesFactory } from "./propertyFeature.factory";
import { UserFactory } from "./user.factory";
import { MainSeeder } from "./main.seeder";

const options: DataSourceOptions & SeederOptions ={
  ...pgConfig,
  factories:[PropertyFactory, PropertyFeaturesFactory, UserFactory],
  seeds:[MainSeeder]
}

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
  await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
})