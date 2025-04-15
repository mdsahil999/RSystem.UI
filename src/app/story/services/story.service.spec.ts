import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoryService } from './story.service';
import { Story } from '../models/story.model';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  // Setup the testing module
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import HttpClientTestingModule to mock HTTP requests
      providers: [StoryService],           // Provide the StoryService to inject into tests
    });
    service = TestBed.inject(StoryService);  // Inject the StoryService
    httpMock = TestBed.inject(HttpTestingController);  // Inject HttpTestingController for mocking HTTP calls
  });

  // After each test, verify that no unmatched HTTP requests are pending
  afterEach(() => {
    httpMock.verify();
  });

  // Test to check if the service is created
  it('should be created', () => {
    expect(service).toBeTruthy();  // Check if the service is successfully created
  });

  // Test to check if all stories are fetched correctly
  it('should fetch all stories', () => {
    const mockStories: Story[] = [  // Sample data to mock the response
      {
        by: 'alice',
        descendants: 25,
        id: 111,
        score: 200,
        time: 1712890000,
        title: 'How to Build with Angular',
        type: 'story',
        url: 'https://example.com/angular-guide',
      },
      {
        by: 'bob',
        descendants: 15,
        id: 112,
        score: 180,
        time: 1712890500,
        title: 'RxJS in Depth',
        type: 'story',
        url: 'https://example.com/rxjs',
      },
      {
        by: 'carol',
        descendants: 8,
        id: 113,
        score: 90,
        time: 1712891000,
        title: 'Unit Testing in Angular',
        type: 'story',
        url: 'https://example.com/unit-testing',
      }
    ];

    // Call the service's getAll method
    service.getAll().subscribe((stories) => {
      // Check that the returned stories match the mock data
      expect(stories).toEqual(mockStories);
    });

    // Expect a GET request to the correct URL (this should match the URL defined in the service)
    const req = httpMock.expectOne('https://localhost:7097/api/Story');
    expect(req.request.method).toBe('GET');  // Ensure the request method is GET

    // Respond with the mock data
    req.flush(mockStories);  // Flush the mock response to the request
  });
});
