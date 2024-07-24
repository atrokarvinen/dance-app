import { List, ListItem } from "@mui/material";
import { Dance } from "../dance";
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
        <ListItem key={dance.id}>
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
