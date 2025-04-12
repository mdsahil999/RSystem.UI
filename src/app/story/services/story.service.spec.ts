import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoryService } from './story.service';
import { Story } from '../models/story.model';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryService],
    });
    service = TestBed.inject(StoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all stories', () => {
    const mockStories: Story[] = [
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

    service.getAll().subscribe((stories) => {
      expect(stories).toEqual(mockStories);
    });

    const req = httpMock.expectOne('https://localhost:7097/api/Story');
    expect(req.request.method).toBe('GET');
    req.flush(mockStories);
  });
});
