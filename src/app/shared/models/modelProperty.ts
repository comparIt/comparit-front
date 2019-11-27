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
  range: number[] = [0, 1];

  values: string[];
  selectedValues: string[] = [];

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


