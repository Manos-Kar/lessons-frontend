import { useEffect, useState } from "react";
import { COLORPALLETE } from "../../../services/constants";

type Props = {
  label: string;
  color: string;
  setColor: (color: string) => void;
};

export const ColorPicker = (props: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const colorPickerContainerId = `colorPickerContainer-${props.label}`;
  const colorPickerId = `colorPicker-${props.label}`;
  const colorSelectDropdownId = `colorSelectDropdown-${props.label}`;
  const colorSelectedId = `colorSelected-${props.label}`;
  const colorSelectId = `colorSelect-${props.label}`;
  const dropdownId = `dropdown-${props.label}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.id.includes(`${colorPickerContainerId}`) &&
        !target.id.includes(`${colorPickerId}`) &&
        !target.id.includes(`${colorSelectDropdownId}`) &&
        !target.id.includes(`${colorSelectedId}`) &&
        !target.id.includes(`${colorSelectId}`) &&
        !target.id.includes(`${dropdownId}`)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
    // eslint-disable-next-line
  }, []);

  return (
    <div id={colorPickerContainerId} className="colorPickerContainer">
      <label
        id={`${colorPickerContainerId}-label`}
        className="colorPickerLabel"
      >
        {props.label}
      </label>

      <div
        id={colorPickerId}
        className="colorPicker"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div
          id={colorSelectedId}
          className="colorSelected"
          style={{ backgroundColor: props.color }}
        >
          &nbsp;
        </div>
        <div id={colorSelectId} className="colorSelect">
          <div id={colorSelectDropdownId} className="colorSelectDropdown">
            ▼
            <div id={dropdownId} className="dropdown">
              {showDropdown &&
                COLORPALLETE.map((c) => (
                  <div
                    key={c}
                    id={`${colorPickerId}-${c}`}
                    className="dropdown-option"
                    style={{ backgroundColor: c }}
                    onClick={() => {
                      props.setColor(c);
                      setShowDropdown(false);
                    }}
                  >
                    &nbsp;
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
