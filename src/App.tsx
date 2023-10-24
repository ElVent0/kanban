import { FC } from "react";
import DragAndDrop from "./components/DragAndDrop";
import { Routes, Route } from "react-router-dom";
import array from "./data/data.json";
import { handleDragOver, handleDragEnd } from "./utils/index";

const App: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DragAndDrop
            columns={["open", "planned", "in-progress", "done"]}
            itemField="status"
            itemsOriginal={array}
            onChangeOver={handleDragOver}
            onChangeEnd={handleDragEnd}
          />
        }
      />
    </Routes>
  );
};

export default App;
