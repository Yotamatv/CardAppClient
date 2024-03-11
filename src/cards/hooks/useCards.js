import { useCallback, useEffect, useMemo, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import { useUser } from "../../users/providers/UserProvider";
import {
  changeLikeStatus,
  createCard,
  deleteCard,
  editCard,
  getCard,
  getCards,
  getMyCards,
} from "../services/cardApiService";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

export default function useCards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [card, setCard] = useState(null);
  const [filterCards, setFilterCards] = useState(null);
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  useAxios();
  const snack = useSnack();
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);
  useEffect(() => {
    if (cards)
      setFilterCards(
        cards.filter(
          (card) =>
            card.title.includes(query) || String(card.bizNumber).includes(query)
        )
      );
  }, [cards, query]);
  const requestStatus = (loading, errorMessage, cards, card = null) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };

  const handleGetCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards);
      snack("success", "All the cards are here!");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [snack]);

  const handleGetMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleDeleteCard = useCallback(async (cardId) => {
    try {
      setLoading(true);
      await deleteCard(cardId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  //handleGetCard
  const handleGetCard = useCallback(async (cardId) => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      requestStatus(false, null, null, card);
      return card;
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  //handleUpdateCard
  const handleUpdateCard = useCallback(
    async (cardId, cardFromClient) => {
      try {
        setLoading(true);
        const card = await editCard(cardId, cardFromClient);
        requestStatus(false, null, null, card);
        snack("success", "The business card has been successfully updated");
        setTimeout(() => {
          navigate(ROUTES.ROOT);
        }, 1000);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [snack, navigate]
  );

  //handleLikeCard
  const handleLikeCard = useCallback(
    async (cardId) => {
      try {
        await changeLikeStatus(cardId);
        snack("success", "The business card has been Liked");
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [snack]
  );
  //handleGetFavCards
  const handleGetFavCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      const favCards = cards.filter((card) => card.likes.includes(user.id));
      requestStatus(false, null, favCards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [user]);

  //handleCreateCard
  const handleCreateCard = useCallback(
    async (cardFromClient) => {
      try {
        setLoading(true);
        console.log(JSON.stringify(cardFromClient));
        console.log(cardFromClient);

        const card = await createCard(cardFromClient);
        requestStatus(false, null, null, card);
        snack("success", "A new business card has been created");
        setTimeout(() => {
          navigate(ROUTES.ROOT);
        }, 1000);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [snack, navigate]
  );

  const value = useMemo(() => {
    return { isLoading, cards, card, error, filterCards };
  }, [isLoading, cards, card, error, filterCards]);

  return {
    value,
    handleGetCards,
    handleGetMyCards,
    handleDeleteCard,
    handleGetCard,
    handleUpdateCard,
    handleCreateCard,
    handleGetFavCards,
    handleLikeCard,
  };
}
