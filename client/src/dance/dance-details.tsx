import { ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dance, FavoritePattern } from "./dance";
import { DancePatternList } from "./dance-pattern-list";

type Props = {
  dance: Dance;
  favorites: FavoritePattern[];
  onAddToFavorites: (dancePatternId: number) => void;
  onRemoveFromFavorites: (favoriteId: number) => void;
  onDeletePattern: (id: number) => void;
  onNavigateBack: () => void;
  initialScroll: number;
};

export const DanceDetails = ({
  dance,
  favorites,
  onAddToFavorites,
  onRemoveFromFavorites,
  onDeletePattern,
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
      <Button component={Link} to={`/dances/${dance.id}/dance-patterns/new`}>
        + Add new
      </Button>
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
          onDeletePattern={onDeletePattern}
          scrollY={scrollY}
        />
      </Box>
    </Box>
  );
};
