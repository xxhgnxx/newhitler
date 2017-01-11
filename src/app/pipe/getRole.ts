import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'getRole' })
export class GetRole implements PipeTransform {

  transform(value: any): string {
    switch (value) {
      case 'Liberal':
        return '自由党';
      case 'Hitler':
        return '希特勒';
      case 'Fascist':
        return '法西斯';
      default:
        return '没身份';
    }
  }

}
