import {Model} from './model';

export class Configuration {
  adminId: BigInteger;
  colorPrimary: string;
  colorSecondary: string;
  colorSecondary2: string;
  logo: string;
  name: string;
  featAnalytic = false;
  featUser = false;
  featSaveFilter = false;
  featAlerte = false;

  featSupplier = false;
  featSupplierContact = false;
  models: Model[];

  static buildConfiguration(configuration: Configuration): Configuration {
    const newConfiguration = new Configuration();
    newConfiguration.adminId = configuration.adminId;
    newConfiguration.colorPrimary = configuration.colorPrimary;
    newConfiguration.colorSecondary = configuration.colorSecondary;
    newConfiguration.colorSecondary2 = configuration.colorSecondary2;
    newConfiguration.logo = configuration.logo;
    newConfiguration.name = configuration.name;
    newConfiguration.featAnalytic = configuration.featAnalytic;
    newConfiguration.featUser = configuration.featUser;
    newConfiguration.featSaveFilter = configuration.featSaveFilter;
    newConfiguration.featAlerte = configuration.featAlerte;
    newConfiguration.featSupplier = configuration.featSupplier;
    newConfiguration.featSupplierContact = configuration.featSupplierContact;
    newConfiguration.models = configuration.models.map(m => Model.buildModel(m));
    return newConfiguration;
  }

  static defaultConfiguration(): Configuration {
    const configuration = new Configuration();
    configuration.colorPrimary = '#FFFFFF';
    configuration.colorSecondary = '#FFFFFF';
    configuration.colorSecondary2 = '#FFFFFF';
    configuration.name = '';
    configuration.featAnalytic = false;
    configuration.models = [];
    return configuration;
  }
}
