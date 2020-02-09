export class SupplierContact {
  mail: string;

  static build(contact: SupplierContact): SupplierContact {
    const newContact = new SupplierContact();
    newContact.mail = contact.mail;
    return newContact;
  }
}
