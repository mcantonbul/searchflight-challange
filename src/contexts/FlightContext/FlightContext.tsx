import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

/** Services */
import FlightService from "@/services/FlightService/FlightService";

/** Models */
import { Airport, Flights, PromotionOptions, SelectedPackage, SelectedFlight } from "@/models";

/** Utils */
import { saveToLocalStorage } from "@/utils/Helpers/Helpers";

interface IFlightContext {
  airports?: Array<Airport>;
  flights?: Flights;
  promotionOpt: PromotionOptions;
  setPromotionOpt: Dispatch<SetStateAction<PromotionOptions>>;
  setSelectedPackage:  Dispatch<SetStateAction<SelectedPackage | undefined>>;
  selectedPackage?: SelectedPackage;
  selectedFlight?: SelectedFlight;
  setSelectedFlight:  Dispatch<SetStateAction<SelectedFlight | undefined>>;
  clearContext: ()=> void;
}

export const FlightContext = createContext<IFlightContext>({
  airports: [],
  flights: undefined,
  promotionOpt: {
    discounts: [],
    unavailableBrands: []
  },
  setPromotionOpt: () => {},
  setSelectedPackage: () => {},
  setSelectedFlight: () => {},
  clearContext: ()=> {}
});

interface FlightContextProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_FLIGHTS_KEY = "flights";

const FlightContextProvider = ({ children }: FlightContextProviderProps) => {
  const [airports, setAirports] = useState<Array<Airport>>();
  const [flights, setFlights] = useState<Flights>();
  const [promotionOpt, setPromotionOpt] = useState<PromotionOptions>({
    discounts: [],
    unavailableBrands: [],
  });
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage>();
  const [selectedFlight, setSelectedFlight] = useState<SelectedFlight>();

  const prepareAirports = (flightData: Flights) => {
    const flightAirports = new Array<Airport>();
    const airPortsCheckFields = [
      "originAirport",
      "destinationAirport",
    ] as const;

    flightData.flights.forEach((flight) => {
      airPortsCheckFields.forEach((fieldName) => {
        const exists = flightAirports.some(
          (s) => s.code === flight[fieldName]?.code
        );
        if (!exists) {
          flightAirports.push(flight[fieldName]);
        }
      });
    });

    setAirports(flightAirports);
  };

  const checkFlights = async () => {
    try {
      const lsFlights = localStorage.getItem(LOCAL_STORAGE_FLIGHTS_KEY);
      if (lsFlights) {
        const flightsJson = JSON.parse(lsFlights);
        return { flights: flightsJson, success: true };
      }
    } catch (e) {
      return { success: false };
    }
  };

  const getFlights = async () => {
    const flightsRes = await FlightService.getFlights();
    setFlights(flightsRes);
  };

  const checkAndGetFlights = async () => {
    const result = await checkFlights();
    if (!result?.success) {
      getFlights();
    } else {
      setFlights(result.flights);
    }
  };

  const clearContext = () => {
    setSelectedPackage(undefined);
    setSelectedFlight(undefined);
    setPromotionOpt({ discounts: [], unavailableBrands: [] });
  };

  useEffect(() => {
    if (flights) {
      prepareAirports(flights);
      try {
        saveToLocalStorage(LOCAL_STORAGE_FLIGHTS_KEY, JSON.stringify(flights));
      } catch (e) {
        console.error("Error while saving flights data to local storage: ", e);
      }
    }
  }, [flights]);

  useEffect(() => {
    checkAndGetFlights();
  }, []);

  return (
    <FlightContext.Provider
      value={{
        airports,
        flights,
        promotionOpt,
        setPromotionOpt,
        selectedPackage,
        setSelectedPackage,
        selectedFlight,
        setSelectedFlight,
        clearContext
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export default FlightContextProvider;
