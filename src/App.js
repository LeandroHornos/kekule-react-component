import React from "react";
import "./App.css";
import KekuleComposer from "./Components/KekuleComposer.jsx";

function App() {
  return (
    <React.Fragment>
      <div className="row">
        <div
          className="col-12 d-flex flex-column align-items-center justify-content-around shadow"
          style={{ minHeight: "30vh" }}
        >
          <h1>Kekule composer</h1>
          <p>
            Esta es una aplicación para testear el editor de moléculas de la
            libería Kekule.js, envuelto en un componente de React.
          </p>
          <strong>Ver repo en github: </strong>
          <a href="https://github.com/LeandroHornos/kekule-react-component">
            https://github.com/LeandroHornos/kekule-react-component
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <KekuleComposer />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
