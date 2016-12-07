import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'getHead' })
export class GetHeadPope implements PipeTransform {

  transform(value: any): string {
    switch (value) {
      case 'liberal':
        return './pic/liberal.png';
      case 'Hitler':
        return './pic/Hitler.png';
      case 'Fascist':
        return './pic/Fascist.png';
      default:
        return './pic/head.jpg';
    }
  }

}
