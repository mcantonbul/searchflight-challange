/* eslint-disable no-case-declarations */
import { useMemo, useState } from "react";

/** Enums */
import { SortTypeEnum } from "@/enums/GridEnums";

/** Models */
import { Flight } from "@/models";

/** Components */
import GridHeader from "../GridHeader/GridHeader";
import GridBody from "../GridBody/GridBody";

/** Styles */
import s from "./TicketGrid.module.scss";

interface TicketGridProps {
  flights: Flight[];
}

const TicketGrid = ({ flights }: TicketGridProps) => {
  const [sortType, setSortType] = useState(SortTypeEnum.Price);

  const handleOnSortChange = (sortType: SortTypeEnum) => {
    setSortType(sortType);
  };

  const sortedFlights = useMemo(() => {
    return flights.sort((a, b) => {
      switch (sortType) {
        case SortTypeEnum.Time:
          const aTime = a.arrivalDateTimeDisplay.split(':');
          const bTime = b.arrivalDateTimeDisplay.split(':');

          if (aTime[0] === bTime[0]) {
            return Number(aTime[1]) - Number(bTime[1]);
          } else {
            return Number(aTime[0]) - Number(bTime[0]);
          }
        case SortTypeEnum.Price:
        default:
          const aEcoFly = a.fareCategories.ECONOMY.subcategories.find(
            (s) => s.brandCode === "ecoFly"
          );
          const bEcoFly = b.fareCategories.ECONOMY.subcategories.find(
            (s) => s.brandCode === "ecoFly"
          );

          if (aEcoFly && bEcoFly) {
            return aEcoFly.price.amount - bEcoFly.price.amount;
          }
          break;
      }
      return 1;
    });
  }, [sortType, flights]);

  return (
    <div className={s.container}>
      <GridHeader onSortChange={handleOnSortChange} />
      <GridBody flights={sortedFlights}  />
    </div>
  );
};

export default TicketGrid;
