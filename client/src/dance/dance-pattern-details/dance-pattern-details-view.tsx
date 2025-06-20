import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../auth/auth-store";
import { ErrorPage } from "../../common/error-page";
import { Loader } from "../../common/loaders";
import { useAddToFavorites } from "../../favorites/api/use-add-to-favorites";
import { useRemoveFromFavorites } from "../../favorites/api/use-remove-from-favorites";
import { useAppSelector } from "../../redux/store";
import { useGetDancePattern } from "../api/use-get-dance-pattern";
import { DancePatternDetails } from "./dance-pattern-details";

type Props = {
  id: number;
  returnUrl: string | undefined;
};

export const DancePatternDetailsView = ({ id, returnUrl }: Props) => {
  const navigate = useNavigate();
  const { dancePattern, error, loading } = useGetDancePattern({ id });
  const { addToFavorites } = useAddToFavorites();
  const { removeFromFavorites } = useRemoveFromFavorites();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleAddToFavorites = async (dancePatternId: number) => {
    await addToFavorites(dancePatternId);
  };

  const handleRemoveFromFavorites = async (id: number) => {
    await removeFromFavorites(id);
  };

  const handleNavigateBack = () => {
    if (!dancePattern) return;
    const defaultReturnUrl = "/dances/" + dancePattern.danceId;
    navigate(returnUrl || defaultReturnUrl);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;
  if (!dancePattern) return <ErrorPage message="Dance pattern not found" />;
  return (
    <DancePatternDetails
      dancePattern={dancePattern}
      isAuthenticated={isAuthenticated}
      addToFavorites={handleAddToFavorites}
      removeFromFavorites={handleRemoveFromFavorites}
      onNavigateBack={handleNavigateBack}
    />
  );
};
