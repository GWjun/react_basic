import React, { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ id, author, content, created_date, emotion }) => {
  const { onDelete, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleDelete = () => {
    if (window.confirm(`${id + 1}번째 일기를 정말 삭제하시겠습니까?`))
      onDelete(id);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          너의 이름은 : {author} | 기부니 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            ref={localContentInput}
            onChange={(event) => {
              setLocalContent(event.target.value);
            }}
          >
            {localContent}
          </textarea>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button
            onClick={() => {
              toggleIsEdit();
              setLocalContent(content);
            }}
          >
            수정취소
          </button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleDelete}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
