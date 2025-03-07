import { Directive, HostListener, Input, ElementRef } from "@angular/core";

@Directive({
  selector: 'img[default]',
  standalone: true
})
export class DefaultImageDirective {
  @Input() default: string = 'assets/no-image.png';
  
  private hasFailed = false;

  @HostListener('error')
  updateSrc() {
    if (!this.hasFailed) {
      this.hasFailed = true;
      const element = this.el.nativeElement as HTMLImageElement;
      element.src = this.default;
    }
  }

  constructor(private el: ElementRef) {}
}