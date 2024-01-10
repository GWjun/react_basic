import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    if (originData) {
      const titleElement = document.getElementsByTagName("title")[0];
      titleElement.innerHTML = `나만의 일기장 - ${new Date(
        parseInt(originData.date)
      ).toLocaleDateString()} 일기`;
    }
  }, [originData]);

  return (
    <div>
      <h1>
        {originData && <DiaryEditor isEdit={true} originData={originData} />}
      </h1>
    </div>
  );
};

export default Edit;
