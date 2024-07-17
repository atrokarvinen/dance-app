export type Dance = {
  danceId: number;
  name: string;
  dancePatterns: DancePattern[];
};

export type DancePattern = {
  dancePatternId: number;
  danceId: number;
  dance: Dance;
  name: string;
  aliases: string[];
  description: string;
  imageUrl?: string;
  videoUrl?: string;

  variations: DancePattern[];
  counterPars: DancePattern[];
  predecessors: DancePattern[];
  successors: DancePattern[];

  isFavorite?: boolean;
};

export type FavoritePattern = {
  favoritePatternId: number;
  displayName?: string;

  userId: number;

  dancePatternId: number;
  dancePattern: DancePattern;
};
