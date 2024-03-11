import { Card, CardActionArea } from "@mui/material";

import React from "react";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import cardType from "../../models/types/cardType";
import { func } from "prop-types";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";

export default function CardBussinesComponent({
  card,
  handleDelete,
  handleEdit,
  handleLike,
}) {
  console.log(card);
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ width: 250, m: 2 }}>
        <CardActionArea
          onClick={() => navigate(`${ROUTES.CARD_INFO}/${card._id}`)}
        >
          <CardHead image={card.image} />
          <CardBody
            title={card.title}
            subtitle={card.subtitle}
            phone={card.phone}
            address={card.address}
            cardNumber={card.bizNumber}
          />
        </CardActionArea>
        <CardActionBar
          id={card._id}
          user_id={card.user_id}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleLike={handleLike}
          likes={card.likes}
          phone={card.phone}
        />
      </Card>
    </>
  );
}

CardBussinesComponent.propTypes = {
  card: cardType.isRequired,
  handleDelete: func,
  handleEdit: func,
  handleLike: func,
};
