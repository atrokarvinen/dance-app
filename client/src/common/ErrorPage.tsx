import { Container, Typography } from "@mui/material";

type Props = {
  message: string;
};

export const ErrorPage = ({ message }: Props) => {
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">Error</Typography>
      <Typography paragraph>{message}</Typography>
    </Container>
  );
};
