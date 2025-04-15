export class Story {
  by?: string;           // The user who posted the story
  descendants?: number;  // The number of comments on the story
  id?: number;           // Unique identifier for the story
  score?: number;        // The score of the story (upvotes - downvotes)
  time?: number;         // The time the story was posted (Unix timestamp)
  title?: string;        // The title of the story
  type?: string;         // The type of the story (e.g., "story", "job", "poll")
  url?: string;          // The URL associated with the story (if applicable)
}
