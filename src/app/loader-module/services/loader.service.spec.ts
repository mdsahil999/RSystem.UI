import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have loading as false', fakeAsync(() => {
    let isLoading: boolean | undefined;
    service.isLoading$.subscribe((loading) => {
      isLoading = loading;
    });

    tick();
    expect(isLoading).toBeFalse();
  }));

  it('should show the loader when show() is called', fakeAsync(() => {
    let isLoading: boolean | undefined;
    service.isLoading$.subscribe((loading) => {
      isLoading = loading;
    });

    service.show();
    tick();  // Ensure async observable has emitted a value
    expect(isLoading).toBeTrue();
  }));

  it('should hide the loader when hide() is called after show()', fakeAsync(() => {
    let isLoading: boolean | undefined;
    service.isLoading$.subscribe((loading) => {
      isLoading = loading;
    });

    service.show();
    tick();  // Ensure async observable has emitted a value
    service.hide();
    tick();
    expect(isLoading).toBeFalse();
  }));


});
