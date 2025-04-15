import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  // BehaviorSubject tracks the current loading state (true/false)
  private loading = new BehaviorSubject<boolean>(false);

  // Observable to expose the loading state to other components
  isLoading$ = this.loading.asObservable();

  // Keeps track of the number of active requests
  private requestCount = 0;

  // Show loader: Increase the request count and set loading state to true
  show() {
    this.requestCount++; // Increment request count
    this.loading.next(true); // Emit the loading state as true
  }

  // Hide loader: Decrease the request count and hide loader if no active requests
  hide() {
    this.requestCount--; // Decrement request count
    if (this.requestCount <= 0) {
      this.requestCount = 0; // Ensure request count doesn't go negative
      this.loading.next(false); // Emit the loading state as false
    }
  }
}
