import { Component, ElementRef, ViewChild, ViewChildren, Injectable } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { WindowAndDocumentService } from './windowAndDocument.service';
import { fromEvent } from 'rxjs';
// declare const annotator: any;
declare const TextHighlighter: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  @ViewChild('elm', { static: true }) elm: ElementRef;
  rect: Rectangle = { x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 };
  lastMousePosition: Position = { x: 0, y: 0 };
  canvasPosition: Position = { x: 0, y: 0 };
  mousePosition: Position = { x: 0, y: 0 };
  mouseDownFlag: boolean = false;
  pagePosition: Position = { x: 0, y: 0 };
  title = 'pdf-highlighter-texthighlighter';
  pdfSrc = './assets/compressed.tracemonkey-pldi-09.pdf';
  ARABIC_CHARSETS = ['ء', 'ؤ', 'إ', 'ئ', 'ة', 'ى', 'و', 'ه', 'ن', 'م', 'ل', 'ك',
    'ق', 'ف', 'غ', 'ع', 'ظ', 'ط', 'ض', 'ص', 'ش', 'س', 'ز', 'ر', 'ذ', 'د', 'خ', 'ح', 'ج', 'ث', 'ت', 'ب', 'أ'];
  ARABIC_NUMBERS = [];
  serialized: string;
  private textHighlighter;
  highlightStatus = true;
  mouseEventObject;
  annotator: any;
  annotatorDebugger: any;

  constructor(private elr: ElementRef, private windows: WindowAndDocumentService) {
    console.log(this.windows);
  }

  ngOnInit() {
    this.textHighlighter = new TextHighlighter((this.elm as any).element.nativeElement);
    console.log(this.textHighlighter);
    this.annotator = new annotator.App();
    // this.annotator.include(annotator.ui.main, {element: document.getElementById('pdf-content')});
    this.annotator.include(annotator.ui.main, {
      editorExtensions: [annotator.ui.tags.editorExtension],
      viewerExtensions: [
          annotator.ui.markdown.viewerExtension,
          annotator.ui.tags.viewerExtension
      ]
    });
    this.annotator.include(this.helloWorld);

    // this.annotator.include(annotator.storage.http);
    // this.annotatorDebugger = new this.annotator.DebugStore();
    this.annotator
    .start()
    .then(function () {
      this.annotator.annotations.load();
    });

    console.log(this.annotator);

    fromEvent(document.getElementById('pdf-content'), 'mousemove').subscribe((e: MouseEvent) => {
      this.mouseEventObject = e;
    });
  }

  helloWorld() {
    return {
          start: function (app) {
              app.notify("Hello, world!");
          }
      };
  }

  onClearHighlight() {
    this.textHighlighter.removeHighlights();
  }

  ngAfterContentInit(): void {

  }

  dbClickDraw(e){
    console.log('event',e);
    // console.log('event'.event);
    console.log('mouseEventObject',this.mouseEventObject);
  }

  pageRendered(event){
    setTimeout(()=>this.onDoSavedHighlights(), 2000);
  }

  onSaveHighlight() {
    console.log(this.mouseEventObject);
    this.serialized = this.textHighlighter.serialihighlightButtoneHighlights();
    localStorage.setItem('highlights', this.serialized);
    this.textHighlighter.removeHighlights();
  }

  onDoSavedHighlights() {
    this.serialized = localStorage.getItem('highlights');
    this.textHighlighter.deserialihighlightButtoneHighlights(this.serialized);
  }
}


interface Position {
  x: number;
  y: number;
}

interface Rectangle {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
}

interface User{
  id: number;
  name: string;
  profession: string;
  avatar: string;
  comment: string;
}

interface AreaInfo {
  highlightId: string;
  pageNumber: number;
  user: User;
  // user-commment
  rect: Rectangle;
  isDelete?: boolean;
}





















  // onFileSelected() {
  //   const $file: any = document.querySelector('#file');
  //   if (typeof (FileReader) !== undefined) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.pdfSrc = e.target.result;
  //     };
  //     reader.readAsArrayBuffer($file.files[0]);
  //   }
  // }

  // onDetectArabicEncoding() {
  //   for(let charachter in this.ARABIC_CHARSETS){
  //     console.log(this.windows.window.find(charachter, false));
  //   }
  // }


  // TODO -
  // TODO -
  // TODO -
  // TODO -
  // TODO -
  // TODO -
  // TODO -
  // TODO -
