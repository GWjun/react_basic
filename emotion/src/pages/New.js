import DiaryEditor from "../components/DiaryEditor";
import { useEffect } from "react";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `새로운 일기장 만들기`;
  }, []);
  return (
    <>
      <DiaryEditor />
    </>
  );
};

export default New;
