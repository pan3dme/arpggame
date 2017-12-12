module social {
    //技能的三个类型
    export class SkillBaseType {
        public static ZHUDONG: number = 0;
        public static NUQI: number = 1;
        public static BEIDONG: number = 2;
    }

    export class SocialgivingData {
        public socialItemData: any;
        //poppanel需要哪些item
        public items: Array<number>;
        //from UIConatiner Object
        public parents: UIConatiner;
        //tab类型
        public type: number;
    }
    
    export class SocialModel {

        private static _instance: SocialModel;
        public static getInstance(): SocialModel {
            if (!this._instance) {
                this._instance = new SocialModel();
            }
            return this._instance;
        }

        public constructor() {

        }
    }

}