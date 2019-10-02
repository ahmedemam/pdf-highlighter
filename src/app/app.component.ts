import { Component, ElementRef, ViewChild, ViewChildren, Injectable } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { WindowAndDocumentService } from './windowAndDocument.service';

declare const TextHighlighter: any;


// @Injectable({
//   providedIn: 'app-root'
// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('elm', { static: true }) elm: ElementRef;
  title = 'pdf-highlighter-texthighlighter';
  pdfSrc = './assets/compressed.tracemonkey-pldi-09.pdf';
  ARABIC_CHARSETS = ['ء', 'ؤ', 'إ', 'ئ', 'ة', 'ى', 'و', 'ه', 'ن', 'م', 'ل', 'ك',
    'ق', 'ف', 'غ', 'ع', 'ظ', 'ط', 'ض', 'ص', 'ش', 'س', 'ز', 'ر', 'ذ', 'د', 'خ', 'ح', 'ج', 'ث', 'ت', 'ب', 'أ'];
  ARABIC_NUMBERS = [];
  serialized: string;
  private textHighlighter;
  highlightStatus = true;

  constructor(private elr: ElementRef, private windows: WindowAndDocumentService) {
    console.log(this.windows);
  }

  ngOnInit() {
    this.textHighlighter = new TextHighlighter((this.elm as any).element.nativeElement);
  }

  onClearHighlight() {
    this.textHighlighter.removeHighlights();
  }

  ngAfterContentInit(): void {

  }

  onSaveHighlight() {
    this.serialized = this.textHighlighter.serializeHighlights();
    // console.log(this.serialized);
    this.textHighlighter.removeHighlights();
  }

  onDoSavedHighlights() {
    this.textHighlighter.removeHighlights();
    this.textHighlighter.deserializeHighlights(this.serialized);
  }

  onFileSelected() {
    const $file: any = document.querySelector('#file');
    if (typeof (FileReader) !== undefined) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
      reader.readAsArrayBuffer($file.files[0]);
    }
  }

  // onDetectArabicEncoding() {
  //   for(let charachter in this.ARABIC_CHARSETS){
  //     console.log(this.windows.window.find(charachter, false));
  //   }
  // }
}
