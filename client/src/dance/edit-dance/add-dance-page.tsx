import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddDance } from "../api/use-add-dance";
import { DanceForm } from "./dance-form";
import type { DanceFormValues } from "./dance-form-type";

export const AddDancePage = () => {
  const [loading, setLoading] = useState(false);
  const { addDance } = useAddDance();
  const navigate = useNavigate();

  const handleSubmit = async (values: DanceFormValues) => {
    console.log("submitting:", values);

    setLoading(true);
    try {
      const createdDance = await addDance(values);
      if (!createdDance) return;

      console.log(`Dance created: ${createdDance.name}`);

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DanceForm
      onCancel={() => navigate("/")}
      onSubmit={handleSubmit}
      submitting={loading}
    />
  );
};
