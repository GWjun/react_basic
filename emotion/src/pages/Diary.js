import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { StateContext } from "../App";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const diaryList = useContext(StateContext);
  const [originData, setOriginData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList, navigate]);

  if (!originData) {
    return <div className="DiaryPage">로딩중입니다만....</div>;
  } else {
    const curEmotion = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(originData.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headtext={new Date(originData.date).toLocaleDateString() + " 기록"}
          leftchild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightchild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={["diary_img", `img_${originData.emotion}`].join(" ")}
            >
              <img src={curEmotion.emotion_img} alt="" />
              <div className="emotion_descript">
                {curEmotion.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content">
              <p>{originData.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
