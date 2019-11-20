export class ModelProperty {
    type: string;
    filtrable: boolean;
    filtrableAdvanced: boolean;
    mandatory: boolean;

    min: number;
    max: number;
    range: number[];

    values: string[];
    selectedValues: string[];

}
