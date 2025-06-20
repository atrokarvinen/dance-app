import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import type { Dance } from "../dance";
import { DanceListItemCompact } from "./dance-list-item-compact";

type Props = {
  dances: Dance[];
  isEditMode: boolean;
  onDelete: (dance: Dance) => void;
};

export const DanceListView = ({ dances, isEditMode, onDelete }: Props) => {
  return (
    <List dense>
      {dances.map((dance) => (
        <ListItem key={dance.id} data-testid="dance-list-item">
          <DanceListItemCompact
            isEditMode={isEditMode}
            dance={dance}
            onDelete={onDelete}
          />
        </ListItem>
      ))}
    </List>
  );
};
