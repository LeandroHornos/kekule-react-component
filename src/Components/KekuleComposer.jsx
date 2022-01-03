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

import React, { useEffect, useState, useCallback } from "react";
import Kekule from "kekule";
import Modal from "./Modal";
import useWindowSize from "../CustomHooks/useWindowSize";

import {
  BsFillPhoneFill,
  BsFillPhoneLandscapeFill,
  BsArrowRepeat,
} from "react-icons/bs";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import PropTypes from "prop-types";

const KekuleComposer = (props) => {
  // Pass this functions via props from the parent component
  // to get the composer content and perform actions with it
  const { getContent, getMolecules, getSelected } = props;

  // Kekule composer
  const composerCont = React.createRef();
  const [composer, setComposer] = useState(null);

  // Screen management Hooks & state
  const [width, height] = useWindowSize();
  const handle = useFullScreenHandle();
  const [showModal, setShowModal] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

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

  // SCREEN MANAGEMENT

  useEffect(() => {
    // Condicion para mostrar el Modal
    const breakpoint = 500;
    const mustShowModal = (width < breakpoint) & (width < height);
    if (mustShowModal) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [width, height]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const reportFullscreenChange = useCallback((state, handle) => {
    console.log("state", state, "handle", handle);
    setFullscreen(state);
  });

  // COMPOSER FUNCTIONALITY

  const returnContent = () => {
    /* This method returns the content of the
    composer and passes it to a function recieved
    by props that does something with de content */

    const content = composer.getChemObj();
    console.log("Contenido del composer:", content);

    getContent(content);
  };

  const returnMolecules = () => {
    /* This method returns an array containing
    the molecules drawn on the composer and passes 
    it to a function recieved  by props that does 
    something with de content */

    let mols = composer.exportObjs(Kekule.Molecule);
    mols = mols.map((mol) => {
      return {
        object: mol,
        smiles: Kekule.IO.saveFormatData(mol, "smi"),
        mol: Kekule.IO.saveFormatData(mol, "mol"),
        cml: Kekule.IO.saveFormatData(mol, "cml"),
      };
    });
    console.log("mols", mols);
    getMolecules(mols);
  };

  const returnSelected = () => {
    /* This method returns an object with the
    selected elements in the composer */

    // const { getSelected } = props
    const content = composer.getSelection();
    console.log("Contenido seleccionado:", content);
    getSelected(content);
  };

  return (
    <FullScreen handle={handle} onChange={reportFullscreenChange}>
      <div className="row m-0" style={{ overflowY: "auto" }}>
        <div className="editor-side-bar col-md-2 d-flex flex-column align-items-center justify-content-start pb-2">
          <div class="d-grid gap-2 w-100" style={{ paddingTop: "20px" }}>
            {!fullscreen ? (
              <button
                class="btn editor-side-btn shadow-sm shadow-intensity-lg mt-2"
                type="button"
                onClick={handle.enter}
              >
                Pantalla completa
              </button>
            ) : (
              <button
                class="btn editor-side-btn shadow-sm shadow-intensity-lg mt-2"
                type="button"
                onClick={handle.exit}
              >
                Salir de pantalla completa
              </button>
            )}
            <span>
              Window size: {width} x {height}
            </span>
          </div>
          <div
            className="d-grid gap-2 w-100 pb-3"
            style={{ paddingTop: "20px" }}
          >
            <button
              className="btn editor-side-btn shadow-sm shadow-intensity-lg mt-2"
              type="button"
              onClick={returnContent}
            >
              Obtener contenido
            </button>
            <button
              className="btn editor-side-btn shadow-sm shadow-intensity-lg mt-2"
              type="button"
              onClick={returnSelected}
            >
              Obtener selección
            </button>
            <button
              className="btn btn-info shadow-sm shadow-intensity-lg mt-2"
              type="button"
              onClick={returnMolecules}
            >
              Obtener moléculas
            </button>
          </div>
        </div>
        <div className="col-md-10 p-0">
          <Modal
            show={showModal}
            handleClose={handleCloseModal}
            allowClosing={false}
          >
            <div
              className="row w-100 h-100"
              style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
            >
              <div className="col-12 w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                <img src="./android-chrome-192x192.png" alt="rocket icon" />
                <p className="text-center" style={{ color: "rgb(25,150,180)" }}>
                  Gira el dispositivo hacia la posición{" "}
                  <strong>horizontal</strong> para usar el editor de moléculas
                </p>

                <BsFillPhoneFill size={60} color="rgba(25,150,180, 0.3)" />
                <BsArrowRepeat size={60} color="rgb(150,150,150)" />
                <BsFillPhoneLandscapeFill size={60} color="rgb(25,200,180)" />
              </div>
            </div>
          </Modal>
          <div className="composer-container bg-texture">
            {/* zIndex: when you go fullscreen menus won't show
            unless you raise the component's z-index */}
            <div
              ref={composerCont}
              className="shadow shadow-intensity-lg"
              style={{ zIndex: "100" }}
            />
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

KekuleComposer.propTypes = {
  getContent: PropTypes.func,
  getMolecules: PropTypes.func,
  getSelected: PropTypes.func,
};

KekuleComposer.defaultProps = {
  getContent: (data) => {},
  getMolecules: (data) => {},
  getSelected: (data) => {},
};

export default KekuleComposer;
