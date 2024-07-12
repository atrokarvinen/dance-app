export type Dance = {
  danceId: number;
  name: string;
  dancePatterns: DancePattern[];
};

export type DancePattern = {
  dancePatternId: number;
  danceId: number;
  name: string;
  aliases: string[];
  description: string;
  imageUrl?: string;
  videoUrl?: string;

  variations: DancePattern[];
  counterPars: DancePattern[];
  predecessors: DancePattern[];
  successors: DancePattern[];
};

export type FavoritePattern = {
  favoritePatternId: number;
  dancePatternId: number;
  userId: number;

  displayName?: string;
};
