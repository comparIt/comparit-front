export class ModelProperty {

  id: number;
  name: string;
  technicalName: string;
  activated: boolean;
  type: string;
  filtrable: boolean;
  filtrableAdvanced: boolean;
  mandatory: boolean;

  min: number;
  max: number;
  range: number[];

  values: string[];
  selectedValues: string[] = [];

  isSaved = true;

  get isEnum(): boolean {
    return this.type === 'ENUMERATIVE';
  }

  get isNumeric(): boolean {
    return this.type === 'NUMERIC';
  }


  constructor() {
  }

  static buildProperty(property: ModelProperty): ModelProperty {
    const modelProperty = new ModelProperty();
    modelProperty.id = property.id;
    modelProperty.name = property.name;
    modelProperty.technicalName = property.technicalName;
    modelProperty.activated = property.activated;
    modelProperty.type = property.type;
    modelProperty.filtrable = property.filtrable;
    modelProperty.filtrableAdvanced = property.filtrableAdvanced;
    modelProperty.mandatory = property.mandatory;
    modelProperty.min = property.min;
    modelProperty.max = property.max;
    modelProperty.range = [modelProperty.min, modelProperty.max];
    modelProperty.values = property.values;
    modelProperty.selectedValues = [];
    return modelProperty;
  }

  static createModelProperty(name: string,
                             technicalName: string,
                             activated: boolean,
                             type: string,
                             filtrable: boolean,
                             filtrableAdvanced: boolean,
                             mandatory: boolean): ModelProperty {
    const modelProprety: ModelProperty = new ModelProperty();
    modelProprety.name = name;
    modelProprety.technicalName = technicalName;
    modelProprety.activated = activated;
    modelProprety.type = type;
    modelProprety.filtrable = filtrable;
    modelProprety.filtrableAdvanced = filtrableAdvanced;
    modelProprety.mandatory = mandatory;
    modelProprety.isSaved = false;
    return modelProprety;
  }


  initFilter(filter: string) {
    if (this.isNumeric) {
      this.range = [Number(filter.split('-')[0]), Number(filter.split('-')[1])];
    } else if (this.isEnum) {
      this.selectedValues = filter.split(',');
    }
    console.log(this);
  }
}


