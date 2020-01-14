import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter} from '../../shared/models/filter';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {SavedFilter} from '../../shared/models/savedFilter';
import {ModelProperty} from '../../shared/models/modelProperty';
import {FilterMappingService} from '../../shared/services/filterMapping.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail-filter',
  templateUrl: './detail-filter.component.html',
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        padding: 0,
      })),
      state('final', style({
        overflow: 'hidden',
        opacity: '1',
        padding: '1.25em'
      })),
      transition('initial=>final', animate('250ms')),
      transition('final=>initial', animate('250ms'))
    ])
  ]
})
export class DetailFilterComponent implements OnInit {

  constructor(public config: GlobalConfigurationService,
              public filterMappingService: FilterMappingService,
              private router: Router) {
  }

  @Input() filter: SavedFilter;
  criterias: Map<ModelProperty, string>;
  @Output() updateFilter = new EventEmitter();
  @Output() deleteFilter = new EventEmitter();

  ngOnInit() {
    this.criterias = new Map<ModelProperty, string>();
    this.filter.criterias.forEach(
      ((value, key) => this.criterias.set(this.config.propertyByModelAndId(this.filter.category, key), value))
    );
  }

  get formattedMap() {
    const formattedCriterias: { key: ModelProperty, value: string }[] = [];
    this.criterias.forEach(
      ((value, key) => formattedCriterias.push({key, value}))
    );
    return formattedCriterias;
  }

  search() {
    this.router.navigateByUrl('/products/' + this.filter.category + '?' + this.filterMappingService.criteriasToUrl(this.criterias));
  }


}
