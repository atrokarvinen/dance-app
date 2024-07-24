import { CircularProgress, Container } from "@mui/material";

export const Loader = () => {
  return (
    <Container
      sx={{
        height: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
};
