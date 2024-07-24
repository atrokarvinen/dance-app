import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ConfirmDialog } from "../../common/confirm-dialog";
import { ErrorPage } from "../../common/error-page";
import { Loader } from "../../common/loaders";
import { useAddToFavorites } from "../api/use-add-to-favorites";
import { useDeleteDancePattern } from "../api/use-delete-dance-pattern";
import { useGetDance } from "../api/use-get-dance";
import { useGetFavorites } from "../api/use-get-favorites";
import { useRemoveFromFavorites } from "../api/use-remove-from-favorites";
import { DancePattern } from "../dance";
import { DanceDetails } from "./dance-details";

type Props = {
  danceId: number;
};

export const DanceDetailsView = ({ danceId }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    dance,
    error: danceError,
    loading: danceLoading,
  } = useGetDance(danceId);
  const {
    favorites,
    error: favoritesError,
    loading: favoritesLoading,
  } = useGetFavorites();
  const { addToFavorites } = useAddToFavorites();
  const { removeFromFavorites } = useRemoveFromFavorites();
  const { deleteDancePattern } = useDeleteDancePattern();

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [selectedDancePattern, setSelectedDancePattern] =
    useState<DancePattern>();

  const handleAddFavorite = async (dancePatternId: number) => {
    await addToFavorites(dancePatternId);
  };

  const handleRemoveFavorite = async (favoritePatternId: number) => {
    await removeFromFavorites(favoritePatternId);
  };

  const handleOnNavigateBack = () => {
    const danceListScroll = location.state?.danceListScroll;
    navigate("/", { state: { danceListScroll } });
  };

  const handleDelete = (dancePattern: DancePattern) => {
    setSelectedDancePattern(dancePattern);
    setConfirmDeleteVisible(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedDancePattern) return;
    deleteDancePattern(selectedDancePattern.id);
    setConfirmDeleteVisible(false);
    setSelectedDancePattern(undefined);
  };

  if (danceLoading || favoritesLoading) return <Loader />;
  if (danceError || favoritesError) {
    const message = danceError?.message ?? favoritesError?.message ?? "Error";
    return <ErrorPage message={message} />;
  }
  if (!dance) return <div>Dance not found</div>;
  return (
    <>
      <ConfirmDialog
        title="Confirm Delete"
        message={`Are you sure you want to delete '${selectedDancePattern?.name}'?`}
        onCancel={() => setConfirmDeleteVisible(false)}
        onConfirm={handleConfirmDelete}
        open={confirmDeleteVisible}
      />
      <DanceDetails
        dance={dance}
        favorites={favorites}
        onAddToFavorites={handleAddFavorite}
        onRemoveFromFavorites={handleRemoveFavorite}
        onDeletePattern={handleDelete}
        onNavigateBack={handleOnNavigateBack}
      />
    </>
  );
};
