import { useContext } from "react";

/** Enums */
import { SortTypeEnum } from "@/enums/GridEnums";

/** Context */
import { FlightContext } from "@/contexts/FlightContext/FlightContext";

/** Components */
import GridHeader from "../GridHeader/GridHeader";
import GridBody from "../GridBody/GridBody";

/** Styles */
import s from "./TicketGrid.module.scss";

const TicketGrid = () => {
  const { setSortType } = useContext(FlightContext);

  const handleOnSortChange = (sortType: SortTypeEnum) => {
    setSortType(sortType);
  };

  return (
    <div className={s.container}>
      <GridHeader onSortChange={handleOnSortChange} />
      <GridBody />
    </div>
  );
};

export default TicketGrid;
