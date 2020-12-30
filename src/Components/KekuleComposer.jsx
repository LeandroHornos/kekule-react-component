import React, { useEffect, useState } from "react";
import Kekule from "kekule";

const KekuleComposer = () => {
  const composerCont = React.createRef();

  const [composer, setComposer] = useState(null);

  useEffect(() => {
    const showComposer = () => {
      const comp = new Kekule.Editor.Composer(composerCont.current);
      comp.setCommonToolButtons([
        "loadData",
        "undo",
        "redo",
        "copy",
        "cut",
        "paste",
      ]);
      comp.setDimension("90%", "90vh");

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
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(26, 45, 49)"
  },
};

export default KekuleComposer;
