import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";

const offset = new Date().getTimezoneOffset() * 60000;
const krDate = new Date(Date.now() - offset);

const DiaryEditor = () => {
  const [date, setDate] = useState(krDate.toISOString().slice(0, 10));
  const navigate = useNavigate();
  return (
    <div className="DiaryEditor">
      <MyHeader
        headtext={"새로운 일기 쓰기"}
        leftchild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
