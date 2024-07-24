import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Dance } from "../dance";

type Props = {
  isEditMode: boolean;
  dance: Dance;
  onDelete: (dance: Dance) => void;
};

export const DanceListItemCompact = ({
  isEditMode,
  dance,
  onDelete,
}: Props) => {
  return (
    <>
      <Button
        component={Link}
        to={`/dances/${dance.id}`}
        variant="contained"
        sx={{ width: "100%", height: 40 }}
      >
        {dance.name}
      </Button>

      {isEditMode && (
        <>
          <IconButton to={`/dances/edit/${dance.id}`} component={Link}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => onDelete(dance)}>
            <Delete />
          </IconButton>
        </>
      )}
    </>
  );
};
