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

    tick();  // Ensure async observable has emitted a value
    expect(isLoading).toBeFalse();  // Expect loading to be false
  }));

  it('should show the loader when show() is called', fakeAsync(() => {
    let isLoading: boolean | undefined;
    service.isLoading$.subscribe((loading) => {
      isLoading = loading;
    });

    service.show();  // Show the loader
    tick();  // Ensure async observable has emitted a value
    expect(isLoading).toBeTrue();  // Expect loading to be true
  }));

  it('should hide the loader when hide() is called after show()', fakeAsync(() => {
    let isLoading: boolean | undefined;
    service.isLoading$.subscribe((loading) => {
      isLoading = loading;
    });

    service.show();
    tick();  // Ensure async observable has emitted a value
    service.hide();
    tick();  // Ensure async observable has emitted a value
    expect(isLoading).toBeFalse();  // Expect loading to be false after hide
  }));

  it('should not hide the loader until all show() calls are matched with hide()', fakeAsync(() => {
    let isLoading: boolean | undefined;
    service.isLoading$.subscribe((loading) => {
      isLoading = loading;
    });

    service.show();
    service.show();  // Two shows without hide
    tick();  // Ensure async observable has emitted a value
    expect(isLoading).toBeTrue();  // Expect loading to be true

    service.hide();
    tick();  // Ensure async observable has emitted a value
    expect(isLoading).toBeTrue();  // Still loading after one hide

    service.hide();  // Now it should be hidden
    tick();  // Ensure async observable has emitted a value
    expect(isLoading).toBeFalse();  // Expect loading to be false after both hides
  }));

  it('should correctly track multiple show/hide calls', fakeAsync(() => {
    let isLoading: boolean | undefined;
    service.isLoading$.subscribe((loading) => {
      isLoading = loading;
    });

    service.show();
    service.show();
    tick();  // Ensure async observable has emitted a value
    expect(isLoading).toBeTrue();  // Still loading after two shows

    service.hide();
    tick();  // Ensure async observable has emitted a value
    expect(isLoading).toBeTrue();  // Still loading after one hide

    service.hide();
    tick();  // Ensure async observable has emitted a value
    expect(isLoading).toBeFalse();  // Expect loading to be false after both hides
  }));
});
