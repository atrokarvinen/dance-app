import { useNavigate } from "react-router";
import { ErrorPage } from "../../common/error-page";
import { Loader } from "../../common/loaders";
import { useGetDance } from "../api/use-get-dance";
import { useUpdateDance } from "../api/use-update-dance";
import { DanceForm } from "./dance-form";
import { DanceFormType, DanceFormValues } from "./dance-form-type";

type Props = {
  danceId: number;
};

export const EditDanceView = ({ danceId }: Props) => {
  const { dance, error, loading } = useGetDance(danceId);
  const { updateDance, loading: submitting } = useUpdateDance();
  const navigate = useNavigate();

  const handleUpdateDance = async (values: DanceFormValues) => {
    const result = await updateDance({
      id: danceId,
      name: values.name,
      imageBase64: values.imageBase64,
      imageUrl: values.imageUrl,
    });
    if (!result) return;
    navigate("/");
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;
  if (!dance) return <ErrorPage message="Dance not found" />;

  const defaultValues: DanceFormType = {
    name: dance.name,
    imageUrl: dance.imageUrl ?? "",
  };
  return (
    <DanceForm
      onCancel={() => navigate("/")}
      onSubmit={handleUpdateDance}
      defaultValues={defaultValues}
      submitting={submitting}
    />
  );
};
