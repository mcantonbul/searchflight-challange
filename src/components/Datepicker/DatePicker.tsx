import { useRef } from "react";

/** FontAwesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

/** Styles */
import s from "./DatePicker.module.scss";

const DatePicker = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.showPicker?.();
  };

  return (
    <div className={s.container} onClick={handleClick}>
      <div className={s.text}>Tarih</div>{" "}
      <FontAwesomeIcon
        className={s.calendarIcon}
        icon={faCalendarAlt}
        size="2x"
      />
      <input ref={inputRef} className={s.input} type="date"></input>
    </div>
  );
};

export default DatePicker;
