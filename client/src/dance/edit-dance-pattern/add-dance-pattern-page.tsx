import { useNavigate, useParams } from "react-router";
import { useAddDancePattern } from "../api/use-add-dance-pattern";
import { DancePatternForm } from "./dance-pattern-form";
import { DancePatternFormType } from "./dance-pattern-form-type";

type RouteParams = {
  danceId: string;
};

export const AddDancePatternPage = () => {
  const { danceId: danceIdStr } = useParams<RouteParams>();
  const navigate = useNavigate();
  const { addDancePattern, loading } = useAddDancePattern();
  const returnUrl = `/dances/${danceIdStr}`;

  const handleSubmit = async (values: DancePatternFormType) => {
    if (!danceIdStr) {
      console.error(`Invalid dance ID '${danceIdStr}'`);
      return;
    }
    const danceId = parseInt(danceIdStr);
    const created = await addDancePattern({
      name: values.name,
      description: values.description,
      videoUrl: values.videoUrl,
      danceId: danceId,
    });
    if (!created) return;
    navigate(returnUrl);
  };

  return (
    <DancePatternForm
      onCancel={() => navigate(returnUrl)}
      onSubmit={handleSubmit}
      submitting={loading}
    />
  );
};
