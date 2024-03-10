/** Enums */
import { SortTypeEnum } from "@/enums/GridEnums";

/** Styles */
import s from "./GridHeader.module.scss";

interface GridHeaderProps {
  onSortChange: (sort: SortTypeEnum) => void;
}

const GridHeader = ({ onSortChange }: GridHeaderProps) => {
  const onSortClick = (sortType: SortTypeEnum) => {
    onSortChange?.(sortType);
  };

  return (
    <div className={s.container}>
      <div>Sıralama Kriteri</div>
      <div className={s.sortOptions}>
        <div onClick={() => onSortClick(SortTypeEnum.Price)}>
          Ekonomi Ücreti
        </div>
        <div onClick={() => onSortClick(SortTypeEnum.Time)}>Kalkış Saati</div>
      </div>
    </div>
  );
};

export default GridHeader;
