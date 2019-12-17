import {Product} from './product';

export class ProductPagineDTO {
    productsToDisplay: Product[];
    nbPagesTotal = 1;
    pageActuelle = 0;
    productsPerPage = 10;

    constructor(data: any) {
        this.productsToDisplay = data.productsToDisplay ? data.productsToDisplay.map((p) => new Product(p)) : [];
        this.nbPagesTotal = 1;
        this.pageActuelle = 0;
    }
}
