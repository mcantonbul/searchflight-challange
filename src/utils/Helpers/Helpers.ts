/* eslint-disable @typescript-eslint/no-explicit-any */
import { CabinEnum } from "@/enums/CabinEnum";

const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

const getFareCategoryFieldName = (cabin: CabinEnum) => {
    switch (cabin) {
        case CabinEnum.Business:
            return 'BUSINESS';
        case CabinEnum.Economy:
        default:
            return 'ECONOMY';
    }
};

const getCabinEnumValue = (fareCategoryFieldName: string) => {
    switch (fareCategoryFieldName) {
        case "BUSINESS":
            return CabinEnum.Business
        case "ECONOMY":
        default:
            return  CabinEnum.Economy
    }
};

const getSearchParamValues = (searchParams:URLSearchParams) => {
  const originAirportCode = searchParams.get("ori");
  const destinationAirportCode = searchParams.get("des");
  const cabin: CabinEnum =(searchParams.get("cab") as any as CabinEnum) || CabinEnum.Economy;
  const passenger = searchParams.get("pas");

  return {
    originAirportCode,
    destinationAirportCode,
    cabin,
    passenger
  }
}

export { saveToLocalStorage, getFareCategoryFieldName, getCabinEnumValue, getSearchParamValues };