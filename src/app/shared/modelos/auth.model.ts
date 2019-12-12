export class AuthModel {
    constructor(
        public access_token?: string,
        public user_rol?: string,
        public user_email?: string
    ){}
}