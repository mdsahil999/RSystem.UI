// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { StoryComponent } from './story.component';

// describe('StoryComponent', () => {
//   let component: StoryComponent;
//   let fixture: ComponentFixture<StoryComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [StoryComponent]
//     });
//     fixture = TestBed.createComponent(StoryComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryComponent } from './story.component';
import { StoryService } from '../services/story.service';
import { of, throwError } from 'rxjs';
import { Story } from '../models/story.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StoryComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;
  let storyServiceSpy: jasmine.SpyObj<StoryService>;

  const mockStories: Story[] = [
    { id: 1, title: 'Story 1', url: 'https://example.com/story1', by: 'author1', time: 1234567890 },
    { id: 2, title: 'Story 2', url: 'https://example.com/story2', by: 'author2', time: 1234567891 },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StoryService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [StoryComponent],
      providers: [{ provide: StoryService, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements (like PrimeNG table)
    }).compileComponents();

    storyServiceSpy = TestBed.inject(StoryService) as jasmine.SpyObj<StoryService>;
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stories on init', () => {
    storyServiceSpy.getAll.and.returnValue(of(mockStories));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.stories.length).toBe(2);
    expect(component.stories).toEqual(mockStories);
    expect(storyServiceSpy.getAll).toHaveBeenCalled();
  });

  it('should handle error if getAll throws error', () => {
    const consoleSpy = spyOn(console, 'error');
    storyServiceSpy.getAll.and.returnValue(throwError(() => new Error('API error')));

    component.getStories();

    expect(consoleSpy).toHaveBeenCalledWith('Error loading stories:', jasmine.any(Error));
  });

  it('should filter globally', () => {
    const filterSpy = jasmine.createSpy('filterGlobal');
    component.dt1 = { filterGlobal: filterSpy };

    const mockEvent = { target: { value: 'test' } } as unknown as Event;

    component.onGlobalFilter(mockEvent);

    expect(filterSpy).toHaveBeenCalledWith('test', 'contains');
  });
});
