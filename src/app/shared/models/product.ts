export class Product {
  id: string;
  properties: Map<string, string>;

  constructor(data: any) {
    this.id = data._id;
    this.properties = data.properties;
  }

  get image(): string {
    return this.properties['img'];
  }

  get name(): string {
    return this.properties['name'];
  }

  get description(): string {
    return this.properties['description'];
  }

  get price(): string {
    return this.properties['price'];
  }

  shouldDisplayProperty(property: string): boolean {
    return property !== 'name' && property !== 'image' && property !== 'img' && property !== 'description' && property !== 'price';
  }
}
