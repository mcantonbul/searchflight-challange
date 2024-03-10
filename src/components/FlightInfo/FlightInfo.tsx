/** Styles */
import { Airport } from "@/models";
import s from "./FlightInfo.module.scss";
import PortInfo from "./PortInfo/PortInfo";

interface FlightInfoProps {
  originAirport: Airport;
  destinationAirport: Airport;
  arrivalDateTimeDisplay: string;
  departureDateTimeDisplay: string;
  flightDuration: string;
  className: string;
}

const FlightInfo = ({
  arrivalDateTimeDisplay,
  departureDateTimeDisplay,
  destinationAirport,
  flightDuration,
  originAirport,
  className
}: FlightInfoProps) => {
  return (
    <div className={`${s.container} ${className || ''}`}>
      <PortInfo
        airport={originAirport}
        timeDisplay={departureDateTimeDisplay}
      />
      <div className={s.seperator}></div>
      <PortInfo
        airport={destinationAirport}
        timeDisplay={arrivalDateTimeDisplay}
        align="end"
      />
      <div className={s.duration}>
        Uçuş Süresi
        <div>{flightDuration}</div>
      </div>
    </div>
  );
};

export default FlightInfo;
