type Props = {
  id: string;
  label: string;
  value: string;
  property: string;
  onChange: (property: any, value: string) => void;
};
export default function InputText(props: Props) {
  return (
    <>
      <div className="inputContainer" id={`inputContainer-${props.id}`}>
        <div className="inputLabel" id={`inputLabel-${props.id}`}>
          {props.label}
        </div>
        <div className="inputField" id={`inputField-${props.id}`}>
          <input
            type="text"
            className="inputText"
            id={`inputText-${props.id}`}
            value={props.value}
            onChange={(e: any) =>
              props.onChange(props.property, e.target.value)
            }
          />
        </div>
      </div>
    </>
  );
}
