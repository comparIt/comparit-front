import {ModelProperty} from './modelProperty';

export class Model {
  name: string;
  technicalName: string;
  activated: boolean;
  modelProperties: ModelProperty[];
  imageURL: string;

  static buildModel(model: Model): Model {
    const newModel = new Model();
    newModel.name = model.name;
    newModel.technicalName = model.technicalName;
    newModel.activated = model.activated;
    newModel.imageURL = model.imageURL;
    newModel.modelProperties = model.modelProperties.map(p => ModelProperty.buildProperty(p));
    return newModel;
  }

  static defaultModel(): Model {
    const model: Model = new Model();
    model.name = '';
    model.activated = true;
    model.technicalName = '';
    model.modelProperties = [];
    return model;
  }

}
