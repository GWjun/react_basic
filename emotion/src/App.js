import React, { useEffect, useReducer, useRef } from "react";

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
      newState = state.map(
        (it) => (it.id === action.data.id ? { ...action.data } : it) // spread, 객체 반환 하므로 ()로 감싸기
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const StateContext = React.createContext(); // export
export const DispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "안녕",
    date: 1704432171506,
  },
  {
    id: 2,
    emotion: 4,
    content: "하시",
    date: 1704432171510,
  },
  {
    id: 3,
    emotion: 1,
    content: "렵니까",
    date: 1715452181426,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(4);

  const onInit = () => {
    dispatch({
      type: "init",
      data: dummyData,
    });
  };

  useEffect(() => {
    onInit();
  }, []);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "create",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
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
        date: new Date(date).getTime(),
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
              <Route path="/Edit/:id" element={<Edit />} />
              <Route path="/Diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
