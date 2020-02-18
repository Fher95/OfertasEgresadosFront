import { Filter } from '../base/filter';
import { HttpParams } from '@angular/common/http';

export function buildParamsFilters(filter: Filter) {
  let httpParams = new HttpParams();
  if (filter) {
    Object.entries(filter).forEach(key => {
      if (key[1] !== undefined && key[1] !== '') {
        httpParams = httpParams.append(key[0], key[1]);
      }
    });
  }
  return httpParams;
}

export function buildParamsFiltersWithPages(
  filter: Filter,
  pageSize: number,
  page: number
) {
  let httpParams = buildParamsFilters(filter);
  httpParams = httpParams.append('page', (page + 1).toString());
  httpParams = httpParams.append('pageSize', pageSize.toString());
  return httpParams;
}
