export interface User {
  user_id: string
  user_name: string;
  email: string;
  joined_at: string;
  profileImage?: string;
  role?: string;
}

export interface MoodSave {
  user_id: string;
  mood: string;
  note: string;
  hashtags: string[];
}