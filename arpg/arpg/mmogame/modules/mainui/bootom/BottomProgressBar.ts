module bottomui {
    export class Progress_line {
        private c_progress_bar: UICompenent;
        private c_progress_bg: UICompenent
        private c_progress_label: FrameCompenent
        private c_progress_num: UICompenent
        private perent: UIPanel;
        private uiAtlas: UIAtlas
        public constructor($perent: UIPanel, $bottom: UIRenderComponent, $mid: UIRenderComponent) {
            this.perent = $perent;
            this.uiAtlas = $bottom.uiAtlas

            this.c_progress_bg = <UICompenent>$bottom.getComponent("c_progress_bg");
            this.c_progress_bar = <UICompenent>$mid.getComponent("c_progress_bar");
            this.c_progress_bar.uvScale = 0

            this.c_progress_label = <FrameCompenent>$bottom.getComponent("c_progress_label");
            this.c_progress_num = <UICompenent>$bottom.getComponent("c_progress_num");
            this.c_progress_fen = <UICompenent>$bottom.getComponent("c_progress_fen");

            

            this.uilistArr = new Array();
            this.uilistArr.push(this.c_progress_bg);
            this.uilistArr.push(this.c_progress_bar);
            this.uilistArr.push(this.c_progress_label);
            this.uilistArr.push(this.c_progress_num);
            this.uilistArr.push(this.c_progress_fen);

            Progress_line._instance = this;
            this.updataFun = (t: number) => { this.updata(t) }
        }
        private c_progress_fen: UICompenent
        private uilistArr: Array<UICompenent>
        private updataFun: Function;
        private cdEndTime: number; //结束时间
        private statTime: number; //开始时间
        private backFun: Function;
        private showType: number;
        public show($num: number, $bfun: Function, $type: number = 3): void {
            if (!this.c_progress_bar.parent) {
                this.c_progress_bar.uvScale = 0
                this.showType = $type
                this.c_progress_label.goToAndStop(this.showType);
                this.perent.setUiListVisibleByItem(this.uilistArr, true)
                this.statTime = TimeUtil.getTimer();
                this.cdEndTime = this.statTime + $num
                this.backFun = $bfun
    
                TimeUtil.addFrameTick(this.updataFun);
            }
        }
  
        private updata(t: number): void {
            var $sp: number = this.cdEndTime - TimeUtil.getTimer()
            if ($sp < 0) {
                if (this.backFun) {
                    this.backFun()
                }
                this.hide()
            } else {
                $sp = $sp / (this.cdEndTime - this.statTime);
                $sp = 1 - $sp;
                this.c_progress_bar.uvScale = $sp;
                if (this.showType == 0) {
                    this.uiAtlas.clearCtxTextureBySkilname(this.c_progress_num.skinName);
                } else {
                    ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.c_progress_num.skinName, String(Math.floor($sp * 100)), ArtFont.num64, TextAlign.RIGHT);
                }
            }

        }
        public hide(): void {
            if (this.c_progress_bar.parent) {
                this.perent.setUiListVisibleByItem(this.uilistArr, false)
                TimeUtil.removeFrameTick(this.updataFun);
            }
        }

        private static _instance: Progress_line;
        public static getInstance(): Progress_line {
            return this._instance;
        }
    }
}