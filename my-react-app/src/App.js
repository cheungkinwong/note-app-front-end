import React from "react";
import Notes from "./components/getList";
import AddNote from "./components/addNote";
import "./App.css";

function App() {
     return (
          <div className="App">
               <Notes />
               <AddNote />
          </div>
     );
}

export default App;
