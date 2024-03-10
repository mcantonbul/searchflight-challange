import { useContext, useEffect, useLayoutEffect, useMemo } from "react";

/** React-Router-Dom */
import { useNavigate, useSearchParams } from "react-router-dom";

/** Components */
import Layout from "@/components/Layout/Layout";
import PromotionCode from "@/components/PromotionCode/PromotionCode";
import TicketGrid from "./components/TicketGrid/TicketGrid";

/** Contexts */
import { ThemaContext } from "@/contexts/ThemaContext/ThemaContext";
import { FlightContext } from "@/contexts/FlightContext/FlightContext";

/** Helpers */
import { getFareCategoryFieldName } from "@/utils/Helpers/Helpers";

/** Enums */
import { CabinEnum } from "@/enums/CabinEnum";
import { StatusEnum } from "@/enums/StatusEnum";

/** Models */
import { ResultModel } from "@/models";

/** Local Thema */
import FlightListingThema from "./FlightListingThema";

/** Styles */
import s from "./FlightListing.module.scss";

const FlightListing = () => {
  const { changeThema } = useContext(ThemaContext);
  const {
    airports,
    flights,
    setPromotionOpt,
    selectedPackage,
    selectedFlight,
    clearContext,
  } = useContext(FlightContext);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleOnChangePromotionCode = (checked: boolean) => {
    if(checked) {
      setPromotionOpt({
        unavailableBrands: ["extraFly", "primeFly"],
        discounts: [{ brandCode: "ecoFly", discountRate: 50 }],
      });
    } else {
      setPromotionOpt({
        unavailableBrands: [],
        discounts: [],
      });
    }
  };

  const originAirportCode = searchParams.get("ori");
  const originAirport = airports?.find(
    (airport) => airport.code === originAirportCode
  );

  const destinationAirportCode = searchParams.get("des");
  const destinationAirport = airports?.find(
    (airport) => airport.code === destinationAirportCode
  );

  const cabin = searchParams.get("cab") || CabinEnum.Economy;
  const passenger = searchParams.get("pas");

  const filteredFlights =
    useMemo(() => {
      return flights?.flights.filter(
        (flight) =>
          flight.fareCategories[getFareCategoryFieldName(+cabin)] &&
          flight.originAirport.code === originAirportCode &&
          flight.destinationAirport.code === destinationAirportCode
      );
    }, [flights, searchParams]) || [];

    useEffect(() => {
      if (selectedPackage && selectedFlight && flights) {
        const findedFlight = flights.flights[selectedFlight.index].fareCategories[
          getFareCategoryFieldName(selectedFlight.cabin)
        ].subcategories.find((s) => s.brandCode === selectedPackage.brandCode);
  
        if(findedFlight) {
          const result: ResultModel = {
            success: findedFlight.status === StatusEnum.Available,
            price: {
              amount: findedFlight.price.amount * 5,
              currency: findedFlight.price.currency
            }
          };
          localStorage.setItem('result', JSON.stringify(result));
          clearContext();
          navigate({pathname: '/result'})
        }
      }
    }, [selectedPackage]);

  useLayoutEffect(() => {
    changeThema(FlightListingThema);
  }, []);

  return (
    <Layout>
      <div className={s.container}>
        <div className={s.fly}>Uçuş</div>
        <div className={s.cityInfo}>
          {originAirport?.city.name} - {destinationAirport?.city.name},{" "}
          {passenger} Yolcu
        </div>
        <PromotionCode
          onChange={handleOnChangePromotionCode}
          className={s.promotionCode}
        />
        <TicketGrid flights={filteredFlights} />
      </div>
    </Layout>
  );
};

export default FlightListing;
