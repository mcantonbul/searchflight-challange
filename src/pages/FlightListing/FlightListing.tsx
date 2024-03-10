import { useContext, useEffect } from "react";

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
import { getFareCategoryFieldName, getSearchParamValues } from "@/utils/Helpers/Helpers";

/** Enums */
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
    setPromotionOpt,
    selectedPackage,
    selectedFlight,
    clearContext,
    setSearchParams,
    sortedFlights
  } = useContext(FlightContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleOnChangePromotionCode = (checked: boolean) => {
    if (checked) {
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

  const { destinationAirportCode, originAirportCode, passenger, cabin } =
    getSearchParamValues(searchParams);

  const destinationAirport = airports?.find(
    (airport) => airport.code === destinationAirportCode
  );
  const originAirport = airports?.find(
    (airport) => airport.code === originAirportCode
  );

  useEffect(() => {
    if (selectedPackage && selectedFlight && sortedFlights) {
      const findedFlight = sortedFlights[selectedFlight.index].fareCategories[
        getFareCategoryFieldName(selectedFlight.cabin)
      ].subcategories.find((s) => s.brandCode === selectedPackage.brandCode);

      if (findedFlight) {
        const result: ResultModel = {
          success: findedFlight.status === StatusEnum.Available,
          price: {
            amount: findedFlight.price.amount * 5,
            currency: findedFlight.price.currency,
          },
        };
        localStorage.setItem("result", JSON.stringify(result));
        clearContext();
        navigate({ pathname: "/result" });
      }
    }
  }, [selectedPackage]);

  useEffect(()=>{
    changeThema(FlightListingThema);
    if (destinationAirportCode && originAirportCode && cabin)
      setSearchParams({ destinationAirportCode, originAirportCode, cabin });
  },[])

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
        <TicketGrid />
      </div>
    </Layout>
  );
};

export default FlightListing;
