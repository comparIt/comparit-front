export class SavedFilter {
  alertType: string;
  category: string;
  criterias: Map<number, string>;
  isAlert: boolean;

  toJSON(): any {
    const obj = {};
    this.criterias.forEach ((v, k) => { obj[k] = v; });
    return {
      alertType: this.alertType,
      category: this.category,
      isAlert: this.isAlert,
      criterias: obj
    };
  }

}
