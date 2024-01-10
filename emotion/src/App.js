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

  localStorage.setItem("diary_data", JSON.stringify(newState));
  return newState;
};

export const StateContext = React.createContext(); // export
export const DispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem("diary_data");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (diaryList.length > 0) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: "init", data: diaryList });
      }
    }
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
