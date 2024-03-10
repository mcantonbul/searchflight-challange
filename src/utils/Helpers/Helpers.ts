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

export { saveToLocalStorage, getFareCategoryFieldName, getCabinEnumValue };