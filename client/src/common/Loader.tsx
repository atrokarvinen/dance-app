import { CircularProgress, Container } from "@mui/material";

export const Loader = () => {
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
};
