import { ReactElement } from "react";
import ErrorModal from "./components/ErrorModal";
import Loader from "./components/Loader";

import VideoCatalog from "./components/VideoCatalog";

function App(): ReactElement {
  return (
    <>
      <VideoCatalog />
      <Loader />
      <ErrorModal />
    </>
  );
}

export default App;
