export class ModelProperty {

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

  get isEnum(): boolean {
    return this.type === 'ENUMERATIVE';
  }

  get isNumeric(): boolean {
    return this.type === 'NUMERIC';
  }

  constructor() {
  }

  static buildProperty(property: any): ModelProperty {
    const modelProperty = new ModelProperty();
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
    modelProperty.values = property.value;
    modelProperty.selectedValues = [];
    return modelProperty;
  }

}


