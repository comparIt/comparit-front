import { ModelProperty } from './modelProperty';

export class Model {
    name: string;
    technicalName: string;
    activated: boolean;
    modelProperties: ModelProperty[];

  static buildModel(model: Model): Model {
    const newModel = new Model();
    newModel.name = model.name;
    newModel.technicalName = model.technicalName;
    newModel.activated = model.activated;
    newModel.modelProperties = model.modelProperties.map(p => ModelProperty.buildProperty(p));
    return newModel;
  }

}
