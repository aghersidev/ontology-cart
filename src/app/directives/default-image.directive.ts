import { Directive, HostListener, Input, ElementRef } from "@angular/core";

@Directive({
  selector: 'img[default]',
  standalone: true
})
export class DefaultImageDirective {
  @Input() default: string = 'assets/no-image.png';
  
  // Usamos una bandera para evitar re-intentos si la imagen por defecto falla
  private hasFailed = false;

  @HostListener('error')
  updateSrc() {
    if (!this.hasFailed) {
      this.hasFailed = true; // Marcamos que ya falló una vez
      const element = this.el.nativeElement as HTMLImageElement;
      element.src = this.default;
    }
  }

  constructor(private el: ElementRef) {}
}