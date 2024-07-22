import { useNavigate } from "react-router";
import { ErrorPage } from "../../common/ErrorPage";
import { Loader } from "../../common/Loader";
import { useGetDance } from "../api/use-get-dance";
import { useUpdateDance } from "../api/use-update-dance";
import { DanceForm } from "./dance-form";
import { DanceFormType } from "./dance-form-type";

type Props = {
  danceId: number;
};

export const EditDanceView = ({ danceId }: Props) => {
  const { dance, error, loading } = useGetDance(danceId);
  const { updateDance, loading: submitting } = useUpdateDance();
  const navigate = useNavigate();

  const handleUpdateDance = async (values: DanceFormType) => {
    const result = await updateDance({ id: danceId, name: values.name });
    if (!result) return;
    navigate("/");
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;
  if (!dance) return <ErrorPage message="Dance not found" />;

  const defaultValues: DanceFormType = { name: dance.name };
  return (
    <DanceForm
      onSubmit={handleUpdateDance}
      defaultValues={defaultValues}
      submitting={submitting}
    />
  );
};
