import { Inject, Injectable } from '@angular/core';

import { DOCUMENT } from '@angular/common';

function getWindow (): any {
  return window;
}

@Injectable({
  providedIn: 'root',
})

export class WindowAndDocumentService {
  public window = null;

  constructor(@Inject( DOCUMENT ) public document :HTMLDocument) {
    this.window = getWindow();
  }
}