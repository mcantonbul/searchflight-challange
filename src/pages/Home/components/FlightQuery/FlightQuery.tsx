/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useContext, useReducer, useRef, useState } from 'react';

/** FontAwesome */
import { faChevronRight,faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Context */
import { FlightContext } from '@/contexts/FlightContext/FlightContext';

/** Components */
import CabinAndPassenger from "@/components/CabinAndPassenger/CabinAndPassenger";
import DatePicker from "@/components/Datepicker/DatePicker";
import PortSelectInput from "@/components/PortSelectInput/PortSelectInput";

/** Enums */
import { CabinEnum } from '@/enums/CabinEnum';

/** Models */
import { FlightFormValues, PassengerReducerActionType } from '@/models';

/** Styles */
import s from "./FlightQuery.module.scss";

const passengerReducer = (
  state: number,
  action: { type: PassengerReducerActionType }
) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1 >= 1 ? state - 1 : 1;
    default:
      return state;
  }
};

interface FlightQueryProps {
  onSubmit: (values: FlightFormValues) => void
}

const FlightQuery = ({ onSubmit }: FlightQueryProps) => {
  const departureSelectRef = useRef<any>(null);
  const arrivalSelectRef = useRef<any>(null);

  const { airports } = useContext(FlightContext);

  // Todo: Should be managment in Form
  const [cabin, setCabin] = useState(CabinEnum.Economy);
  const [passenger, dispatch] = useReducer(passengerReducer, 1);

  const handleCabinChange = (cabin: CabinEnum) => {
    setCabin(cabin);
  };

  const handlePassengerChange = (type: PassengerReducerActionType) => {
    dispatch({ type });
  };

  const getSelectValue = (ref: MutableRefObject<any>) => {
    const value = ref?.current?.getValue();
    return value.length > 0 ? value[0].value : null;
  };

  const onClickSubmit = () => {
    onSubmit?.({
      cabin,
      passenger,
      originAirportCode: getSelectValue(departureSelectRef),
      destinationAirportCode: getSelectValue(arrivalSelectRef),
    });
  };

  return (
    <div className={s.container}>
      <PortSelectInput
        ref={departureSelectRef}
        icon={faPlaneDeparture}
        placeholder="Nereden"
        options={airports}
      />
      <PortSelectInput
        ref={arrivalSelectRef}
        icon={faPlaneArrival}
        placeholder="Nereye"
        options={airports}
      />
      <DatePicker />
      <CabinAndPassenger
        cabin={cabin}
        passenger={passenger}
        onCabinChange={handleCabinChange}
        onPassengerChange={handlePassengerChange}
      />
      <button
        className={s.submitButton}
        title="Uçuş ara"
        onClick={onClickSubmit}
      >
        <FontAwesomeIcon icon={faChevronRight} size="2x" />
      </button>
    </div>
  );
};

export default FlightQuery;
