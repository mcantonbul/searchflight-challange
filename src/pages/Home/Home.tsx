import { useContext, useEffect } from "react";

/** React-Router-Dom */
import { useNavigate } from "react-router-dom";

/** React-Toastify */
import { toast } from "react-toastify";

/** Contexts */
import { ThemaContext } from "@/contexts/ThemaContext/ThemaContext";
import { FlightContext } from "@/contexts/FlightContext/FlightContext";

/** Models */
import { Flight, FlightFormValues } from "@/models";

/** Utils */
import { getFareCategoryFieldName } from "@/utils/Helpers/Helpers";

/** Components */
import Layout from "@/components/Layout/Layout";
import FlightQuery from "./components/FlightQuery/FlightQuery";

/** Styles */
import s from "./Home.module.scss";

const Home = () => {
  const { changeThema } = useContext(ThemaContext);
  const { flights } = useContext(FlightContext);

  const navigate = useNavigate();

  const formValidations = (values: FlightFormValues) => {
    if (!values.originAirportCode) {
      return {
        isValid: false,
        message: "Lütfen kalkış uçuş noktasını seçiniz.",
      };
    }
    if (!values.destinationAirportCode) {
      return {
        isValid: false,
        message: "Lütfen varış uçuş noktasını seçiniz.",
      };
    }
    return { isValid: true, message: "" };
  };

  const handleOnSubmit = (values: FlightFormValues) => {
    const { isValid, message } = formValidations(values);
    toast.dismiss();
    if (!isValid) {
      toast.error(message);
      return;
    }
    if (flights) {
      const findedFlight = flights.flights.find(
        (flight: Flight) =>
          flight.fareCategories[getFareCategoryFieldName(+values.cabin)] &&
          flight.originAirport.code === values.originAirportCode &&
          flight.destinationAirport.code === values.destinationAirportCode
      );

      if (findedFlight) {
        navigate({
          pathname: "/flight-listing",
          search: `?ori=${values.originAirportCode}&des=${values.destinationAirportCode}&cab=${values.cabin}&pas=${values.passenger}`,
        });
      } else {
        toast.error("Uçuş bulunamadı");
      }
    }
  };

  useEffect(() => {
    changeThema();
  }, []);

  return (
    <Layout>
      <div className={s.container}>
        <div className={s.title}>
          <h2>Merhaba</h2>
          <h3>Nereyi keşfetmek istersiniz?</h3>
        </div>
        <FlightQuery onSubmit={handleOnSubmit} />
      </div>
    </Layout>
  );
};

export default Home;
