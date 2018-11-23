import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], orderField: string, orderType: boolean): any {
    array.sort( ( a: any, b: any ) => {
      const ae = a[ orderField ];
      const be = b[ orderField ];
      if ( ae === undefined && be === undefined ) { return 0; }
      if ( ae === undefined && be !== undefined ) { return orderType ? -1 : 1; }
      if ( ae !== undefined && be === undefined ) { return orderType ? 1 : -1; }
      if ( ae === be ) { return 0; }
      if (orderType) {
        return be.toString().toLowerCase() > ae.toString().toLowerCase() ? 1 : -1;
      }
      return ae.toString().toLowerCase() > be.toString().toLowerCase() ? 1 : -1;
    });
  return array;
  }

}
