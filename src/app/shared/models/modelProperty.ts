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

  constructor(name: string,
              technicalName: string,
              activated: boolean,
              type: string,
              filtrable: boolean,
              filtrableAdvanced: boolean,
              mandatory: boolean,
              min: number,
              max: number,
              values: string[]) {
    this.name = name;
    this.technicalName = technicalName;
    this.activated = activated;
    this.type = type;
    this.filtrable = filtrable;
    this.filtrableAdvanced = filtrableAdvanced;
    this.mandatory = mandatory;

    this.min = min;
    this.max = max;
    this.range = [min, max];

    this.values = values;
  }

  get isEnum(): boolean {
    return this.type === 'ENUMERATIVE';
  }

  get isNumeric(): boolean {
    return this.type === 'NUMERIC';
  }

  get asFilter(): {key: string, value: string} {
    return {key: this.technicalName, value: this.filterValue};
  }

  get filterValue(): string {
    return this.isNumeric ? this.range[0] + '-' + this.range[1] : this.selectedValues.join(',');
  }
}


