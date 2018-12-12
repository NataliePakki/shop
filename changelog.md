- implement backend: use json-server
- implement HttpServer
* getAll<T>(): Observable<T>
* get<T>: Promise<T>
* post<T>: Promise<T>
* put<T>: Promise<T>
* delete<T>: Promise<T>
- implement TimingInterceptor to console log timing for '/products' requests
- implement AppSettings, which load setting from localStorage using localStorageService
or load from app-setting.json file or use defaultSettings
