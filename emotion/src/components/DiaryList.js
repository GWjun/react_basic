import { useEffect, useState } from "react";

const optionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = ({ data, setData, optionList }) => {
  return (
    <select
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
  const [sortType, setSortType] = useState("latest"); // slect state 관리
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    const copyList = JSON.parse(JSON.stringify(diaryList)); // 깊은 복사
    if (sortType === "oldest")
      copyList.sort(
        (a, b) => parseInt(a.date) - parseInt(b.date) // 숫자형으로
      );
    else copyList.sort((a, b) => parseInt(b.date) - parseInt(a.date));

    setSortedList(copyList);
  }, [diaryList, sortType]);

  return (
    <div>
      <ControlMenu // select 태그 구성
        value={sortType}
        setData={setSortType}
        optionList={optionList}
      />
      {sortedList.map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

export default DiaryList;
