import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import EditOff from "@mui/icons-material/EditOff";
import ViewList from "@mui/icons-material/ViewList";
import ViewModule from "@mui/icons-material/ViewModule";
import { Box, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  viewMode: string;
  isEditMode: boolean;
  addNewUrl: string;
  onEditModeChange: (mode: boolean) => void;
  onViewModeChange: (mode: string) => void;
};

export const ActionButtons = ({
  viewMode,
  isEditMode,
  addNewUrl,
  onEditModeChange,
  onViewModeChange,
}: Props) => {
  const isListView = viewMode === "list";
  return (
    <Stack direction="row" justifyContent="space-between" my={1}>
      <Box>
        <IconButton
          onClick={() => onViewModeChange(isListView ? "grid" : "list")}
        >
          {isListView ? <ViewModule /> : <ViewList />}
        </IconButton>
      </Box>
      <Stack direction="row" spacing={2}>
        {isEditMode && (
          <IconButton
            data-testid="add-new-dance"
            to={addNewUrl}
            component={Link}
            sx={{ alignSelf: "flex-end" }}
          >
            <Add />
          </IconButton>
        )}
        <IconButton
          data-testid="edit-mode"
          onClick={() => onEditModeChange(!isEditMode)}
          color={isEditMode ? "primary" : "default"}
        >
          {isEditMode ? <EditOff /> : <Edit />}
        </IconButton>
      </Stack>
    </Stack>
  );
};
