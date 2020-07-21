import React from "react";
import "./App.css";
import Crud from "./components/Crud";
import Header from "./components/Header";
import axios from 'axios'

function App() {
  axios.get("http://localhost:5000/notes")
  .then((res) => (console.log(res)))
  .catch(function (error) {
    console.log(error);
  });
  return (
    <div className="App">
      <Header />
      <Crud x="99" />
    </div>
  );
}

export default App;