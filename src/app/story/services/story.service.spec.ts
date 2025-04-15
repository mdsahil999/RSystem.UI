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
        id: 111,
        type: 'story',
        url: 'https://example.com/angular-guide',
      },
      {
        id: 112,
        type: 'story',
        url: 'https://example.com/rxjs',
      },
      {
        id: 113,
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
