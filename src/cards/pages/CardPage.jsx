import { Container } from "@mui/material";
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";

import useCards from "../hooks/useCards";
import CardsFeedback from "../components/CardsFeedback";
import AddNewCardButton from "../components/card/AddNewCardButton";

export default function CardPage() {
  const { value, handleGetCards, handleDeleteCard, handleLikeCard } =
    useCards();
  const { filterCards, error, isLoading } = value;

  useEffect(() => {
    handleGetCards();
  }, [handleGetCards]);

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    handleGetCards();
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
