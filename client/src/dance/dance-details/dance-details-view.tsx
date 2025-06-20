import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../../common/confirm-dialog";
import { ErrorPage } from "../../common/error-page";
import { Loader } from "../../common/loaders";
import { useAddToFavorites } from "../../favorites/api/use-add-to-favorites";
import { useRemoveFromFavorites } from "../../favorites/api/use-remove-from-favorites";
import { useDeleteDancePattern } from "../api/use-delete-dance-pattern";
import { getDanceDetails } from "./api";
import { DanceDetails } from "./dance-details";
import type { DancePattern } from "./models/dance-details-type";

type Props = {
  danceId: number;
};

export const DanceDetailsView = ({ danceId }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["dance", danceId],
    queryFn: () => getDanceDetails(danceId),
  });

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

  const handleConfirmDelete = async () => {
    if (!selectedDancePattern) return;
    await deleteDancePattern(selectedDancePattern.id);
    setConfirmDeleteVisible(false);
    setSelectedDancePattern(undefined);
    await refetch();
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;
  if (!data?.data) return <div>Dance not found</div>;

  const dance = data.data;
  const dancePatterns = dance.dancePatterns || [];
  const favorites = dance.favorites || [];

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
        dancePatterns={dancePatterns}
        favorites={favorites}
        onAddToFavorites={handleAddFavorite}
        onRemoveFromFavorites={handleRemoveFavorite}
        onDeletePattern={handleDelete}
        onNavigateBack={handleOnNavigateBack}
      />
    </>
  );
};
