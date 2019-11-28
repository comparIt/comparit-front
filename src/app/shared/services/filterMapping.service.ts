import {Injectable} from '@angular/core';
import {GlobalConfigurationService} from './globalConfiguration.service';
import {Model} from '../models/model';
import {ModelProperty} from '../models/modelProperty';

@Injectable({
  providedIn: 'root',
})
export class FilterMappingService {

  constructor(public conf: GlobalConfigurationService) {
  }

  frontUrlToFilter(type: Model) {

  }

  filterToApi(model: Model, order: string, page: string, supplier: string): {key: string, value: string}[] {
    const filters: {key: string, value: string}[] = model.modelProperties
      .map(p => this.asFilter(p))
      .filter(value => value && value.value);
    filters.push({key: 'type', value: model.technicalName});
    if (supplier) {
      filters.push({key: 'supplier', value: supplier});
    }
    if (order) {
      filters.push({key: 'order', value: order});
    }
    if (page) {
      filters.push({key: 'page', value: page});
    }
    return filters;
  }

  asFilter(property: ModelProperty): {key: string, value: string} {
    return {key: property.technicalName, value: this.filterValue(property)};
  }

  filterValue(property: ModelProperty): string {
    return property.isNumeric ? property.range[0] + '-' + property.range[1] : property.selectedValues.join(',');
  }


}
