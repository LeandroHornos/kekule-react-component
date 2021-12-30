import React from "react";
import "./App.css";
import "./custom.css";
import KekuleComposer from "./Components/KekuleComposer.jsx";

function App() {
  return (
    <React.Fragment>
      <div className="row z-index-2">
        <div
          className="col-12 pb-2 d-flex flex-column align-items-center justify-content-around shadow-sm"
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
        <div className="col-12 m-0 p-0">
          <KekuleComposer />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
