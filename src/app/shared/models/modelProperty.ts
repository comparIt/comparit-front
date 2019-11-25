export class modelProperty {

    name: string;
    technicalName: string;
    activated: boolean;
    type: string;
    filtrable: boolean;
    filtrableAdvanced: boolean;
    mandatory: boolean;
    constructor( name: string,
                 technicalName: string,
                 activated: boolean,
                 type: string,
                 filtrable: boolean,
                 filtrableAdvanced: boolean,
                 mandatory: boolean) {
        this.name = name;
        this.technicalName = technicalName;
        this.activated = activated;
        this.type = type;
        this.filtrable = filtrable;
        this.filtrableAdvanced = filtrableAdvanced;
        this.mandatory = mandatory;
    }
}
