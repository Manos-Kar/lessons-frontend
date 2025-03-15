type Props = {
  id: string;
  menuHeader: string;
  onClickX: () => void;
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
        </div>
      </div>
    </>
  );
}
