import { fetchByGenre, fetchTrending } from '../modules/api.js';

const moodToGenres = {
  Happy: [35, 12], // Comedy, Adventure
  Sad: [18, 16], // Drama, Animation
  Angry: [28, 53], // Action, Thriller
  Surprised: [9648, 14], // Mystery, Fantasy
  Fear: [27], // Horror
  Tired: [10749, 99], // Romance, Documentary
  Neutral: [] // Fallback to Trending
};

const moodDescriptions = {
  Happy: "You seem happy today! Here are some fun and adventurous movies to keep the good times rolling.",
  Sad: "Feeling a bit down? These emotional and uplifting stories might be exactly what you need.",
  Angry: "Need to blow off some steam? Dive into these intense action and thriller movies.",
  Surprised: "In the mood for the unexpected? Check out these mind-bending mysteries and fantasies.",
  Fear: "Looks like you're ready for a scare! Here are some top-rated horror movies.",
  Tired: "Time to unwind. Relax with these soothing romances and documentaries.",
  Neutral: "Just chillin'? Here's what's currently trending across the globe."
};

export const getRecommendationsForMood = async (mood) => {
  const genres = moodToGenres[mood] || [];
  
  try {
    if (genres.length > 0) {
      // Pick the first mapped genre for simplicity, or randomize if desired
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      const movies = await fetchByGenre(randomGenre, 'movie');
      return {
        description: moodDescriptions[mood],
        movies: movies.slice(0, 8)
      };
    } else {
      const movies = await fetchTrending('movie');
      return {
        description: moodDescriptions['Neutral'],
        movies: movies.slice(0, 8)
      };
    }
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    return {
      description: "Here are some movies you might like.",
      movies: []
    };
  }
};
