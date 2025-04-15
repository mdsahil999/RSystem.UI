import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../models/story.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  // Define the base URL for the API endpoint
  private apiURL: string = `${environment.apiBaseUrl}/Story`;

  constructor(private httpClient: HttpClient) { }

  //Method to fetch all stories from the API.
  getAll(): Observable<Story[]> {
    return this.httpClient.get<Story[]>(this.apiURL);
  }
}
