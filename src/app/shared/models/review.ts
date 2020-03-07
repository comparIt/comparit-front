export class Review {
  id: number;
  userId: number;
  productId: string;
  comment: string;
  rate = 0;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
