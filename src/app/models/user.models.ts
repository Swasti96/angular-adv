export class User {

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public rol?: string,
        public google?: boolean,
        public uid?: string,
    ) {}

}