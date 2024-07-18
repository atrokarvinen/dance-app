import { useNavigate } from "react-router";
import { selectIsAuthenticated } from "../../auth/auth-store";
import { ErrorPage } from "../../common/ErrorPage";
import { Loader } from "../../common/Loader";
import { useAppSelector } from "../../redux/store";
import { useAddToFavorites } from "../api/use-add-to-favorites";
import { useGetDancePattern } from "../api/use-get-dance-pattern";
import { useRemoveFromFavorites } from "../api/use-remove-from-favorites";
import { DancePatternDetails } from "./dance-pattern-details";

type Props = {
  id: number;
  returnUrl: string | undefined;
};

export const DancePatternDetailsView = ({ id, returnUrl }: Props) => {
  const navigate = useNavigate();
  const { dancePattern, error, loading, refetch } = useGetDancePattern({ id });
  const { addToFavorites } = useAddToFavorites();
  const { removeFromFavorites } = useRemoveFromFavorites();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;
  if (!dancePattern) return <ErrorPage message="Dance pattern not found" />;

  const handleAddToFavorites = async (dancePatternId: number) => {
    await addToFavorites(dancePatternId);
    await refetch({ id });
  };

  const handleRemoveFromFavorites = async (id: number) => {
    await removeFromFavorites(id);
    await refetch({ id });
  };

  const handleNavigateBack = () => {
    const defaultReturnUrl = "/dances/" + dancePattern.danceId;
    navigate(returnUrl || defaultReturnUrl, { replace: true });
  };

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
