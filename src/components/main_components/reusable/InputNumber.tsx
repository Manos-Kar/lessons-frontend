type Props = {
  id: string;
  label: string;
  value: number;
  property: string;
  suffix?: string;
  onChange: (property: any, value: string) => void;
};
export default function InputNumber(props: Props) {
  return (
    <>
      <div className="inputContainer" id={`inputContainer-${props.id}`}>
        <div className="inputLabel" id={`inputLabel-${props.id}`}>
          {props.label}
        </div>
        <div className="inputField" id={`inputField-${props.id}`}>
          <input
            type="number"
            min={0}
            step={0.5}
            className="inputText"
            id={`inputText-${props.id}`}
            value={props.value}
            onChange={(e: any) => {
              const value =
                e.target.value !== 0 ? e.target.value.replace(/^0+/, "") : 0;
              return props.onChange(props.property, value);
            }}
          />
          {props.suffix && (
            <div className="inputSuffix" id={`inputSuffix-${props.id}`}>
              {props.suffix}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
