import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeURLPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
   transform(url: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }
}
