/** Models */
import { Airport } from "@/models";

/** Styles */

import s from './PortInfo.module.scss';

interface PortInfoProps {
  airport: Airport
  timeDisplay: string
  align?: 'end' | 'start'
}

const PortInfo = ({ airport, timeDisplay, align = "start" }: PortInfoProps) => {
  return (
    <div className={s.container} style={{alignItems: align}}>
      <div className={s.time}>{timeDisplay}</div>
      <div className={s.code}>{airport.code}</div>
      <div className={s.city}>{airport.city.name}</div>
    </div>
  );
};

export default PortInfo;
