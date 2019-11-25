export class Product {
  id: string;
  properties: Map<string, string>;

  constructor(data: any) {
    this.id = data._id;
    this.properties = data.properties;
  }
}
