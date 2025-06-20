import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorPage } from "../../common/error-page";
import { Loader } from "../../common/loaders";
import { useGetDance } from "../api/use-get-dance";
import { useUpdateDance } from "../api/use-update-dance";
import { DanceForm } from "./dance-form";
import type { DanceFormType, DanceFormValues } from "./dance-form-type";

type Props = {
  danceId: number;
};

export const EditDanceView = ({ danceId }: Props) => {
  const { dance, error, loading, refetch } = useGetDance(danceId);
  const [submitting, setSubmitting] = useState(false);
  const { updateDance } = useUpdateDance();
  const navigate = useNavigate();

  const handleUpdateDance = async (values: DanceFormValues) => {
    try {
      setSubmitting(true);
      const result = await updateDance({
        id: danceId,
        name: values.name,
        imageBase64: values.imageBase64,
        imageUrl: values.imageUrl,
      });
      if (!result) return;
      refetch();
      navigate("/");
    } finally {
      setSubmitting(false);
    }
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
