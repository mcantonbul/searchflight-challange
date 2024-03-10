import BaseService from "../BaseService";

/** Models */
import { Flights } from "@/models";

class FlightService extends BaseService {
    constructor() {
        super();
     }

    getFlights() {
        return this.get<Flights>(`/flights.json`);
    }
}

export default new FlightService();