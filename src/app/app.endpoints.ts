import { environment } from '../environments/environment';

class Endpoint {

    private API_URL= environment.API_URL;

    public getServerUrl() {
        return this.API_URL;
    }
}

export default new Endpoint();