import { useState } from "react";
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
  const { addDancePattern } = useAddDancePattern();
  const returnUrl = `/dances/${danceIdStr}`;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: DancePatternFormType) => {
    if (!danceIdStr) {
      console.error(`Invalid dance ID '${danceIdStr}'`);
      return;
    }
    try {
      setLoading(true);
      const danceId = parseInt(danceIdStr);
      await addDancePattern({
        name: values.name,
        description: values.description,
        videoUrl: values.videoUrl,
        danceId: danceId,
      });
      navigate(returnUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DancePatternForm
      onCancel={() => navigate(returnUrl)}
      onSubmit={handleSubmit}
      submitting={loading}
    />
  );
};
