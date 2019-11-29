import {Model} from './model';

export class Configuration {
  adminId: BigInteger;
  colorPrimary: string;
  colorSecondary: string;
  colorSecondary2: string;
  logo: string;
  featAnalytic: boolean;
  models: Model[];

  static buildConfiguration(configuration: Configuration): Configuration {
    const newConfiguration = new Configuration();
    newConfiguration.adminId = configuration.adminId;
    newConfiguration.colorPrimary = configuration.colorPrimary;
    newConfiguration.colorSecondary = configuration.colorSecondary;
    newConfiguration.colorSecondary2 = configuration.colorSecondary2;
    newConfiguration.logo = configuration.logo;
    newConfiguration.featAnalytic = configuration.featAnalytic;
    newConfiguration.models = configuration.models.map(m => Model.buildModel(m));
    return newConfiguration;
  }

  static defaultConfiguration(): Configuration {
    const configuration = new Configuration();
    configuration.colorPrimary = '#FFFFFF';
    configuration.colorSecondary = '#FFFFFF';
    configuration.colorSecondary2 = '#FFFFFF';
    configuration.logo = '';
    configuration.featAnalytic = false;
    configuration.models = [];
    return configuration;
  }
}
