export class SavedFilter {
  category: string;
  criterias: Map<number, string>;
  orderBy: string;
  isAlert: boolean;
  alertType: string;

  toJSON(): any {
    const obj = {};
    this.criterias.forEach ((v, k) => { obj[k] = v; });
    return {
      category: this.category,
      criterias: obj,
      orderBy: this.orderBy,
      isAlert: this.isAlert,
      alertType: this.alertType
    };
  }

}
