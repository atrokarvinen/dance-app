import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import EditOff from "@mui/icons-material/EditOff";
import ViewList from "@mui/icons-material/ViewList";
import ViewModule from "@mui/icons-material/ViewModule";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { AuthorizedVisibility } from "../../auth/authorized-visibility/authorized-visibility";

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
        <AuthorizedVisibility>
          <IconButton
            data-testid="edit-mode"
            onClick={() => onEditModeChange(!isEditMode)}
            color={isEditMode ? "primary" : "default"}
          >
            {isEditMode ? <EditOff /> : <Edit />}
          </IconButton>
        </AuthorizedVisibility>
      </Stack>
    </Stack>
  );
};
