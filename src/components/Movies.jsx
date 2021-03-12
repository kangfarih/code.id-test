import Card, { CardLoading } from "./Card";
import { BaseUrlApi, LimitFetch } from "../pages/MainPage";
import { Fragment, Suspense } from "react";

export default function Product(param) {
  var endCatalogue = <div></div>;
  var openmodal = param.toggleModal;
  var loadingCard = [];

  for (let i = 0; i < LimitFetch; i++) {
    loadingCard.push(<CardLoading key={"loading" + i} />);
  }

  // ANCHOR END CATALOGUE
  if (param.isEndCatalogue) {
    endCatalogue = (
      <div className="end-catalogue">
        <span>
          {param.state._page > 1 ? "End of Catalogue" : "Data Not Found"}
        </span>
      </div>
    );
  }

  return (
    <Fragment>
      <article className="movies">
        {param.data.map((dat, key) => {
          return <Card key={dat.id} data={dat} openmodal={openmodal} />;
        })}
        {param.isLoading
          ? loadingCard.map((dat, key) => {
              return dat;
            })
          : null}
      </article>
      <article className="loading-box">{endCatalogue}</article>
    </Fragment>
  );
}

// ANCHOR ON LOADING === UNUSED ANYMORE
function LoadingProduct(param) {
  return (
    <div
      className={`loading ${param.isLoading ? "show" : ""} ${
        param.type == "empty" ? "full" : ""
      }`}
    >
      <div className="loadingText">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  );
}
