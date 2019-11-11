import { Injectable } from "@angular/core";
const PROTOCOL = 'http';
const HOST = location.hostname;
const PORT = '8081';

@Injectable()
export class Config {
    baseUrl: string;
    constructor(){
        this.baseUrl = `${PROTOCOL}://${HOST}:${PORT}/api/`;
    }
}