import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={["emotion_img", `emotion_img_${emotion}`].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt=""
        />
      </div>
      <div onClick={goDetail} className="info">
        <div className="diary_date">
          {new Date(parseInt(date)).toLocaleDateString()}
        </div>
        <div className="diary_content">{content.slice(0, 130)}</div>
      </div>
      <div onClick={goEdit} className="btn">
        <MyButton text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
