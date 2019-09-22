import {Component, ElementRef, ViewChild, ViewChildren} from '@angular/core';
// import * as TextHighlighter from "texthighlighterjs";
import {detectEncoding, detectFileEncoding} from 'char-encoding-detector';

declare const TextHighlighter: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('elm', {static: true}) elm: ElementRef;
  title = 'pdf-highlighter-texthighlighter';
  pdfSrc = './assets/compressed.tracemonkey-pldi-09.pdf';
  serialized: string;
  private textHighlighter;

  constructor(private elr: ElementRef) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.textHighlighter = new TextHighlighter((this.elm as any).element.nativeElement);
  }

  onClearHighlight() {
    this.textHighlighter.removeHighlights();
  }

  onSerializeData(){
    this.serialized = this.textHighlighter.serializeHighlights();
    console.log(this.serialized);
    this.textHighlighter.removeHighlights();
  }

  onDeSerializedData(){
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

  onRequestObject() {
    const values = this.textHighlighter.getHighlights();
    console.log(values);
    // const dataObject = document.getElementsByClassName('highlighted');
    // // console.log(dataObject);
    // const highlightedObjects = [];
    //
    // for (let i = 0; i < dataObject.length ; i++) {
    //   const highlightObject = {
    //     index: i,
    //     content: dataObject[i].textContent
    //   };
    //   highlightedObjects.push(highlightObject);
    // }
    // // this.highlightsObjectArray = highlightedObjects;
    // console.log(highlightedObjects);
    localStorage.setItem('a', JSON.stringify(values));
    // console.log(this.textHighlighter.getHighlights());
    // console.log(this.textHighlighter.serializeHighlights());
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  // onMakeHighlights(){
  //   console.log(this.highlightsObjectArray);
  //   const highlightedElementArray = this.highlightsObjectArray;
  //   for (let element of highlightedElementArray){
  //     this.textHighlighter.find(element.textContent);
  // }
  // }
}

// interface IPdfHighlightedObject {
//   PdfName: string;
//   user: IUser;
//   highlightedObjects: [IHighlightedObject];
// }
//
// interface IHighlightedObject {
//   index: number;
//   content: string;
//   // page: number; // get page of the dom element
// }

// interface IUser {
//   id: number;
//   name: string;
//   profession: string;
//   image: string;
// }

// (page-rendered)="pageRenderedEvent($event)"
// (text-layer-rendered)="textLayerRenderEvent($event)"
