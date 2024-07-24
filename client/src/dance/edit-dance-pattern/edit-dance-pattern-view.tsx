import { useNavigate } from "react-router";
import { ErrorPage } from "../../common/error-page";
import { Loader } from "../../common/loaders";
import { useGetDancePattern } from "../api/use-get-dance-pattern";
import { useUpdateDancePattern } from "../api/use-update-dance-pattern";
import { DancePatternForm } from "./dance-pattern-form";
import { DancePatternFormType } from "./dance-pattern-form-type";

type Props = {
  danceId: number;
  dancePatternId: number;
};

export const EditDancePatternView = ({ danceId, dancePatternId }: Props) => {
  const {
    dancePattern: defaultValues,
    loading,
    error,
  } = useGetDancePattern({
    id: dancePatternId,
  });
  const navigate = useNavigate();
  const { updateDancePattern, loading: submitting } = useUpdateDancePattern();
  const returnUrl = `/dances/${danceId}`;

  const handleSubmit = async (values: DancePatternFormType) => {
    const created = await updateDancePattern({
      id: dancePatternId,
      name: values.name,
      danceId: danceId,
    });
    if (!created) return;
    navigate(returnUrl);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;
  if (!defaultValues) return <ErrorPage message="Dance pattern not found" />;

  return (
    <DancePatternForm
      defaultValues={defaultValues}
      onCancel={() => navigate(returnUrl)}
      onSubmit={handleSubmit}
      submitting={submitting}
    />
  );
};
