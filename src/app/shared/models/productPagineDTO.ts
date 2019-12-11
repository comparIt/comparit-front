import {Product} from './product';

export class ProductPagineDTO {
    productsToDisplay: Product[];
    nbPagesTotal = 1;
    pageActuelle = 1;

    constructor(data: any) {
        this.productsToDisplay = data.productsToDisplay;
        this.nbPagesTotal = data.nbPagesTotal;
        this.pageActuelle = data.pageActuelle;
    }
}
