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
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
          // image="https://i3.ytimg.com/vi/JMdAFjjxus8/hqdefault.jpg"
          // image="https://www.dance-pizazz.com/wp-content/uploads/2024/01/Waltz-scaled.jpg"
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
