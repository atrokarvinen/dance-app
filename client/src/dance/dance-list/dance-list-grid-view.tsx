import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Dance } from "../dance";
import { DanceListItemCard } from "./dance-list-item-card";

type Props = {
  dances: Dance[];
  isEditMode: boolean;
  onDelete: (dance: Dance) => void;
};

export const DanceListGridView = ({ dances, isEditMode, onDelete }: Props) => {
  return (
    <Grid container spacing={2}>
      {dances.map((dance) => (
        <Grid item key={dance.id} xs={6} sm={6} md={4} lg={3}>
          <Link
            to={`/dances/${dance.id}`}
            style={{ textDecoration: "none" }}
            onClick={(e) => {
              if (!isEditMode) return;
              e.preventDefault();
              // e.stopPropagation();
            }}
          >
            <DanceListItemCard
              isEditMode={isEditMode}
              dance={dance}
              onDelete={onDelete}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
