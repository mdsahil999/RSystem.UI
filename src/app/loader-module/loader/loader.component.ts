import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  // Observable to track whether the loader should be displayed
  isLoading = this.loaderService.isLoading$;

  // Inject LoaderService to access loading state
  constructor(private loaderService: LoaderService) {}
}
