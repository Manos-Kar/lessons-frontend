type Props = {
  setStudentMenuOn: (value: boolean) => void;
  type: "edit" | "add";
};
export default function StudentMenu(props: Props) {
  return (
    <>
      <div className="studentMenuContainer" id={"studentMenuContainer"}>
        <div className="studentMenuClose" id={"studentMenuClose"}>
          <div className="closePopUp">X</div>
        </div>
        <div className="studentMenu" id={"studentMenu"}>
          <div className="studentMenuHeader" id={"studentMenuHeader"}>
            {props.type === "edit" ? "Edit Student" : "Add Student"}
          </div>
          <div className="studentMenuInputs" id={"studentMenuInputs"}>
            <div className="studentMenuInput" id={"studentMenuInputName"}>
              <div
                className="studentMenuInputLabel"
                id={"studentMenuInputLabelName"}
              >
                Name:
              </div>
              <div
                className="studentMenuInputField"
                id={"studentMenuInputFieldName"}
              >
                <input
                  type="text"
                  className="studentMenuInput"
                  id={"studentMenuInputName"}
                />
              </div>
            </div>
            <div className="studentMenuInput" id={"studentMenuInputAddress"}>
              <div
                className="studentMenuInputLabel"
                id={"studentMenuInputLabelAddress"}
              >
                Address:
              </div>
              <div
                className="studentMenuInputField"
                id={"studentMenuInputFieldAddress"}
              >
                <input
                  type="text"
                  className="studentMenuInput"
                  id={"studentMenuInputAddress"}
                />
              </div>
            </div>
          </div>
          <div className="studentMenuButtonContainer">
            <div
              className="studentMenuButton"
              onClick={() => {
                props.setStudentMenuOn(false);
              }}
            >
              Save Student
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
