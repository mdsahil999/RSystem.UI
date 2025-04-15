import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  // Setup: before each test, we configure the testing module and inject the service
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
    });
    service = TestBed.inject(LoaderService); // Get an instance of the service
  });

  // Test 1: Verifies that the service is created
  it('should be created', () => {
    expect(service).toBeTruthy(); // Assert that the service instance is truthy (exists)
  });

  // Test 2: Verifies that the loader is initially hidden (loading = false)
  it('should initially have loading as false', fakeAsync(() => {
    let isLoading: boolean | undefined;

    // Subscribe to the isLoading observable
    service.isLoading$.subscribe((loading) => {
      isLoading = loading;
    });

    // Simulate async passage of time (for observables to emit their values)
    tick();

    // Assert that the initial value of isLoading is false
    expect(isLoading).toBeFalse();
  }));

  // Test 3: Verifies that the loader shows when show() is called
  it('should show the loader when show() is called', fakeAsync(() => {
    let isLoading: boolean | undefined;

    // Subscribe to the isLoading observable
    service.isLoading$.subscribe((loading) => {
      isLoading = loading;
    });

    // Call show() to trigger the loader
    service.show();

    // Simulate async passage of time
    tick();

    // Assert that the loader is now visible (isLoading = true)
    expect(isLoading).toBeTrue();
  }));

  // Test 4: Verifies that the loader hides when hide() is called after show()
  it('should hide the loader when hide() is called after show()', fakeAsync(() => {
    let isLoading: boolean | undefined;

    // Subscribe to the isLoading observable
    service.isLoading$.subscribe((loading) => {
      isLoading = loading;
    });

    // Show loader first
    service.show();
    tick(); // Ensure observable emits the updated value

    // Hide loader
    service.hide();
    tick(); // Ensure observable emits the updated value

    // Assert that the loader is now hidden (isLoading = false)
    expect(isLoading).toBeFalse();
  }));

});
