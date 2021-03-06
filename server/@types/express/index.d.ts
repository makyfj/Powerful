export {};

/**
 * This is a built-in middleware function in Express. It parses customs requests
 */

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
  age: number;
  goal: string;
  workouts?: Workout[];
}

interface Workout {
  id: string;
  name: string;
  user: User;
  userId: string;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  workout: Workout;
  workoutId: string;
}

interface Set {
  id: string;
  sets: number;
  reps: number;
  weight: number;
  exercise: Exercise;
  exerciseId: string;
}

interface Progress {
  id: string;
  picture: string;
  description: string;
  weight: number;
  cloudinary_id: string;
  user: User;
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
      workout: Workout;
      exercise: Exercise;
      set: Set;
      progress: Progress;
    }
  }
}
