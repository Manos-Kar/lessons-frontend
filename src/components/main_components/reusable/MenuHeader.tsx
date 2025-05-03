import bin from "../../../resources/images/bin.svg";

type Props = {
  id: string;
  menuHeader: string;
  onClickX: () => void;
  onDelete: () => void;
  type: "add" | string | undefined;
};
export default function MenuHeader(props: Props) {
  return (
    <>
      <div
        className="menuHeaderContainer"
        id={`menuHeaderContainer-${props.id}`}
      >
        <div
          className="menuHeaderContainerClose"
          id={`menuHeaderContainerClose-${props.id}`}
        >
          <div
            className="closePopUp"
            id={`closePopUp-${props.id}`}
            onClick={props.onClickX}
          >
            X
          </div>
        </div>
        <div
          className="menuHeaderTitleContainer"
          id={`menuHeaderTitleContainer-${props.id}`}
        >
          <p className="menuHeaderTitle" id={`menuHeaderTitle-${props.id}`}>
            {props.menuHeader}
          </p>
          {props.type !== "add" && (
            <img
              className="menuHeaderBin"
              id={`menuHeaderBin-${props.id}`}
              src={bin}
              alt="bin"
              onClick={props.onDelete}
            />
          )}
        </div>
      </div>
    </>
  );
}
