/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useContext } from "react";

/** Models */
import { Flight, Price } from "@/models";

/** Components */
import FlightInfo from "@/components/FlightInfo/FlightInfo";
import FlightSelectionBox from "../FlightSelectionBox/FlightSelectionBox";
import FlightPackages from "../FlightPackages/FlightPackages";

/** Helpers */
import {
  getCabinEnumValue,
  getFareCategoryFieldName,
} from "@/utils/Helpers/Helpers";

/** Enums */
import { CabinEnum } from "@/enums/CabinEnum";

/** Context */
import { FlightContext } from "@/contexts/FlightContext/FlightContext";

/** Styles */
import s from "./GridBody.module.scss";

interface GridBodyProps {
  flights: Flight[];
}

const GridBody = ({ flights }: GridBodyProps) => {
  const { promotionOpt, selectedFlight, setSelectedFlight } =
    useContext(FlightContext);

  const handleOnChangeCabin = (flightIndex: number, cabin: CabinEnum) => {
    setSelectedFlight({ index: flightIndex, cabin });
    setSelectedFlight({
      cabin,
      index: flightIndex,
      open: true,
    });
  };

  const fareCategoriesSortFn = (a: [string, string], b: [string, string]) => {
    return b[0].localeCompare(a[0]);
  };

  const getManipulatedEcoFlyPrice = (price: Price): Price => {
    if (promotionOpt.discounts.length > 0) {
      const discountValue = promotionOpt.discounts.find(
        (s) => s.brandCode === "ecoFly"
      );

      if (discountValue) {
        const discountedPrice =
          (price.amount * discountValue.discountRate) / 100;
        return {
          currency: price.currency,
          amount: discountedPrice,
        };
      }
    }
    return price;
  };

  const getCabinContent = (
    flight: Flight,
    cabinFieldName: "BUSINESS" | "ECONOMY",
    categoryIndex: number,
    flightIndex: number
  ) => {
    const cabin = getCabinEnumValue(cabinFieldName);
    const cabinName = cabin === CabinEnum.Business ? "BUSINESS" : "ECONOMY";

    const ecoFlyPrice = flight.fareCategories[
      cabinFieldName
    ].subcategories.find((s) => s.brandCode === "ecoFly");

    return (
      <FlightSelectionBox
        cabin={cabinName}
        price={getManipulatedEcoFlyPrice(ecoFlyPrice?.price!)}
        checked={
          selectedFlight?.index === flightIndex &&
          selectedFlight.cabin === cabin
        }
        onChangeCabin={() => handleOnChangeCabin(flightIndex, cabin)}
        onClickOpen={(open: boolean) => {
          setSelectedFlight({
            cabin,
            index: flightIndex,
            open,
          });
        }}
        open={
          selectedFlight?.index === flightIndex &&
          selectedFlight.cabin === cabin &&
          selectedFlight.open
        }
        key={categoryIndex}
      />
    );
  };

  const getFlightCategoryContent = (flight: Flight) => {
    const subcategoires =
      flight.fareCategories[getFareCategoryFieldName(selectedFlight?.cabin!)]
        .subcategories;
    
    const fareCategoriesCount = Object.entries(flight.fareCategories).length;    
    const rightPx = fareCategoriesCount > 1 ? selectedFlight?.cabin === CabinEnum.Business ? '0' : '290px' : '0';

    return <FlightPackages subcategories={subcategoires} right={rightPx} />;
  };

  return (
    <div className={s.container}>
      {flights.map((flight, index) => (
        <div className={s.flight} key={index}>
          <FlightInfo
            arrivalDateTimeDisplay={flight.arrivalDateTimeDisplay}
            departureDateTimeDisplay={flight.arrivalDateTimeDisplay}
            destinationAirport={flight.destinationAirport}
            flightDuration={flight.flightDuration}
            originAirport={flight.originAirport}
            className={s.flightInfo}
          />

          {Object.entries(flight.fareCategories)
            .sort(fareCategoriesSortFn)
            .map(([cabinFieldName], fareCategoryIndex) =>
              getCabinContent(
                flight,
                cabinFieldName as "BUSINESS" | "ECONOMY",
                fareCategoryIndex,
                index
              )
            )}

          {selectedFlight?.open && selectedFlight.index === index && getFlightCategoryContent(flight)}
        </div>
      ))}
    </div>
  );
};

export default GridBody;
