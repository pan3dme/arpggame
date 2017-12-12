module bottomui {
    export class HornTxtVo {
        public time: number;
        public timeLen: number;
        public data: s2c_send_chat;
    }
    export class SysInfoPanel {
        public ui: UICompenent;
        public bg: UICompenent;
        public uiAtlas: UIAtlas;
        public constructor($ui: UICompenent, $bg: UICompenent, $uiAtlas: UIAtlas) {
            this.ui = $ui;
            this.bg = $bg;
            this.uiAtlas = $uiAtlas;
            this.hornWaitItem = new Array();
            this.lastTimePositon = TimeUtil.getTimer() - this.totalTime;
        }
        public pushWaithornToItem($s2c_send_chat: s2c_send_chat): void {
            var $startime: number = TimeUtil.getTimer() + this.totalTime;
            if (this.hornWaitItem.length) {
                var $preVo: HornTxtVo = this.hornWaitItem[this.hornWaitItem.length - 1]
                $startime = Math.max($startime, ($preVo.time + $preVo.timeLen));
            }
            var $vo: HornTxtVo = new HornTxtVo();
            $vo.time = $startime;
            $vo.data = $s2c_send_chat
            var txtLen: number = FaceFontLabel.getFaceTxtStrLen($vo.data.content)
            $vo.timeLen = txtLen * 350 + 1000; //延时1秒间隔
            this.hornWaitItem.push($vo);
            this.drawHornSkin()
        }
        public updata(t): void {
            if (this.hornWaitItem.length) {
                var $tempNum: number = TimeUtil.getTimer() - this.lastTimePositon;
                $tempNum = $tempNum / this.totalTime;
                if ($tempNum > 1) {
                    this.lastTimePositon = TimeUtil.getTimer();
                    this.drawHornSkin()
                    $tempNum = 0
                }
                this.moveSpeed = $tempNum * 0.5;
                this.ui.renderData2[0] = 0.5;
                this.ui.renderData2[2] = this.moveSpeed;
                this.ui.uiRender.makeRenderDataVc(this.ui.vcId);
                this.bg.x = 214
            } else {
                this.bg.x = 10000
            }
        }
        public lastTimePositon: number = 0; //移动时间标注点
        public totalTime: number = 10000; //一个循环的时间。走0-0.5的UV
        public hornWaitItem: Array<HornTxtVo>
        private moveSpeed: number = 0;
        private drawHornSkin(): void {

            var fontsize: number = 16;
            var $uiRect: UIRectangle = this.uiAtlas.getRec(this.ui.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var dnum: number = 0
            for (var i: number = this.hornWaitItem.length - 1; i >= 0; i--) {
                var $vo: HornTxtVo = this.hornWaitItem[i];
                var a: boolean = ($vo.time + $vo.timeLen) > this.lastTimePositon;//还没播完;
                var b: boolean = $vo.time < (this.lastTimePositon + this.totalTime * 2)//在可播范围内;
                if (a && b) {
                    var tx: number = ($vo.time - this.lastTimePositon) * (512 / this.totalTime);
                   // FaceFontLabel.wrapFaceText($ctx, $vo.data.content, fontsize, "[]", Math.floor(tx), 1, 10000, 20)

                   // LabelTextFont.writeSingleLabelToCtx($ctx, $vo.data.content, fontsize, Math.floor(tx),
     
                    TextRegExp.wrapText($ctx, $vo.data.content, ColorType.Whitefff4d6, Math.floor(tx), 0, 10000, fontsize, fontsize, "#27262e",4,1.2);

                    dnum++
                } else {
                    if (!a) {
                        this.hornWaitItem.splice(i, 1);
                    }
                }
            }
            this.uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
        }
    }
    export class InfoTipIconVo {
        public ui: FrameCompenent;
    }
    export class InfoTipManager {
        private _container: UIPanel
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _itemUi: Array<InfoTipIconVo>;

        public constructor($container: UIPanel, $bg: UIRenderComponent, $mid: UIRenderComponent) {
            this._container = $container
            this._bottomRender = $bg;
            this._midRender = $mid;
            this._itemUi = new Array;

            this.refresh()

        }

        private showData: Array<number> = [1, 2, 3, 4, 5, 6];
        public visible: boolean = true
        public refresh(): void {
            this.clear();
            /*
            if (GuidData.map.tbMapVo.inst_type == 2) {  //副本
                return;
            }
            if (GuidData.map.tbMapVo.inst_type == 1) {  //活动
                return;
            }
            */
            this.showData = mainUi.MainUiModel.getMsgTipData();
            //  this.showData = [1, 2, 3, 4, 5, 6]
            if (this.visible) {
                var $cellNum6: number = 6
                var $num55: number = 55
                for (var i: number = 0; i < this.showData.length; i++) {
                    var $iconData: number = this.showData[i]
                    var $vo: InfoTipIconVo = new InfoTipIconVo();
                    $vo.ui = <FrameCompenent>this._container.addChild(this._midRender.getComponent("a_info_icon"));
                    $vo.ui.data = $iconData;
                    $vo.ui.goToAndStop(i)
                    $vo.ui.addEventListener(InteractiveEvent.Up, this.butClik, this);
                    $vo.ui.addEventListener(InteractiveEvent.Down,v=>{}, this);
                    var $pos: Vector2D = new Vector2D;

                    $pos.x = 480 + i * $num55 - (this.showData.length / 2) * $num55;
                    $pos.y = 417;

                    $vo.ui.x = $pos.x
                    $vo.ui.y = $pos.y

                    this.ctxIconPic($vo.ui, $iconData)
                    this._itemUi.push($vo)
                }
            }
        }
        private ctxIconPic($ui: FrameCompenent, $data: number): void {

            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/msgicon/" + $data + ".png", LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $toRect: Rectangle = $ui.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    $ctx.drawImage($img, 0, 0, $img.width, $img.height,0,0,$toRect.width, $toRect.height);
                    $ui.drawToCtx(this._midRender.uiAtlas, $ctx)
                });

        }
        public butClik(evt: InteractiveEvent): void {

            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target.data) {
                case 0:
                    break
                case 1:
                    // ModulePageManager.openPanel(SharedDef.MODULE_SOCIAL);
                    ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.SHOW_APPLYPANEL_EVENT));
                    break
                case 2:  //家族

                    if (GuidData.faction) {
                        ModulePageManager.openPanel(SharedDef.MODULE_FACTION);
                    } else {
                        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_INVITATION_EVENT));
                    }
                
                    break
                case 3:  //礼物
                    // GuidData.faction.queenGiftUncheckNum = 0
                    this.refresh();
                    // ModuleEventManager.dispatchEvent(new faction.GiftprocessingEvent(faction.GiftprocessingEvent.SHOW_Gift_EVENT));
                    break
                case 4: //私聊

                    // Chat.ChatModel.showType = SharedDef.CHAT_TYPE_WHISPER;
                    // ModulePageManager.openPanel(PanelClass.SHOW_CHAT_PANEL);

                    var $arr: Array<Chat.ChatVo> = Chat.ChatModel.getInstance().getChatItemByType(SharedDef.CHAT_TYPE_WHISPER);
                    for (var i = $arr.length - 1; i >= 0; i--) {
                        if ($arr[i].s2c_send_chat.guid != GuidData.player.getGuid()) {
                            ModulePageManager.openPanel(SharedDef.MODULE_CHATPERSON,$arr[i].s2c_send_chat.guid);
                            break;
                        }
                    }


                    break;
                case 5: //邮件
              
                    //ModulePageManager.openPanel(PanelClass.SHOW_CHAT_PANEL);
                    //email.EmailModel.getInstance().lastGetEmailTipTime = GameInstance.getServerNow();
                    ModulePageManager.openPanel(SharedDef.MODULE_MAIL);
         
                    this.refresh();
                    break;

                default:
                    break
            }
        }
        private clear(): void {
            while (this._itemUi.length) {
                var $vo: InfoTipIconVo = this._itemUi.pop();
                this._container.removeChild($vo.ui);
            }
        }
    }

    export class BottomUiPanel extends UIPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        private uiAtlasComplet: boolean = false
        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.bottom = 0;
            this.center = 0;
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);
            this._midRender.uiAtlas = new UIAtlas;
        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/mainui/bootom/bootom.xml", "ui/uidata/mainui/bootom/bootom.png", () => { this.loadConfigCom() });
        }

        private sysTipPanel: SysInfoPanel;
        private a_sys_info: UICompenent;
        private infoTipManager: InfoTipManager;
        public bottomChatPanel: BottomUiChatPanel;
        private bottomUiLeftPanel: BottomUiLeftPanel;
        private bottomAotuScaleText: BottomAotuScaleText
        private progress_line: Progress_line
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.progress_line = new Progress_line(this, this._bottomRender, this._midRender);

            this.infoTipManager = new InfoTipManager(this, this._bottomRender, this._topRender)

            this.bottomChatPanel = new BottomUiChatPanel();
            this.bottomChatPanel.setRender(this._bottomRender, this._midRender, this._topRender);
            this.addVirtualContainer(this.bottomChatPanel);

            this.bottomUiLeftPanel = new BottomUiLeftPanel();
            this.bottomUiLeftPanel.setRender(this._bottomRender, this._midRender, this._topRender);
            this.addVirtualContainer(this.bottomUiLeftPanel);

            this.bottomAotuScaleText = new BottomAotuScaleText();
            this.bottomAotuScaleText.setRender(this._bottomRender, this._midRender, this._topRender);
            this.addVirtualContainer(this.bottomAotuScaleText);


            this.a_sys_info_bg = this.addChild(<UICompenent>this._bottomRender.getComponent("a_sys_info_bg"));
            this.a_sys_info_bg.top = 120;
            this.a_sys_info = this.addChild(<UICompenent>this._midRender.getComponent("a_sys_info"));
            this.a_sys_info.top = 120 + 5;
            this.sysTipPanel = new SysInfoPanel(this.a_sys_info, this.a_sys_info_bg, this._bottomRender.uiAtlas);

            this.addexperience_lines()

            this.uiAtlasComplet = true
            this.applyLoadComplete();

            TimeUtil.addFrameTick((t: number) => { this.update(t) });

        }
        private a_sys_info_bg: UICompenent
        public setShowChatGrid(value: boolean): void {
            if (this.uiAtlasComplet) {
                this.bottomChatPanel.setShowChatGrid(value)
            }
        }
        private expNum5: number = 5
        private expNum: number = 0.7;
        private d_experience_bg: UICompenent
        private expUiItem: Array<UICompenent>
        private addexperience_lines(): void {
            this.d_experience_bg = this.addChild(<UICompenent>this._bottomRender.getComponent("d_experience_bg"));
            this.d_experience_bg.left = 0
            this.d_experience_bg.bottom = 0
            this.expUiItem = new Array()
            for (var i: number = 0; i < this.expNum5; i++) {
                this.expUiItem.push(this.addChild(<UICompenent>this._midRender.getComponent("d_experience_line")))
                this.expUiItem[i].bottom = 0;

            }
        }
        public update(t: number): void {
            if (this.uiAtlasComplet) {
                this.sysTipPanel.updata(t);
                this.bottomAotuScaleText.updata(t)

                var $tw: number = Scene_data.stageWidth / UIData.Scale
                this.d_experience_bg.width = $tw;
                this.expNum = GuidData.player.getExp() / GuidData.player.getMaxExp()
                for (var i: number = 0; i < this.expNum5; i++) {
                    this.expUiItem[i].width = 0
                    this.expUiItem[i].x = ($tw / this.expNum5 + 3) * i - this.x / UIData.Scale;
                    var $temp: number = this.expNum - (i * (1 / this.expNum5))
                    var tw: number = ($tw - ((this.expNum5 - 1) * 3)) / this.expNum5
                    if ($temp > (1 / this.expNum5)) {
                        this.expUiItem[i].width = tw
                    } else {
                        this.expUiItem[i].width = Math.max(tw * $temp * this.expNum5, 0)
                    }
                }
            }
        }
        //全服喇叭提示
        public pushSysInfoTop($s2c_send_chat: s2c_send_chat): void {
            if (this.sysTipPanel) {
                this.sysTipPanel.pushWaithornToItem($s2c_send_chat)
            }
        }
        //消息图标提示（邮件，好友）
        public refreshInfoTipManager(): void {
            this.infoTipManager.refresh();
        }
        public refresh(): void {
            if (this.uiAtlasComplet) {
                this.infoTipManager.refresh();
                this.bottomUiLeftPanel.refresh()
            }
        }
    }
}