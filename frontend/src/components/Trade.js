import React, { useState } from "react";
import { useAbortableEffect } from "../Utils";
import UserService from "../services/user.service";
import TradeByUser from "./TradeByUser";
import TradeByCultivar from "./TradeByCultivar";

const Trade = () => {
  const [cultivars, setCultivars] = useState([]);
  const [users, setUsers] = useState({});

  useAbortableEffect((status) => {
    retrieveCultivars(status);
  }, []);

  const retrieveCultivars = (status) => {
    UserService.getTrade()
      .then((res) => {
        if (!status.aborted) {
          setCultivars(res.data);
          let users = {};
          res.data.forEach((cultivar) => {
            cultivar.users.forEach((user) => {
              if (!(user.username in users)) {
                users[user.username] = {
                  email: user.email,
                  contactInfo: user.contactInfo,
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
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <TradeByCultivar cultivars={cultivars} />
      <TradeByUser users={users} />
    </div>
  );
};

export default Trade;
