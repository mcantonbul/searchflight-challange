import { useState } from "react";

/** FontAwesome */
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Enums */
import { CabinEnum } from "@/enums/CabinEnum";

/** Models */
import { PassengerReducerActionType } from "@/models";

/** Components */
import ChoosePopover from "./ChoosePopover/ChoosePopover";

/** Styles */
import s from "./CabinAndPassenger.module.scss";

interface CabinAndPassengerProps {
  cabin: CabinEnum;
  passenger: number;
  onCabinChange: (cabin: CabinEnum) => void;
  onPassengerChange: (type: PassengerReducerActionType) => void;
}

const CabinAndPassenger = ({
  cabin,
  passenger,
  onCabinChange,
  onPassengerChange,
}: CabinAndPassengerProps) => {
  const [showChoosePopover, setShowChoosePopover] = useState(false);

  const handleOnClick = () => {
    setShowChoosePopover(!showChoosePopover);
  };

  const getPassengetContent = () => {
    if(passenger <= 3) {
      return [...Array(passenger)].map((s) => (
        <FontAwesomeIcon icon={faUser} key={s}/>
      ));
    }

    const icons = [...Array(2)].map((s) => (
      <FontAwesomeIcon icon={faUser} key={s} />
    ));
    icons.push(<FontAwesomeIcon icon={faUserPlus} key={3}/>);

    return icons;
  };

  const onClosePopover = () => {
    setShowChoosePopover(false);
  };

  return (
    <div className={s.container} onClick={handleOnClick}>
      <div className={s.passengerCount}>
      {getPassengetContent()}
      <div className={s.count}>{passenger}</div>
      </div>
      {showChoosePopover && (
        <ChoosePopover
          cabin={cabin}
          passenger={passenger}
          onCabinChange={onCabinChange}
          onPassengerChange={onPassengerChange}
          onClose={onClosePopover}
        />
      )}
    </div>
  );
};

export default CabinAndPassenger;
