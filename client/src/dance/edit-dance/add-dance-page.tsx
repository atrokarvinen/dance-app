import { useNavigate } from "react-router";
import { useAddDance } from "../api/use-add-dance";
import { DanceForm } from "./dance-form";
import { DanceFormType } from "./dance-form-type";

export const AddDancePage = () => {
  const { addDance, loading } = useAddDance();
  const navigate = useNavigate();

  const handleSubmit = async (values: DanceFormType) => {
    const createdDance = await addDance(values);
    if (!createdDance) return;

    console.log(`Dance created: ${createdDance.name}`);

    navigate("/");
  };

  return <DanceForm onSubmit={handleSubmit} submitting={loading} />;
};
