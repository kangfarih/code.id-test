import React from "react";

import "./App.css";
import MainPage from "./pages/MainPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "Web App" };
  }

  render() {
    return (
      <div className="App">
        <MainPage />
        <footer></footer>
      </div>
    );
  }
}

export default App;
