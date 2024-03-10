/* eslint-disable @typescript-eslint/no-explicit-any */
/** FontAwesome */
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Models */
import { Price } from "@/models";

/** Styles */
import s from "./FlightSelectionBox.module.scss";

interface FlightSelectionBoxProps {
  price: Price;
  checked: boolean;
  open?: boolean;
  cabin: string;
  onChangeCabin: () => void;
  onClickOpen: (open: boolean) => void;
}

const FlightSelectionBox = ({
  cabin,
  price,
  checked,
  open,
  onChangeCabin,
  onClickOpen
}: FlightSelectionBoxProps) => {
  return (
    <div className={s.container}>
      <div>
        <label className={s.radio}>
          <input type="radio" checked={checked} onChange={onChangeCabin} />
          {cabin}
        </label>
      </div>
      <div className={s.price}>
        Yolcu Başına
        <div className={s.amount}>
          <b>
            {price.currency} {price.amount}{" "}
          </b>
        </div>
      </div>
      <FontAwesomeIcon
        className={s.arrow}
        onClick={() => onClickOpen(!open)}
        icon={open ? faChevronUp : faChevronDown}
      />
    </div>
  );
};

export default FlightSelectionBox;
