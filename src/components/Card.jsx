import { Fragment } from "react";
import { CardDate } from "../utilities/DateFormator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Card(param) {
  let dat = param.data;
  let openmodal = () => {
    param.openmodal(dat);
  };
  return (
    <Fragment>
      <article id={dat.id} className="card" onClick={openmodal}>
        <div className="title">
          <span>{dat.title}</span>
        </div>
        <div
          className="image-box"
          style={{ backgroundImage: `url(${dat.image})` }}
        ></div>
        <div className="detail-box">
          <div className="size">
            <FontAwesomeIcon icon={faHeart} /> {dat.like}
          </div>
          <div className="date">{CardDate(dat.showTime)}</div>
        </div>
      </article>
    </Fragment>
  );
}

export function CardLoading() {
  return (
    <Fragment>
      <article id="" className="card">
        <div className="card-load title"></div>
        <div className="card-load image-box"></div>
        <div className="detail-box">
          <div className="card-load size"></div>
          <div className="card-load date"></div>
        </div>
      </article>
    </Fragment>
  );
}
