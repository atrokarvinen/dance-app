import { Add, Edit, EditOff, ViewList, ViewModule } from "@mui/icons-material";
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
            to={addNewUrl}
            component={Link}
            sx={{ alignSelf: "flex-end" }}
          >
            <Add />
          </IconButton>
        )}
        <IconButton
          onClick={() => onEditModeChange(!isEditMode)}
          color={isEditMode ? "primary" : "default"}
        >
          {isEditMode ? <EditOff /> : <Edit />}
        </IconButton>
      </Stack>
    </Stack>
  );
};
