import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dance } from "../dance";

type Props = {
  isEditMode: boolean;
  dance: Dance;
  onDelete: (dance: Dance) => void;
};

export const DanceListItemCard = ({ isEditMode, dance, onDelete }: Props) => {
  const navigate = useNavigate();

  const defaultUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s";

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <CardHeader title={dance.name} />
      <Divider />
      <CardContent>
        <CardMedia
          sx={{
            height: 100,
            backgroundSize: "contain",
            padding: 1,
          }}
          image={dance.imageUrl ?? defaultUrl}
          title="dance"
        />
      </CardContent>
      {isEditMode && (
        <>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <IconButton onClick={() => navigate(`/dances/edit/${dance.id}`)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(dance)}>
              <Delete />
            </IconButton>
          </CardActions>
        </>
      )}
    </Card>
  );
};
