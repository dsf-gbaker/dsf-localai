import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IImageResponse, ImageProvider, EImageSize } from 'src/app/interfaces/imageprovider.interface';
import { Observable, EMPTY } from 'rxjs';
import { map, retry } from 'rxjs/operators';

interface ILLamaRequest {
  prompt: string;
  size:   string;
}

interface ILLamaData {
  embedding:  any;
  index:      number;
  url:        string;
}

interface ILLamaUsage {
  prompt_tokens:      number;
  completion_tokens:  number;
  total_tokens:       number;
}

interface ILLamaResponse {
  data: [ILLamaData];
  usage: ILLamaUsage;
}

@Injectable({
  providedIn: 'root'
})
export class LLamaImageProviderService implements ImageProvider {

  defaultHref       = 'http://localhost:8080/v1/images/generations';
  defaultHeaders    = { 'content-type': 'application/json' };
  defaultImageSize  = EImageSize.large;

  prompt            = '';
  imageSize         = this.defaultImageSize;

  constructor(private http: HttpClient) { }

  createImage(prompt: string, size?: EImageSize): Observable<IImageResponse> {
    
    this.imageSize  = size ? size : this.defaultImageSize;
    this.prompt     = prompt;

    // gotta have a prompt
    if (!this.prompt || this.prompt.length <= 0) {
      return EMPTY;
    }

    let req: ILLamaRequest = {
      prompt: this.prompt,
      size:   this.imageSize
    }

    return this.http.post<ILLamaResponse>(this.defaultHref, JSON.stringify(req), { headers: this.defaultHeaders })
      .pipe(retry(1))
      .pipe(map(
        res => {
          let file = (res && res.data && res.data[0]) ? res.data[0].url : '';
          return { filelocation: file }
        }
      ));
  }
}
