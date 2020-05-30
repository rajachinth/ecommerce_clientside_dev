import { Directive,HostListener,Input,ElementRef } from '@angular/core';

@Directive({
  selector: '[appCasechangedirective]'
})
export class CasechangedirectiveDirective {

  constructor(private el?:ElementRef) { }
  @Input('type') type;
  @HostListener('blur') onblur()
  { 
    let strcontent:string=this.el.nativeElement.value;
    if(this.type=='lower') this.el.nativeElement.value=strcontent.toLowerCase();
    else this.el.nativeElement.value=strcontent.toUpperCase();
  }
}
