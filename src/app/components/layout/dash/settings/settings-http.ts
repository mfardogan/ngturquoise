import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import Settings from "src/app/@core/models/settings";
import { BackendConfigService } from "src/app/@core/services/backend-config.service";
import { Dependency } from "src/app/app.module";

export class SettingsHttp {

    private prefix: string = "";
    constructor() {
        const config = Dependency.get(BackendConfigService);
        this.prefix = config.getUrl() + '/api/Settings';
    }

    getCurrentSettings(): Observable<Settings> {
        const httpService = Dependency.get(HttpClient);
        return httpService.get<Settings>(this.prefix);
    }

    upsertCurrentSettings(data: Settings): Observable<any> {
        const httpService = Dependency.get(HttpClient);
        return httpService.post(this.prefix, data);
    }
}