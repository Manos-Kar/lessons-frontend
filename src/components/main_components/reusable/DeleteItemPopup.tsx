import Button from "./Button";

type Props = {
  onClose: () => void;
  onDelete: () => void;
  itemForDeletion: string;
  type: "student" | "lesson" | "lesson-mini";
};
export default function DeleteItemPopup(props: Props) {
  const deleteItemQuestion = `Are you sure you want to delete ${
    props.type === "student" ? "the student" : "the lesson"
  } ${props.itemForDeletion}?`;
  return (
    <>
      <div
        className={`deleteItemContainer ${props.type}`}
        id={`deleteItemContainer-${props.type}`}
      >
        <p className={`deleteItemQuestion ${props.type}`}>
          {deleteItemQuestion}
        </p>
        <div className={`deleteItemButtonsContainer ${props.type}`}>
          <Button
            id="deleteItemButtonDelete"
            text="Delete"
            onClick={props.onDelete}
          />
          <Button
            id="deleteItemButtonCancel"
            text="Cancel"
            onClick={props.onClose}
          />
        </div>
      </div>
    </>
  );
}
