import DateFormator, { CardDate } from "../utilities/DateFormator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function ModalCard(param) {
  let dat = param.data;
  let show = param.show;
  let closemodal = () => {
    param.toggleModal({}, false);
  };
  return (
    <div className={`modal-card${show ? " show" : ""}`}>
      <div className="background" onClick={closemodal}></div>
      <div className="box">
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
      </div>
    </div>
  );
}
