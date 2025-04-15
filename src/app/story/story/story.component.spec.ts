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
    { id: 1, url: 'https://example.com/story1'},
    { id: 2, url: 'https://example.com/story2'},
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
    // Mocking the service response to return mock stories
    storyServiceSpy.getAll.and.returnValue(of(mockStories));

    fixture.detectChanges(); // triggers ngOnInit()

    // Verifying the stories are loaded into the component
    expect(component.stories.length).toBe(2);
    expect(component.stories).toEqual(mockStories);
    expect(storyServiceSpy.getAll).toHaveBeenCalled();
  });

  it('should handle error if getAll throws error', () => {
    // Spying on console error to catch the logged error
    const consoleSpy = spyOn(console, 'error');

    // Mocking service to throw an error
    storyServiceSpy.getAll.and.returnValue(throwError(() => new Error('API error')));

    // Calling the method that fetches the stories
    component.getStories();

    // Verifying that the error was logged correctly
    expect(consoleSpy).toHaveBeenCalledWith('Error loading stories:', jasmine.any(Error));
  });

  it('should filter globally', () => {
    // Creating a spy for the filterGlobal method
    const filterSpy = jasmine.createSpy('filterGlobal');
    component.dt1 = { filterGlobal: filterSpy };

    const mockEvent = { target: { value: 'test' } } as unknown as Event;

    // Simulating the global filter method call
    component.onGlobalFilter(mockEvent);

    // Verifying that the filterGlobal method was called with the correct parameters
    expect(filterSpy).toHaveBeenCalledWith('test', 'contains');
  });
});
