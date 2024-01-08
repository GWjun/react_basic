import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOption = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const emotionOption = [
  { value: "all", name: "전부다" },
  { value: "bad", name: "안좋은 것만" },
  { value: "good", name: "좋은 것 만" },
];

const ControlMenu = ({ data, setData, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={data}
      onChange={(e) => {
        setData(e.target.value);
      }}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList = [] }) => {
  // props 비구조화 할당으로 바로 가져오기
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest"); // sort state 관리
  const [emotionType, setEmotionType] = useState("all"); // emotion state
  const [sortedList, setSortedList] = useState(diaryList);

  useEffect(() => {
    const copyList = JSON.parse(JSON.stringify(diaryList)); // 깊은 복사
    if (sortType === "oldest")
      copyList.sort((a, b) => parseInt(a.date) - parseInt(b.date));
    else copyList.sort((a, b) => parseInt(b.date) - parseInt(a.date));

    let filteredList = [];
    if (emotionType === "good")
      filteredList = copyList.filter((it) => parseInt(it.emotion) > 3);
    else if (emotionType === "bad")
      filteredList = copyList.filter((it) => parseInt(it.emotion) < 3);
    else filteredList = copyList;

    setSortedList(filteredList);
  }, [diaryList, sortType, emotionType]);

  return (
    <div className="DiaryList">
      <div className="menu">
        <div className="left_col">
          <ControlMenu // select 태그 구성
            value={sortType}
            setData={setSortType}
            optionList={sortOption}
          />
          <ControlMenu
            value={emotionType}
            setData={setEmotionType}
            optionList={emotionOption}
          />
        </div>
        <div className="right_col">
          <MyButton
            type="positive"
            text={"새 일기 작성"}
            onClick={() => navigate("./new")}
          />
        </div>
      </div>

      {sortedList.map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

export default DiaryList;
