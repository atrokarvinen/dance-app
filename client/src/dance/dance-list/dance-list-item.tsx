import { Dance } from "../dance";
import { DanceListItemCard } from "./dance-list-item-card";
import { DanceListItemCompact } from "./dance-list-item-compact";

type Props = {
  isListView: boolean;
  isEditMode: boolean;
  dance: Dance;
  onDelete: (dance: Dance) => void;
};

export const DanceListItem = ({
  isListView,
  isEditMode,
  dance,
  onDelete,
}: Props) => {
  if (isListView) {
    return (
      <DanceListItemCompact
        isEditMode={isEditMode}
        dance={dance}
        onDelete={onDelete}
      />
    );
  }
  return (
    <DanceListItemCard
      isEditMode={isEditMode}
      dance={dance}
      onDelete={onDelete}
    />
  );
};
