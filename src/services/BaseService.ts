abstract class BaseService {
    protected async get<T>(url: string): Promise<T> {
        const response = await fetch(url);

        return response.json();
    }
}

export default BaseService