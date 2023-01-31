import React, { useState } from "react";

const TradeByUser = ({ users }) => {
  //console.log(users);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const setActiveUser = (user, index) => {
    //console.log(user);
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const cultivarsOffered = (user) => {
    return Array.from(user[1].cultivars).reduce((count, cultivar) => {
      return count + (cultivar.offer === true ? 1 : 0);
    }, 0);
  };

  const cultivarsWanted = (user) => {
    return Array.from(user[1].cultivars).reduce((count, cultivar) => {
      return count + (cultivar.want === true ? 1 : 0);
    }, 0);
  };

  return (
    <>
      <div className="columns">
        <div className="column">
          <h4 className="title is-4">Who can I trade with</h4>
          <table className="table is-striped is-narrow is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Users</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr key={user[0]}>
                    <td
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveUser(user, index)}
                      key={index}
                    >
                      {user[0]}
                      &nbsp;
                      <span className="tag is-rounded is-success">
                        {cultivarsOffered(user)} offers
                      </span>
                      <span className="tag is-rounded is-info">
                        {cultivarsWanted(user)} wants
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="column">
          {currentUser ? (
            <div>
              <h4 className="title is-5">Availability</h4>
              {currentUser[1].email !== "" ? (
                <div className="block">
                  <label className="has-text-weight-bold">Email:</label>
                  <p className="ml-3">{currentUser[1].email}</p>
                </div>
              ) : (
                ""
              )}
              {currentUser[1].contactInfo &&
              currentUser[1].contactInfo !== "" ? (
                <div className="block">
                  <label className="has-text-weight-bold">Contact Info:</label>
                  <p className="ml-3">{currentUser[1].contactInfo}</p>
                </div>
              ) : (
                ""
              )}
              <div className="block">
                <label className="has-text-weight-bold">Cultivars:</label>
                <ul className="ml-3">
                  {Array.from(currentUser[1].cultivars).map((cultivar, index) =>
                    cultivar.want ? (
                      <li key={index}>
                        <strong>Wants:</strong> {cultivar.name}
                      </li>
                    ) : cultivar.offer ? (
                      <li key={index}>
                        <strong>Offers:</strong> {cultivar.name}{" "}
                        {cultivar.offerDescription
                          ? " (" + cultivar.offerDescription + ")"
                          : null}
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a user...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TradeByUser;
