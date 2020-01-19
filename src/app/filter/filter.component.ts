import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../shared/services/authentification.service';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {SavedFilter} from '../shared/models/savedFilter';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',

})
export class FilterComponent implements OnInit {

  filters: SavedFilter[] = [];

  constructor(
    private authentification: AuthenticationService,
    private api: CompareItAPIService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.fetchFilters();
  }

  updateFilter(filterToUpdate: SavedFilter) {
    this.api.createFilter(filterToUpdate).then(() => {
      this.messageService.add({severity: 'success', summary: 'Filtre', detail: 'Modifications enregistrées', life: 1000});
      this.fetchFilters();
    }).catch(() => {
      this.messageService.add({severity: 'error', summary: 'Filtre', detail: 'Echec de l\'enregirstrement', life: 1000});
    });
  }

  deleteFilter(filterToUpdate: SavedFilter) {
    this.api.deleteFilter(filterToUpdate).then(() => {
      this.messageService.add({severity: 'success', summary: 'Filtre', detail: 'Filtre supprimé', life: 1000});
      this.fetchFilters();
    }
    ).catch(() => {
      this.messageService.add({severity: 'error', summary: 'Filtre', detail: 'Echec de la suppression', life: 1000});
    });
  }

  fetchFilters() {
    this.api.getUserFilters().then(
      (json: any[]) => this.filters = json.map((filter) => SavedFilter.buildFilter(filter))
    );
  }

}
