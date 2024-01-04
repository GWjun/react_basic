import React, { useReducer, useRef } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.js";
import New from "./pages/New.js";
import Edit from "./pages/Edit.js";
import Diary from "./pages/Diary.js";

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "init": {
      return action.data;
    }
    case "create": {
      newState = [action.data, ...state];
      break;
    }
    case "remove": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "edit": {
      newState = state.map((it) => {
        it.id === action.data.id ? action.data : it; // spread
      });
      break;
    }
    default:
      return newState;
  }
};

const StateContext = React.createContext(); // export
const DispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "create",
      data: {
        id: dataId.current,
        data: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({
      type: "remove",
      targetId,
    });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "edit",
      data: {
        id: targetId,
        data: new Date(date).getTime(),
        content: content,
        emotion: emotion,
      },
    });
  };

  return (
    <StateContext.Provider value={data}>
      <DispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/Edit" element={<Edit />} />
              <Route path="/Diary" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
