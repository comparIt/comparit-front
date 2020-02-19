import {Component, OnInit} from '@angular/core';
import {GlobalConfigurationService} from '../../../shared/services/globalConfiguration.service';
import {CompareItAPIService} from '../../../shared/services/compareItAPI.service';
import {MessageService, SelectItem} from 'primeng/api';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html'
})
export class ManageUserComponent implements OnInit {

  users: User[] = [];
  roles: SelectItem[];

  constructor(
    public conf: GlobalConfigurationService,
    private compareItAPIService: CompareItAPIService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.roles = [
      {label: 'Utilisateur', value: 'ROLE_CUSTOMER'},
      {label: 'Fournisseur', value: 'ROLE_SUPPLIER'},
      {label: 'Administrateur', value: 'ROLE_ADMIN'},
    ]
    this.getAllUsers();
  }

  getAllUsers() {
    this.compareItAPIService.getAllUsers().then((users: User[]) => {
      this.users = [];
      users.map((user: User) => this.users.push(User.buildUser(user)));
    }).catch(() => {
      this.messageService.add({severity: 'error', summary: 'Echec', detail: 'Erreur lors de la récupération des utilisateurs', life: 2000});
    });
  }

  saveUser(user: User) {
    this.compareItAPIService.putUpdateUser(user).then((result: User) =>
      this.getAllUsers()
    ).catch(() => {
      this.messageService.add({severity: 'error', summary: 'Echec', detail: 'Erreur lors de la sauvegarde de l\'utilisateur', life: 2000});
    });
  }

  editUser(user: User, editing: boolean) {
    user.editing = editing;
  }

  deleteUser(user: User) {
    this.compareItAPIService.deleteUser(user.id).then(() =>
      this.getAllUsers()
    ).catch(() => {
      this.messageService.add({severity: 'error', summary: 'Echec', detail: 'Erreur lors de la suppression de l\'utilisateur', life: 2000});
    });
  }

  cancel() {
    this.getAllUsers();
  }
}
