import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private apiURL: string = "https://localhost:7097/api/Story"

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Story[]> {
    return this.httpClient.get<Story[]>(this.apiURL);
  }
}
