import { ErrorPage } from "../../common/ErrorPage";
import { Loader } from "../../common/Loader";
import { useAddToFavorites } from "../api/use-add-to-favorites";
import { useGetDancePattern } from "../api/use-get-dance-pattern";
import { useRemoveFromFavorites } from "../api/use-remove-from-favorites";
import { DancePatternDetails } from "./dance-pattern-details";

type Props = { id: number };

export const DancePatternDetailsView = ({ id }: Props) => {
  const { dancePattern, error, loading, refetch } = useGetDancePattern({ id });
  const { addToFavorites } = useAddToFavorites();
  const { removeFromFavorites } = useRemoveFromFavorites();
  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;
  if (!dancePattern) return <ErrorPage message="Dance pattern not found" />;

  console.log("Rendering DancePatternDetailsView");

  const handleAddToFavorites = async (dancePatternId: number) => {
    await addToFavorites(dancePatternId);
    await refetch({ id });
  };

  const handleRemoveFromFavorites = async (id: number) => {
    await removeFromFavorites(id);
    await refetch({ id });
  };

  return (
    <>
      <button
        onClick={async () => {
          const data = await refetch({ id });
          console.log("Refetch data", data);
        }}
      >
        Refetch
      </button>
      <DancePatternDetails
        dancePattern={dancePattern}
        addToFavorites={handleAddToFavorites}
        removeFromFavorites={handleRemoveFromFavorites}
      />
    </>
  );
};
