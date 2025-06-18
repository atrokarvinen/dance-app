export type DanceDetailsType = {
  id: number;
  name: string;
  dancePatterns: DancePattern[];
  favorites: FavoritePattern[];
};

export type DancePattern = {
  id: number;
  danceId: number;
  name: string;
  videoUrl?: string;
};

export type FavoritePattern = {
  id: number;
  dancePatternId: number;
};
