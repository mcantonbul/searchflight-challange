import { CabinEnum } from "@/enums/CabinEnum"

export interface Flights {
    flights: Flight[]
}

export interface Flight {
    originAirport: Airport
    destinationAirport: Airport
    arrivalDateTimeDisplay: string
    departureDateTimeDisplay: string
    flightDuration: string
    fareCategories: FareCategories
}

export interface City {
    code: string
    name: string
}

export interface Country {
    code: string
    name: string
}

export interface Airport {
    name: string
    code: string
    city: City
    country: Country
}

export interface FareCategories {
    BUSINESS: Business
    ECONOMY: Economy
}

export interface Business {
    subcategories: Subcategory[]
}

export interface Subcategory {
    brandCode: string
    price: Price
    order: number
    status: string
    rights: string[]
}

export interface Price {
    amount: number
    currency: string
}

export interface Economy {
    subcategories: Subcategory[]
}

export interface IThema {
    backgroundColor: string;
    header: {
        color: string;
    },
    footer: {
        color: string;
    }
}

export interface FlightFormValues {
    cabin: CabinEnum
    passenger: number
    originAirportCode: string
    destinationAirportCode: string
}

export interface PromotionOptions {
    unavailableBrands: string[]
    discounts: Discount[]
}

export interface Discount {
    brandCode: string
    discountRate: number
}

export interface SelectedPackage {
    brandCode: string
}

export interface SelectedFlight {
    index: number;
    cabin: CabinEnum;
    open?: boolean;
}

export interface ResultModel {
    success: boolean
    price?: Price
}

export type PassengerReducerActionType = 'INCREMENT' | 'DECREMENT';