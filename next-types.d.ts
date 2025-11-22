// types.ts
export type MovieResult = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
};

export type MovieApiResponse = {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

