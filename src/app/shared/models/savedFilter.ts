export class SavedFilter {
  id: number;
  category: string;
  criterias: Map<number, string>;
  orderBy: string;
  isAlert: boolean;
  alertType: string;

  static buildFilter(filter: SavedFilter): SavedFilter {
    const newFilter = new SavedFilter();
    newFilter.id = filter.id;
    newFilter.category = filter.category;
    newFilter.criterias = new Map<number, string>();
    Object.keys ( filter.criterias ). forEach (k => {
      newFilter.criterias.set(Number(k), filter.criterias[k]);
    });
    newFilter.orderBy = filter.orderBy;
    newFilter.isAlert = filter.isAlert;
    newFilter.alertType = filter.alertType;
    return newFilter;
  }

  toJSON(): any {
    const obj = {};
    this.criterias.forEach ((v, k) => { obj[k] = v; });
    return {
      id: this.id,
      category: this.category,
      criterias: obj,
      orderBy: this.orderBy,
      isAlert: this.isAlert,
      alertType: this.alertType
    };
  }

}
