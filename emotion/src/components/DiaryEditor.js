import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DispatchContext } from "../App";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "무야호~~",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "기부니가 조크든여",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "쏘쏘",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "건들지 마소",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "인생 망",
  },
];

const getKrDate = (date) => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const krDate = new Date(date - offset).toISOString().slice(0, 10);
  return krDate;
};

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getKrDate(new Date()));
  const navigate = useNavigate();
  const { onCreate, onEdit } = useContext(DispatchContext);

  const handleSubmit = () => {
    if (content.length < 5) {
      alert("일기는 5자 이상 써주세요!");
      contentRef.current.focus();
      return;
    }
    isEdit
      ? onEdit(originData.id, date, content, emotion)
      : onCreate(date, content, emotion);

    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getKrDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headtext={isEdit ? "일기 수정하기" : "새로운 일기 쓰기"}
        leftchild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />

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
      <section>
        <div className="input_box emotion_list">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.emotion_id}
              {...it}
              onClick={(emotion) => setEmotion(emotion)}
              isSelected={it.emotion_id === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <div className="input_box text">
          <h4>오늘의 일기</h4>
          <textarea
            placeholder="오늘 하루 어땠나요?"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </section>
      <section>
        <div className="control_box">
          <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
          <MyButton
            type="positive"
            text={"저장하기"}
            onClick={() => handleSubmit()}
          />
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
