import React from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick, // useState의 함수나 useCallback 함수가 아니라면 memo 적용 X
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={["EmotionItem", isSelected ? `on_${emotion_id}` : `off`].join(
        " "
      )}
    >
      <img src={emotion_img} alt="" />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
