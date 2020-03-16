import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
const PROTOCOL = 'http';
const HOST = location.hostname;
const PORT = '8081';

@Injectable()
export class Config {
    baseUrl: string;
    constructor(){
        this.baseUrl = environment.baseUrl;
    }
}
