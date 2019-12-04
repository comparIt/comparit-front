import {Product} from './product';

export class ProductPagineDTO {
    productsToDisplay: Product[];
    nbPagesTotal: number;
    pageActuelle: number;

    constructor(data: any) {
        this.productsToDisplay = data.productsToDisplay;
        this.nbPagesTotal = data.nbPagesTotal;
        this.pageActuelle = data.pageActuelle;
    }
}
