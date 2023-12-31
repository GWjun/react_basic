import { useRef, useState } from "react";
import "./App.css";
import DiaryEdior from "./DiaryEditor.js";
import DiaryList from "./DiaryList.js";

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;

    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    const newData = data.filter((it) => it.id !== targetId);
    setData(newData); // [newData], newData 자체가 배열
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <DiaryEdior onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;
