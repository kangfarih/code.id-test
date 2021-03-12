import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
const _OPTION = {
  DEFAULT: "",
  SHOWTIME: "showTime",
  TITLE: "title",
  LIKE: "like",
  ID: "id",
};

export default function SortOption(param) {
  let list_option = [];
  for (var k in _OPTION) list_option.push(k);
  return (
    <section className="sort">
      <span className="icon">
        <FontAwesomeIcon icon={faSort} />
      </span>
      <select className="select" onChange={param.onChangeFunc}>
        {list_option.map((odat, key) => {
          return (
            <option key={key} value={_OPTION[odat]}>
              {odat}
            </option>
          );
        })}
      </select>
      <button className="button" onClick={param.changeSortType}>
        <FontAwesomeIcon icon={param.sortAsc ? faSortUp : faSortDown} />
      </button>
    </section>
  );
}
