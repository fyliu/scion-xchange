import merge from "lodash/merge";
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import TradeByUser from "./TradeByUser";
import TradeByCultivar from "./TradeByCultivar";
import TradeWantByUser from "./TradeWantByUser";
import TradeWantByCultivar from "./TradeWantByCultivar";
import TradeOfferByUser from "./TradeOfferByUser";
import TradeOfferByCultivar from "./TradeOfferByCultivar";

const Trade = () => {
  const [wantCultivars, setWantCultivars] = useState([]);
  const [offerCultivars, setOfferCultivars] = useState([]);
  const [cultivars, setCultivars] = useState([]);
  const [offers, setOffers] = useState({});
  const [wants, setWants] = useState({});
  const [users, setUsers] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveWantCultivars();
    retrieveOfferCultivars();
    retrieveCultivars();
  }, []);

  const retrieveWantCultivars = () => {
    UserService.getTradeWants()
      .then((res) => {
        //console.log(res.data);
        setWantCultivars(res.data);
        let offers = {};
        res.data.map((cultivar) => {
          cultivar.offers.map((offer) => {
            if (!(offer.username in offers)) {
              offers[offer.username] = {
                email: offer.email,
                cultivars: new Set()
              };
            }
            offers[offer.username].cultivars.add({
              name: cultivar.category + " - " + cultivar.name,
              offer: offer.offer
            });
          });
        });
        setOffers(offers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveOfferCultivars = () => {
    UserService.getTradeOffers()
      .then((res) => {
        setOfferCultivars(res.data);
        let wants = {};
        res.data.map((cultivar) => {
          cultivar.wants.map((want) => {
            if (!(want.username in wants)) {
              wants[want.username] = {
                email: want.email,
                cultivars: new Set()
              };
            }
            wants[want.username].cultivars.add({
              name: cultivar.category + " - " + cultivar.name,
              want: want.want
            });
          });
        });
        setWants(wants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCultivars = () => {
    UserService.getTrade()
      .then((res) => {
        setCultivars(res.data);
        let users = {};
        res.data.map((cultivar) => {
          cultivar.users.map((user) => {
            if (!(user.username in users)) {
              users[user.username] = {
                email: user.email,
                cultivars: new Set()
              };
            }
            users[user.username].cultivars.add({
              name: cultivar.category + " - " + cultivar.name,
              offer: user.offer,
              want: user.want
            });
          });
        });
        setUsers(users);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8 mb-3">
        <h4>Who can I trade with...</h4>

        <p>{message}</p>
      </div>

      <TradeByUser users={users} />

      <TradeByCultivar cultivars={cultivars} />

      <TradeWantByCultivar cultivars={wantCultivars} />
      <TradeOfferByCultivar cultivars={offerCultivars} />
    </div>
  );
};

export default Trade;
