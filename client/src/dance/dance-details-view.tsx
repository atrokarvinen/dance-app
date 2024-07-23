import { useLocation, useNavigate } from "react-router";
import { ErrorPage } from "../common/ErrorPage";
import { Loader } from "../common/Loader";
import { useAddToFavorites } from "./api/use-add-to-favorites";
import { useDeleteDancePattern } from "./api/use-delete-dance-pattern";
import { useGetDance } from "./api/use-get-dance";
import { useGetFavorites } from "./api/use-get-favorites";
import { useRemoveFromFavorites } from "./api/use-remove-from-favorites";
import { DanceDetails } from "./dance-details";

type Props = {
  danceId: number;
};

export const DanceDetailsView = ({ danceId }: Props) => {
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
  const navigate = useNavigate();
  const location = useLocation();
  if (danceLoading || favoritesLoading) return <Loader />;
  if (danceError || favoritesError) {
    const message = danceError?.message ?? favoritesError?.message ?? "Error";
    return <ErrorPage message={message} />;
  }
  if (!dance) return <div>Dance not found</div>;

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

  return (
    <DanceDetails
      dance={dance}
      favorites={favorites}
      onAddToFavorites={handleAddFavorite}
      onRemoveFromFavorites={handleRemoveFavorite}
      onDeletePattern={deleteDancePattern}
      onNavigateBack={handleOnNavigateBack}
    />
  );
};
