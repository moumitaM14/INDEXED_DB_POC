import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericApiService {

  url = 'https://jsonplaceholder.typicode.com/posts/1/comments';

  constructor(private http: HttpClient) { }

  getApiData() {

    return this.http.get(this.url);
  }
}
