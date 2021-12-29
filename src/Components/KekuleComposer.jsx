import React, { useEffect, useState } from "react";
import Kekule from "kekule";

const KekuleComposer = () => {
  const composerCont = React.createRef();

  const [composer, setComposer] = useState(null);

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
        "config",
        "objInspector",
      ]);
      comp.setDimension("95%", "95vh");

      setComposer(comp);
    };

    showComposer();
  }, []);
  return (
    <div style={styles.composerContainer}>
      <div ref={composerCont} />
    </div>
  );
};

const styles = {
  composerContainer: {
    padding: "50px 0px",
    width: "100%",
    height: "200vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    background: "rgb(50, 50, 50)",
  },
};

export default KekuleComposer;
