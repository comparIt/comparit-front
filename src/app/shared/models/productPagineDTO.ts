import {Product} from './product';

export class ProductPagineDTO {
    productsToDisplay: Product[];
    nbPagesTotal = 0;
    pageActuelle = 0;
    productsPerPage = 10;

    constructor(data: any) {
        this.productsToDisplay = data.productsToDisplay;
        this.nbPagesTotal = 0;
        this.pageActuelle = 0;
        this.productsPerPage = 10;
    }
}
