import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'getFirstWord'})
export class getFirstWordPipe implements PipeTransform {
  transform(value: any, className:string): any {
    let arr = value.split(" ");
    let yellow = arr[0]
    arr.splice(0,1);
    value = arr.join(' ');
    return '<span class="' + className + '" >' + yellow + '</span> ' + value;
  }
}