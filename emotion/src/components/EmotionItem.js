const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
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

export default EmotionItem;
