module charbg {
    export class CharInfoPanel extends WindowMinUi {

        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;

        public _baseUiAtlas: UIAtlas;


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.center = 0;

            this.setBlackBg();

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender);

        }
        public applyLoad(): void {
            this._baseUiAtlas = new UIAtlas();
            this._baseUiAtlas.setInfo("ui/uidata/charbg/charinfo.xml", "ui/uidata/charbg/charinfo.png", () => { this.loadConfigCom() });
        }
        private uiAtlasComplet: boolean = false;

        private charName: UICompenent;
        private charVip: UICompenent;
        private charTitle: UICompenent;


        private equIconAry: Array<UICompenent>;
        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;

            this.addChild(this.winmidRender.getComponent("t_bg"));
            this.addUIList(["t_win_title", "t_title_bg"], this._bgRender);

            var ui: UICompenent;
            ui = this.addChild(this._baseRender.getComponent("t_btn1"));
            ui.addEventListener(InteractiveEvent.Down, this.delread, this);
            ui = this.addChild(this._baseRender.getComponent("t_btn2"));
            ui.addEventListener(InteractiveEvent.Down, this.getAll, this);

            this.charName = this.addChild(this._baseRender.getComponent("t_name"));
            this.charVip = this.addChild(this._baseRender.getComponent("t_vip"));
            this.charTitle = this.addChild(this._baseRender.getComponent("t_title"));


            this.equIconAry = new Array;
            for (var i: number = 0; i < 10; i++) {
                this.equIconAry.push(this.addChild(this._baseRender.getComponent("t_i" + i)));
                this.equIconAry[i].addEventListener(InteractiveEvent.Up, this.equclick, this);
            }


            this.uiAtlasComplet = true;

            this.addPersonChar();
            this.applyLoadComplete();


        }

        private equclick($e: InteractiveEvent): void {
            var data: any = $e.target.data;
            if (data) {
                var evt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                evt.data = data;
                evt.buttonType = 6;
                ModuleEventManager.dispatchEvent(evt);
            }
        }

        public draw(pvo: PlayerOverview): void {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.charName.skinName, getBaseName(pvo.spo.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            
            var equDic: any = new Object;
            for (var i: number = 0; i < pvo.equAry.length; i++) {
                var str: string = pvo.equAry[i].equip;
                var item: BagItemData = BagData.paserItemData(str);
                item.qhGemData = pvo.equAry[i];
                equDic[item.entryData.pos] = item;
            }

            for (var i: number = 0; i < this.equIconAry.length; i++) {
                var item: BagItemData = equDic[i + 1];
                if (item) {
                    IconManager.getInstance().drawItemIcon60(this.equIconAry[i], item.entry, 1, false, false);
                } else {
                    this.setNoEquIcon(this.equIconAry[i].skinName, i);
                }
                this.equIconAry[i].data = item;

            }

            this.showDisPlay.setBaseRoleAvatar(pvo.spo.coat, pvo.spo.gender);
            this.showDisPlay.setBaseRoleWeapon(pvo.spo.weapon, pvo.spo.gender);

            IconManager.getInstance().drawVip(this.charVip,pvo.spo.vip);
            
            if(pvo.spo.title > 0){
                this._baseUiAtlas.upDataPicToTexture(getUItittleUrl(String(pvo.spo.title)),this.charTitle.skinName);
            }else{
                UiDraw.clearUI(this.charTitle);
            }
            
            //this._baseUiAtlas.upDataPicToTexture(getUItittleUrl(String(1)),this.charTitle.skinName)
        }

        private partNameAry: Array<string> = ["武器", "衣服", "护手", "腰带", "鞋子", "头饰", "项链", "手镯", "戒指", "腰坠"];
        public setNoEquIcon($skinName: string, $index: number): void {
            var rec: UIRectangle = this._baseUiAtlas.getRec($skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            LabelTextFont.writeSingleLabelToCtx(ctx, this.partNameAry[$index], 16, 0, 25, TextAlign.CENTER, ColorType.Brownac8965);
            this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);

        }


        private delread($e: InteractiveEvent): void {
            //NetManager.getInstance().protocolos.remove_mail_one_step();
            NetManager.getInstance().protocolos.social_add_friend(this._data.spo.guid);
        }
        private getAll($e: InteractiveEvent): void {
            //NetManager.getInstance().protocolos.pick_mail_one_step();
            //send_faction_invite
            if(GuidData.player.getFactionID() == ""){
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您还没有加入家族", 99);                
                return;
            }
            NetManager.getInstance().protocolos.send_faction_invite(this._data.spo.guid);
        }

        private showDisPlay: Person2DChar;
        private addPersonChar(): void {
            var $person2DChar: Person2DChar = new Person2DChar();
            this.wintopRender.addModel($person2DChar);
            this.showDisPlay = $person2DChar;
            this.resize();
        }

        public resize(): void {
            super.resize();
            if (this.showDisPlay) {
                this.showDisPlay.resize();
                this.showDisPlay.scale = 5.0 * UIData.Scale;
                this.showDisPlay.x = -20 * UIData.Scale;
                this.showDisPlay.y = -130 * UIData.Scale;
            }

        }
        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.e_close) {
                this.hide();
            }
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
        private _data:PlayerOverview;
        public show(spo: PlayerOverview): void {
            this._data = spo;
            this.draw(spo);
            UIManager.getInstance().addUIContainer(this);
        }
    }
}