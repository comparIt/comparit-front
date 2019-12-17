import {ModelProperty} from './modelProperty';

export class Model {
  name: string;
  technicalName: string;
  activated: boolean;
  modelProperties: ModelProperty[];
  imageURL: string;
  saved = true;

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
    model.imageURL = '';
    model.saved = false;

    model.modelProperties.push(ModelProperty.createModelProperty( 'Nom', 'name', true, 'ENUMERATIVE' , true, true, true));
    model.modelProperties.push(ModelProperty.createModelProperty( 'Description', 'description', true, 'ENUMERATIVE' , true, true, true));
    model.modelProperties.push(ModelProperty.createModelProperty( 'Prix', 'price', true, 'NUMERIC' , true, true, true));
    model.modelProperties.push(ModelProperty.createModelProperty( 'Image', 'imgUrl', false, 'ENUMERATIVE' , false, false, false));

    return model;
  }

  get filterableProperties(): ModelProperty[] {
    return this.modelProperties.filter((p) => p.filtrable);
  }

}
