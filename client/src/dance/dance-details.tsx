import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { createRef, useEffect, useState } from "react";
import { Dance, FavoritePattern } from "./dance";
import { DancePatternList } from "./dance-pattern-list";

type Props = {
  dance: Dance;
  favorites: FavoritePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (dancePatternId: number) => void;
  onNavigateBack: () => void;
  initialScroll: number;
};

export const DanceDetails = ({
  dance,
  favorites,
  onAddToFavorites,
  onRemoveFromFavorites,
  onNavigateBack,
  initialScroll,
}: Props) => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo(0, initialScroll);
  }, [containerRef.current, initialScroll]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
      }}
    >
      <Typography component="h1" variant="h3">
        {dance.name}
      </Typography>
      <IconButton onClick={onNavigateBack} sx={{ alignSelf: "flex-start" }}>
        <ArrowBack />
      </IconButton>
      <Box
        sx={{ flex: 1, overflow: "auto" }}
        ref={containerRef}
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
      >
        <DancePatternList
          dancePatterns={dance.dancePatterns}
          favorites={favorites}
          onAddToFavorites={onAddToFavorites}
          onRemoveFromFavorites={onRemoveFromFavorites}
          scrollY={scrollY}
        />
      </Box>
    </Box>
  );
};
