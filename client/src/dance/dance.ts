export type Dance = {
  id: number;
  name: string;
  imageUrl?: string;
  dancePatterns: DancePattern[];
};

export type DancePattern = {
  id: number;
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
  id: number;
  displayName?: string;

  userId: number;

  dancePatternId: number;
  dancePattern: DancePattern;
};
