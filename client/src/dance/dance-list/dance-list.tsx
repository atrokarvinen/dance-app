import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ConfirmDialog } from "../../common/confirm-dialog";
import { ErrorPage } from "../../common/error-page";
import { Loader } from "../../common/loaders";
import {
  onSetDanceEditMode,
  selectIsDanceEditMode,
} from "../../layout/ui-store";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useDeleteDance } from "../api/use-delete-dance";
import { useGetDances } from "../api/use-get-dances";
import { Dance } from "../dance";
import { ActionButtons } from "./action-buttons";
import { DanceListGridView } from "./dance-list-grid-view";
import { DanceListView } from "./dance-list-view";
import { Page, usePreferredViewMode } from "./use-preferred-view-mode";

export const DanceList = () => {
  const dispatch = useAppDispatch();
  const { error, loading, dances } = useGetDances();
  const { deleteDance } = useDeleteDance();
  const isEditMode = useAppSelector(selectIsDanceEditMode);
  const { viewMode, setViewMode } = usePreferredViewMode(Page.DANCE);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [selectedDance, setSelectedDance] = useState<Dance>();

  const isListView = viewMode === "list";

  const handleDelete = (dance: Dance) => {
    setSelectedDance(dance);
    setConfirmDeleteVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDance) return;
    setConfirmDeleteVisible(false);
    setSelectedDance(undefined);
    await deleteDance(selectedDance.id);
  };

  const setEditMode = (mode: boolean) => {
    dispatch(onSetDanceEditMode(mode));
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <Box>
      <ConfirmDialog
        open={confirmDeleteVisible}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDeleteVisible(false)}
        message={`Are you sure you want to delete '${selectedDance?.name}'?`}
        title="Confirm Delete"
      />
      <Typography component="h1" variant="h3">
        Dances
      </Typography>
      <ActionButtons
        viewMode={viewMode}
        isEditMode={isEditMode}
        addNewUrl="/dances/new"
        onEditModeChange={setEditMode}
        onViewModeChange={setViewMode}
      />
      {isListView ? (
        <DanceListView
          dances={dances}
          isEditMode={isEditMode}
          onDelete={handleDelete}
        />
      ) : (
        <DanceListGridView
          dances={dances}
          isEditMode={isEditMode}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};
