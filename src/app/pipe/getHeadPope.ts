import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'getHead' })
export class GetHeadPope implements PipeTransform {

  transform(value: any): string {
    switch (value) {
      case 'Liberal':
        return './pic/liberal.png';
      case 'Hitler':
        return './pic/Hitler.png';
      case 'Fascist':
        return './pic/Fascist.png';
      case 0:
        return './pic/think.png';
      case 1:
        return './pic/投票背.jpg';
      case 2:
        return './pic/同意.png';
      case 3:
        return './pic/反对.png';
      case 4:
        return './pic/head.png';
      default:
        return './pic/head.jpg';
    }
  }

}
