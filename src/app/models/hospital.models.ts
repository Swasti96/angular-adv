interface _UsersHospital {
    _id: string,
    name: string,
    img?: string,
}

export class Hospital {

    constructor(
        public _id: string,
        public name: string,
        public img?: string,
        public user?: _UsersHospital
    ) { }
}