import { Container } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import CardForm from "../components/CardForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import normalizeCard from "../helpers/normalization/normalizeCard";
import useCards from "../hooks/useCards";
import cardSchema from "../models/joi-schema/cardSchema";

export default function AddCardPage() {
  const { handleCreateCard } = useCards();

  //user - useUser (provider)
  const { user } = useUser();
  //useForm (initialForm,schema,onSubmit)
  const { value, setData, ...rest } = useForm(
    initialCardForm,
    cardSchema,
    () => {
      handleCreateCard({
        ...normalizeCard({ ...value.data }),
        user_id: user._id,
        likes: [],
      });
    }
  );
  //useEffect - update the form data to this card data

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardForm
        title="add card"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
      />
    </Container>
  );
}
