import { Injectable } from '@angular/core'
import { Observable, EMPTY } from 'rxjs';

export interface IImageResponse {
  filelocation: string;
}

export enum EImageSize {
  small = '256x256',
  large = '512x512'
}

@Injectable({
  providedIn: 'root'
})
export abstract class ImageProvider {

  abstract createImage(prompt: string, size?: EImageSize): Observable<IImageResponse>
}
