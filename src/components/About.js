import React from "react";
import "../App.css";
import Crud from "./Crud";
import Example from "./table-Crud";
import SubHeader from "./SubHeader";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <SubHeader />
      <Example tasks = 
      {
        {
          _id: "5f10a5679adbe08ba4a578ae",
          updatedAt: "2020-07-16T19:07:19.463Z",
          createdAt: "2020-07-16T19:07:19.463Z",
          id: "1",
          title: "My First Note",
          content: "This is my first note in EasyNotes application",
          __v: 0
      }
      }
    />
    </div>
  );
}

export default App;