module pass {

    export class PassModel {
        public constructor() {

        }
        private static _instance: PassModel;
        public static getInstance(): PassModel {
            if (!this._instance) {
                this._instance = new PassModel();
            }
            return this._instance;
        }

        

    }
}