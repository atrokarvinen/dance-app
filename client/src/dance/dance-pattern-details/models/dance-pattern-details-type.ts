export type DancePatternDetailsType = {
  id: number;
  danceId: number;
  name: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;

  isFavorite: boolean;
  favoriteId: number | null;
};
