/** Models */
import { Price } from "@/models";

/** Styles */
import s from "./FlightPackage.module.scss";

interface FlightPackageProps {
  title: string;
  price: Price;
  rights: string[];
  disabled: boolean;
  onClickPackage: () => void;
}

const FlightPackage = ({
  price,
  rights,
  title,
  disabled = false,
  onClickPackage
}: FlightPackageProps) => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.title}>{title}</div>
        <div className={s.price}>
          <div className={s.currency}>{price.currency}</div>
          <div className={s.amount}>{price.amount}</div>
        </div>
      </div>
      <ul>
        {rights.map((right) => (
          <li>{right}</li>
        ))}
      </ul>
      <button className={`${disabled ? s.disabled : ''} ${s.button}`} onClick={onClickPackage}>
        Uçuşu Seç
      </button>
    </div>
  );
};

export default FlightPackage;
