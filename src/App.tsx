import { FC } from "react";
import DragAndDrop from "./components/DragAndDrop";
import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DragAndDrop />} />
    </Routes>
  );
};

export default App;
