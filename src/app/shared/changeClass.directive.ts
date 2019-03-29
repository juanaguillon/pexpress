import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appChangeClass]'
})
export class ChangeClassDirective {

  @Input("toggleClass") currentClass;

  @HostListener("click") clicked ( ){
    this.changeClass( this.currentClass )
  }

  constructor( private el:ElementRef) { }

  private changeClass( classString ){
    this.el.nativeElement.classList.toggle = classString
  }
}
