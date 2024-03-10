import { useEffect, useState } from "react";

/** React-Switch */
import Switch from "react-switch";

/** Styles */
import s from "./PromotionCode.module.scss";

interface PromotionCodeProps {
    className?: string
    onChange: (checked: boolean) => void;
}

const PromotionCode = ({ className, onChange }: PromotionCodeProps) => {
  const [checked, setChecked] = useState(false);

  const handleOnChange = (checked: boolean) => {
    setChecked(checked);
  };

  useEffect(() => {
    onChange(checked);
  }, [checked]);

  return (
    <div className={`${className || ""} ${s.container}`}>
      <div className={s.toggleArea}>
        <b>Promosyon Kodu</b>
        <Switch
          onChange={handleOnChange}
          checked={checked}
          onColor="#2096f0"
          checkedIcon={false}
          uncheckedIcon={false}
        />
      </div>
      {checked && (
        <>
          <p>
            Promosyon kodu seçeneği ile tüm Economy kabini Eco Fly paketlerini
            %50 indirimle satın alabilirsiniz!
          </p>
          <p>
            Promosyon kodu seçeneği aktifken Eco Fly paketi haricinde seçim
            yapılamamaktadır.
          </p>
        </>
      )}
    </div>
  );
};

export default PromotionCode;
