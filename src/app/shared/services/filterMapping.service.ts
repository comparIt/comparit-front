import {Injectable} from '@angular/core';
import {GlobalConfigurationService} from './globalConfiguration.service';
import {Model} from '../models/model';

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
      .map(p => p.asFilter)
      .filter(value => value.value);
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


}
