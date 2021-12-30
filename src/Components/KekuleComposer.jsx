/* After clonning this repo you can run "npm install" to download an installl
all needed packages and then run the app with "npm start".
That will work, but when you create a production build you will find that you
only see a black screeen and, on the console, you will find a message that says
"Uncaught TypeError: e is not a function
at initialize (kekule.min.js:1)
at new i (kekule.min.js:1)..."
According to PatrigceJiang, the creator of Kekule.js:

the problem is caused by the js minification process in build. 
You have to manually set the some mangle configs for webpack. 

In the node_modules/react-scripts/config/webpack.config.js, 
please add a line of code in after line 234 (nowadays is actually line 270):

optimization: {
  ...
  minimizer: [
    ...
    new TerserPlugin({
      ...
      mangle: {
        safari10: true,   // line 270
        reserved: ['$super', '$origin']    // add this line of code
      }
      ...
    })
    ...
  ]
  ...
}
 */

import React, { useEffect, useState } from "react";
import Kekule from "kekule";
import Modal from "./Modal";

const KekuleComposer = () => {
  const composerCont = React.createRef();

  const [composer, setComposer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const showComposer = () => {
      const comp = new Kekule.Editor.Composer(composerCont.current);
      comp.setCommonToolButtons([
        "newDoc",
        "loadData",
        "saveData",
        "undo",
        "redo",
        "copy",
        "cut",
        "paste",
        "zoomIn",
        "reset",
        "zoomOut",
      ]);
      comp.setDimension("95%", "95vh");

      setComposer(comp);
    };

    showComposer();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="row m-0">
      <div className="col-md-10 p-0">
        <Modal show={showModal} handleClose={handleCloseModal}>
          <p>Hola! soy el modal</p>
        </Modal>
        <div className="composer-container bg-texture">
          <div ref={composerCont} className="shadow shadow-intensity-lg" />
        </div>
      </div>
      <div className="editor-side-bar col-md-2 d-flex flex-column align-items-center justify-content-between pb-2">
        <div class="d-grid gap-2 w-100" style={{ paddingTop: "20px" }}>
          <button
            class="btn editor-side-btn shadow-sm shadow-intensity-lg mt-2"
            type="button"
          >
            Button
          </button>
          <button
            class="btn editor-side-btn shadow-sm shadow-intensity-lg mt-2"
            type="button"
          >
            Button
          </button>
        </div>
        <div class="d-grid gap-2 w-100 pb-3" style={{ paddingTop: "20px" }}>
          <button
            class="btn btn-info shadow-sm shadow-intensity-lg mt-2"
            type="button"
          >
            Ver moléculas
          </button>
        </div>
      </div>
    </div>
  );
};

export default KekuleComposer;
