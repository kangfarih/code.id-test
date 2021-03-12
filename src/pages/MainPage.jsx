import React, { Fragment } from "react";
import Movies from "../components/Movies";
import SortOption from "../components/Sort";
import ModalCard from "../components/ModalCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFilter } from "@fortawesome/free-solid-svg-icons";

export const BaseUrlApi = "https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/";

const _TYPE = {
  GET: "get",
  PUSH: "push",
  CACHE: "cache",
};
export const LimitFetch = 12;

var checkUpdate;
var _page = 0;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataMovie: [],
      DataCache: [],
      _page: 0,
      _sort: "",
      _sortAsc: true,
      _showLoading: false,
      _onFetch: false,
      _endCatalogue: false,
      _showModal: false,
      _modalData: {},
    };

    this.onchangeSort = this.onchangeSort.bind(this);
    this.changeSortType = this.changeSortType.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  // ANCHOR COMPONENT DIDMOUNT
  componentDidMount() {
    this.GetDataCache(true);
    this.scroll();
    checkUpdate = setInterval(() => {
      this.checkForUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(checkUpdate);
  }

  // ANCHOR DATA PRODUCT FUNCTION
  /**
   * Get Data Product from backend
   *
   * @param {Enumerator} type - _TYPE.GET to Replace Product || _TYPE.PUSH to Add Next Products to current product data
   */
  GetMovies = function (type = _TYPE.CACHE, sortVal, _page) {
    console.log(
      `Fetch from ${BaseUrlApi}movies?page=${
        this.state._page
      }&limit=${LimitFetch}&sortBy=${
        this.state._sort != ""
          ? `${this.state._sort}&order=${this.state._sortAsc ? "asc" : "desc"}`
          : this.state._sort
      } : ${type}`
    );
    _page = this.state._page;
    fetch(
      `${BaseUrlApi}movies?page=${
        this.state._page
      }&limit=${LimitFetch}&sortBy=${
        this.state._sort != ""
          ? `${this.state._sort}&order=${this.state._sortAsc ? "asc" : "desc"}`
          : this.state._sort
      }`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (sortVal != this.state._sort) {
            return;
          }
          if (result.length < 1 || typeof result == "string") {
            this.setState({ _endCatalogue: true, _showLoading: false });
            return;
          }
          result.map((dat, idx) => {
            dat._page = _page;
            dat._sort = sortVal;
          });

          switch (type) {
            case _TYPE.CACHE:
              this.SetDataCache(result);
              break;
            case _TYPE.PUSH:
              break;
            case _TYPE.GET:
              break;
            default:
              this.SetDataCache(result);
              break;
          }
        },
        (error) => {
          console.error(error);
          this.setState({ _onFetch: false });
        }
      );
  };

  // ANCHOR DATA STATE CONTROL
  /**
   * Get Cache data when idle
   * @param {} showLoader - showing loader or not
   */
  GetDataCache = function (showLoader = false) {
    if (this.state._onFetch) {
      return;
    }
    if (this.state.DataCache.length > 0 || this.state._endCatalogue) {
      return;
    }
    this.setState(
      (state) => {
        return {
          _page: state._page + 1,
          _onFetch: true,
          _showLoading: showLoader,
        };
      },
      () => {
        this.GetMovies(_TYPE.CACHE, this.state._sort);
      }
    );
  };

  /**
   * Set Data to DataChace state
   * @param {*} data - Data Product
   */
  SetDataCache = function (data) {
    let products = this.state.DataCache;
    products.push(...data);
    this.setState({ DataCache: products, _onFetch: false }, () => {
      if (this.state._showLoading) {
        this.LoadFromCache();
      }
    });
  };

  LoadFromCache = function () {
    if (this.state.DataCache.length == 0) {
      if (this.state._onFetch) {
        this.setState({ _showLoading: true });
      } else {
        this.GetDataCache(true);
      }
      return;
    }
    this.setState({ _showLoading: true }, () => {
      let _mov = this.state.DataMovie;
      let _cach = this.state.DataCache;
      _mov = _mov.concat(_cach);

      this.setState(
        {
          DataCache: [],
          DataMovie: _mov,
          _showLoading: false,
        },
        () => {
          this.GetDataCache();
        }
      );
    });
  };

  // ANCHOR EVENT HANDLER
  /**
   * Event Handler for Changing Sort Select Option
   */
  onchangeSort = function (e) {
    e.preventDefault();
    var sortVal = e.target.value;
    this.setState(
      {
        _onFetch: false,
        _sort: sortVal,
        _page: 0,
        DataCache: [],
        DataMovie: [],
      },
      () => {
        this.GetDataCache(true);
      }
    );
  };
  changeSortType = function (e) {
    e.preventDefault();
    this.setState(
      {
        _onFetch: false,
        _sortAsc: !this.state._sortAsc,
        _page: 0,
        DataCache: [],
        DataMovie: [],
      },
      () => {
        this.GetDataCache(true);
      }
    );
  };

  /**
   * @param {Object} data - Object Data Product
   * @param {boolean} display - True / False
   */
  toggleModal = function (data, display = true) {
    this.setState({
      _showModal: display,
      _modalData: data,
    });
  };

  // ANCHOR SCROLL DETECTING
  /**
   * Detecting for Scrolling Down to the bottom of page
   */
  scroll = function () {
    window.onscroll = () => {
      this.checkForUpdate();
    };
  };

  isAtBottomWindow = function () {
    return (
      document.documentElement.scrollTop +
        window.innerHeight -
        document.documentElement.offsetHeight >
        -5 &&
      document.documentElement.scrollTop +
        window.innerHeight -
        document.documentElement.offsetHeight <
        5
    );
  };

  checkForUpdate = function () {
    if (this.isAtBottomWindow()) {
      this.LoadFromCache();
    }
  };

  // ANCHOR RENDER ( )
  render() {
    return (
      <Fragment>
        <main className="App-main">
          <div className="Main">
            <article className="carousel">
              <h2>MOVIES CATALOGUE</h2>
            </article>
            <article className="utilities">
              <section className="filter">
                <span className="icon">
                  <FontAwesomeIcon icon={faFilter} />
                </span>
                <select name="" id="" disabled>
                  <option value="Filter">Filter</option>
                </select>
              </section>
              <SortOption
                onChangeFunc={this.onchangeSort}
                changeSortType={this.changeSortType}
                sortAsc={this.state._sortAsc}
              />
            </article>
            <Movies
              data={this.state.DataMovie}
              isLoading={this.state._showLoading}
              isEndCatalogue={this.state._endCatalogue}
              toggleModal={this.toggleModal}
            />
          </div>
        </main>
        <ModalCard
          show={this.state._showModal}
          toggleModal={this.toggleModal}
          data={this.state.DataMovie.length > 1 ? this.state._modalData : ""}
        />
      </Fragment>
    );
  }
}

export default MainPage;
