import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";
import AddNewCardButton from "../components/card/AddNewCardButton";

export default function MyCards() {
  const { value, handleGetMyCards, handleDeleteCard, handleLikeCard } =
    useCards();
  const { filterCards, error, isLoading } = value;

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.CARDS);
    } else {
      handleGetMyCards();
    }
  }, [user, handleGetMyCards, navigate]);

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    await handleGetMyCards();
  };

  return (
    <div>
      <Container sx={{ mt: 2 }}>
        <PageHeader
          title="Cards"
          subtitle="On this page you can find all bussines cards from all categories"
        />
        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={filterCards}
          handleDelete={handleDelete}
          handleLike={handleLikeCard}
        />
        <AddNewCardButton />
      </Container>
    </div>
  );
}
