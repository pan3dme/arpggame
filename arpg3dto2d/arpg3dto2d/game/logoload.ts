module logo {

    export class LogoLoad {
        private loadCav: HTMLCanvasElement 
        constructor() {
            this.loadCav = <HTMLCanvasElement>document.getElementById('LoadCanvas');
            this.loadBigWidth();
            this.loadTittlePic();
            this.loadLoadBg();
            this.loadLoadBar();
        }
       
        private _loadbgImg: any;
        private loadLoadBg(): void {
            this._loadbgImg = new Image();
            this._loadbgImg.onload = () => {
                this.drawImgToCtx()
            }
            this._loadbgImg.src = "res/ui/progressbg.png";
        }


        private _loadbarImg: any;
        private loadLoadBar(): void {
            this._loadbarImg = new Image();
            this._loadbarImg.onload = () => {
                this.drawImgToCtx()
            }
            this._loadbarImg.src = "res/ui/progressbar.png";
        }
 
        private _logoimg: any;
        private loadTittlePic(): void {
            this._logoimg = new Image();
            this._logoimg.onload = () => {
                this.drawImgToCtx()
            }
            this._logoimg.src = "res/ui/logo.png";
        }


        private static _instance: LogoLoad;
        public static getInstance(): LogoLoad {
            if (!this._instance) {
                this._instance = new LogoLoad();
            }
            return this._instance;
        }
        private showStr: string
        public showLoadInfo($str: string): void {
            this.showStr = $str
            this.drawImgToCtx()
        }
        private _bigWidthimg: any
        private loadBigWidth(): void {
            this._bigWidthimg = new Image();
            this._bigWidthimg.onload = () => {
                this.drawImgToCtx()
            }
            this._bigWidthimg.src = "res/ui/b1.jpg";
        }

        private _bigHeightimg: any
        private loadBigHeight(): void {
            this._bigHeightimg = new Image();
            this._bigHeightimg.onload = () => {
                this.drawImgToCtx()
            }
            this._bigHeightimg.src = "res/ui/b2.jpg";
        }

        private drawImgToCtx(): void {
            var $ctx: CanvasRenderingContext2D = this.loadCav.getContext("2d");

            var stageWidth: number = document.body.clientWidth;
            var stageHeight: number = document.body.clientHeight;

            if (document.body.clientWidth < document.body.clientHeight) {

                stageWidth = document.body.clientHeight;
                stageHeight = document.body.clientWidth;
                 this.loadCav.style.transform = "matrix(0,1,-1,0," + stageHeight + ",0)";
            } else {
                this.loadCav.style.transform = "matrix(1,0,0,1,0,0)";
            }
            this.loadCav.style.transformOrigin = "0px 0px 0px";

            this.loadCav.width = stageWidth;
            this.loadCav.height = stageHeight;
            $ctx.fillStyle = "#000000"; // text color
            $ctx.clearRect(0, 0, this.loadCav.width, this.loadCav.height);
            $ctx.fillStyle = "#000000"; // text color
            $ctx.fillRect(0, 0, this.loadCav.width, this.loadCav.height);
            $ctx.fillStyle = "#4b3002";
            $ctx.fillStyle = "#4b3002";

            var $tx: number = (this.loadCav.width ) / 2
            var $ty: number = (this.loadCav.height) / 2
            if (this._bigWidthimg) {
                $ctx.drawImage(this._bigWidthimg, 0, 0, this.loadCav.width, this.loadCav.height);
            }
            /*
            if (this._logoimg) {
                $ctx.drawImage(this._logoimg, $tx - 278 / 2, $ty - 152 / 2 );
            }
            */
            if (this._loadbgImg) {
                $ctx.drawImage(this._loadbgImg, $tx - 624 / 2, $ty + 110);
            }
            if (this._loadbarImg) {
                $ctx.drawImage(this._loadbarImg, $tx - 604 / 2, $ty + 113, 604 * this.getPercentage(this.showStr)/100,7);
            }
            $ctx.font = "24px Helvetica";
            $ctx.fillStyle = "#4b3002";
            $ctx.textBaseline = "top";
            $ctx.textAlign = "left";
            if (this.showStr) {
                $ctx.fillText(this.showStr, $tx - 80, $ty + 140);
            } else {
                $ctx.fillText("正在努力加载", $tx - 80, $ty + 140);
            }
        }
        private getPercentage($str: string): number {
            if ($str && $str.search("%") != -1) {
                var idx: number = $str.indexOf("%");
                if (idx > 3) {
                    var numA: number = Number($str.substr(idx - 1, 1))
                    var numB: number = Number($str.substr(idx - 2, 2))
                    if (isNaN(numB)) {
                        if (isNaN(numA)) {
                            return 0
                        }
                        return numA
                    } else {
                        return numB
                    }

                }
            }
            return 0
        }
    }
}