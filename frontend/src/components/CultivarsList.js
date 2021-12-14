import React from "react";

const CultivarsList = ({ cultivars, offers, wants, handleInputChange }) => {
  const formatQuantity = (units, value) => {
    return value > 1 ? units[1] : units[0];
  };
  const quantityOffered = (cultivar) => {
    const quantity = cultivar.offers.reduce(
      (totals, offer) => {
        return {
          offered: totals.offered + offer.offerQuantity,
          offers: totals.offers + 1
        };
      },
      { offered: 0, offers: 0 }
    );
    return quantity.offered > 0 && quantity.offers > 0 ? (
      <label>
        <span className="tag">
          {quantity.offered} available from{" "}
          {quantity.offers +
            " " +
            formatQuantity(["person", "people"], quantity.offers)}
        </span>
      </label>
    ) : quantity.offers > 0 ? (
      <label>
        <span className="tag">
          offered by{" "}
          {quantity.offers +
            " " +
            formatQuantity(["person", "people"], quantity.offers)}
        </span>
      </label>
    ) : null;
  };

  return (
    <table className="table is-striped is-narrow is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Cultivar</th>
          {offers ? <th>Quantity</th> : ""}
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {cultivars &&
          cultivars.map((cultivar) => (
            <tr key={cultivar.id}>
              <td>
                <div className="field is-grouped">
                  <p className="control">
                    <input
                      type="checkbox"
                      id={cultivar.id}
                      name={cultivar.id}
                      value={cultivar.id}
                      checked={
                        offers
                          ? offers[cultivar.id] && offers[cultivar.id].offer
                          : wants
                          ? wants[cultivar.id] && wants[cultivar.id].want
                          : false
                      }
                      onChange={handleInputChange}
                    />
                    <label className="checkbox">
                      {cultivar.category + " - " + cultivar.name}
                    </label>
                  </p>
                  {wants ? quantityOffered(cultivar) : ""}
                </div>
              </td>
              {offers ? (
                <>
                  <td>
                    {offers[cultivar.id] && offers[cultivar.id].offer ? (
                      <p className="control">
                        <input
                          type="text"
                          id="offerQuantity"
                          name={cultivar.id}
                          onChange={handleInputChange}
                          placeholder="Quantity"
                          value={
                            (offers[cultivar.id] &&
                              offers[cultivar.id].offerQuantity) ||
                            ""
                          }
                        ></input>
                      </p>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {offers[cultivar.id] && offers[cultivar.id].offer ? (
                      <div className="field">
                        <p className="control is-expanded">
                          <textarea
                            className="textarea"
                            id="offerDescription"
                            name={cultivar.id}
                            rows="1"
                            onChange={handleInputChange}
                            placeholder="Description: Flavor, size, color, growth habit..."
                            value={
                              offers[cultivar.id] &&
                              offers[cultivar.id].offerDescription
                            }
                          />
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </>
              ) : wants ? (
                <td>
                  {cultivar.offers.map((offer) => {
                    return offer.description !== "" ? (
                      <label key={offer.username}>
                        <strong>{offer.username}</strong> : {offer.description}
                      </label>
                    ) : (
                      ""
                    );
                  })}
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CultivarsList;
