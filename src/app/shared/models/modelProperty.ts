export class modelProperty {

    name: string;
    technicalName: string;
    isActivited: boolean;
    type: string;
    filtrable: boolean;
    filtrableAdvanced: boolean;
    mandatory: boolean;
    constructor( name: string,
                 technicalName: string,
                 isActivited: boolean,
                 type: string,
                 filtrable: boolean,
                 filtrableAdvanced: boolean,
                 mandatory: boolean) {
        this.name = name;
        this.technicalName = technicalName;
        this.isActivited = isActivited;
        this.type = type;
        this.filtrable = filtrable;
        this.filtrableAdvanced = filtrableAdvanced;
        this.mandatory = mandatory;
    }
}
