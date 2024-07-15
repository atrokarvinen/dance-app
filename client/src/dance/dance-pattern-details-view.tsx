import { ErrorPage } from "../common/ErrorPage";
import { Loader } from "../common/Loader";
import { useAddToFavorites } from "./api/use-add-to-favorites";
import { useGetDancePattern } from "./api/use-get-dance-pattern";
import { useRemoveFromFavorites } from "./api/use-remove-from-favorites";
import { DancePatternDetails } from "./dance-pattern-details";

type Props = { id: number };

export const DancePatternDetailsView = ({ id }: Props) => {
  const { dancePattern, error, loading } = useGetDancePattern({ id });
  const { addToFavorites } = useAddToFavorites();
  const { removeFromFavorites } = useRemoveFromFavorites();
  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;
  if (!dancePattern) return <ErrorPage message="Dance pattern not found" />;

  return (
    <DancePatternDetails
      dancePattern={dancePattern}
      addToFavorites={addToFavorites}
      removeFromFavorites={removeFromFavorites}
    />
  );
};
