type Props = {
  id: string;
  text: string;
  onClick: () => void;
};
export default function Button(props: Props) {
  return (
    <>
      <div className="buttonContainer" id={`buttonContainer-${props.id}`}>
        <p
          className="buttonText"
          id={`buttonText-${props.id}`}
          onClick={props.onClick}
        >
          {props.text}
        </p>
      </div>
    </>
  );
}
