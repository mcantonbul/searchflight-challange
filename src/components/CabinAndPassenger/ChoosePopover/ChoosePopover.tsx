/* eslint-disable @typescript-eslint/no-explicit-any */

/** OutsideClickHandler */
import OutsideClickHandler from 'react-outside-click-handler';

/** Enums */
import { CabinEnum } from "@/enums/CabinEnum";

/** Models */
import { PassengerReducerActionType } from "@/models";

/** Styles */
import s from "./ChoosePopover.module.scss";

interface ChoosePopoverProps {
  cabin: CabinEnum;
  passenger: number;
  onCabinChange: (cabin: CabinEnum) => void;
  onPassengerChange: (type: PassengerReducerActionType) => void;
  onClose: () => void;
}

const ChoosePopover = ({
  cabin,
  passenger,
  onCabinChange,
  onPassengerChange,
  onClose
}: ChoosePopoverProps) => {
  const handleCabinChange = (event: any) => {
    onCabinChange(event.target.value);
  };

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div className={s.container} onClick={(e) => e.stopPropagation()}>
        <div className={s.title}>Kabin ve yolcu seçimi</div>
        <div className={s.cables}>
          <label className={s.radio}>
            <input
              type="radio"
              name="class"
              value={CabinEnum.Economy}
              checked={+cabin === CabinEnum.Economy}
              onChange={handleCabinChange}
            />{" "}
            Economy class
          </label>
          <label className={s.radio}>
            <input
              type="radio"
              name="class"
              value={CabinEnum.Business}
              checked={+cabin === CabinEnum.Business}
              onChange={handleCabinChange}
            />{" "}
            Business class
          </label>
        </div>

        <div className={s.passengerContainer}>
          <div>Yolcu</div>
          <div className={s.buttons}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPassengerChange("DECREMENT");
              }}
            >
              -
            </button>
            <div>{passenger}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPassengerChange("INCREMENT");
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default ChoosePopover;
