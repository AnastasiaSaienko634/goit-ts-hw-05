export type Movie = {
  id: number;
  title: string;
  backdrop_path?: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieInfo = {
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  genres: Genre[];
};
