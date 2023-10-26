import { FC, useState } from "react";
import DragAndDrop from "./components/DragAndDrop";
import { Routes, Route } from "react-router-dom";
import array from "./data/data.json";
import { handleDragOver, handleDragEnd } from "./utils/index";
import type { ItemField } from "./types";

const App: FC = () => {
  const [itemFiled] = useState<ItemField>("status");
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DragAndDrop
            columns={["open", "planned", "in-progress", "done"]}
            itemField={itemFiled}
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
