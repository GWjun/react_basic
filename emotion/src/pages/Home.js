import { useContext, useEffect, useState } from "react";
import { StateContext } from "../App.js"; // default 아니므로

import MyHeader from "../components/MyHeader.js";
import MyButton from "../components/MyButton.js";
import DiaryList from "../components/DiaryList.js";

const Home = () => {
  const diaryList = useContext(StateContext); // 원본 데이터
  const [data, setData] = useState([]); // 날짜별로 정제한 데이터
  const [curDate, setCurDate] = useState(new Date());
  const headtext = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length > 0) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();
      setData(
        diaryList.filter((it) => firstDay < it.date && lastDay > it.date)
      );
    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  return (
    <>
      <MyHeader
        headtext={headtext}
        leftchild={<MyButton text={"<"} onClick={() => decreaseMonth()} />}
        rightchild={<MyButton text={">"} onClick={() => increaseMonth()} />}
      />
      <DiaryList diaryList={data} />
    </>
  );
};

export default Home;
