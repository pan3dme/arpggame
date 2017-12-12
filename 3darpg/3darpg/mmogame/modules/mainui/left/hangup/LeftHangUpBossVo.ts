module leftui {

    export class LeftHangUpBossVo {
        private perent: UIPanel;
        protected uiList: Array<UICompenent>;
        protected _midRender: UIRenderComponent;
        protected _topRender: UIRenderComponent;
        public constructor($perent: UIPanel, $mid: UIRenderComponent, $top: UIRenderComponent) {
            this.perent = $perent;
            this._midRender = $mid;
            this._topRender = $top;

            this.initUi();

        }
        private b_bg: UICompenent

        private initUi(): void {
            this.uiList = new Array();
            this.b_bg = this.perent.addChild(<UICompenent>this._midRender.getComponent("b_bg"));
            this.uiList.push(this.b_bg)

            this.a_bg_top = this.perent.addChild(<UICompenent>this._midRender.getComponent("a_bg_top"));
            this.a_bg_mid = this.perent.addChild(<UICompenent>this._midRender.getComponent("a_bg_mid"));
            this.a_bg_bottom = this.perent.addChild(<UICompenent>this._midRender.getComponent("a_bg_bottom"));

            this.uiList.push(this.a_bg_top)
            this.uiList.push(this.a_bg_mid)
            this.uiList.push(this.a_bg_bottom)

            this.b_map_name = this.perent.addChild(<UICompenent>this._topRender.getComponent("b_map_name"));
            this.uiList.push(this.b_map_name)


            this.b_force_txt = this.perent.addChild(<UICompenent>this._topRender.getComponent("b_force_txt"));
            this.uiList.push(this.b_force_txt)


            this.b_tip_info = this.perent.addChild(<UICompenent>this._topRender.getComponent("b_tip_info"));
            this.uiList.push(this.b_tip_info)

            this.resize()
        }

        private a_bg_top: UICompenent
        private a_bg_mid: UICompenent
        private a_bg_bottom: UICompenent
        private resize(): void {
            this.a_bg_top.x = this.b_bg.x
            this.a_bg_mid.x = this.b_bg.x
            this.a_bg_bottom.x = this.b_bg.x

            this.a_bg_top.y = this.b_bg.y;
            this.a_bg_mid.y = this.a_bg_top.y + this.a_bg_top.height
            this.a_bg_mid.height = this.b_bg.height - this.a_bg_top.height - this.a_bg_bottom.height
            this.a_bg_bottom.y = this.b_bg.y + this.b_bg.height - this.a_bg_bottom.height

        }
        private b_map_name: UICompenent;
        private b_force_txt: UICompenent;
        private b_tip_info: UICompenent;

        public refresh(): void {
            var $tb: tb.TB_risk_data = tb.TB_risk_data.get_TB_risk_data(GuidData.map.getTrialInstanceFieldSectionId());
            console.log("----------------------", $tb)

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_map_name.skinName, $tb.name, 14, TextAlign.LEFT, ColorType.Yellowffd500);

            var $expStr: string = ColorType.Whiteffffff + "Boss战力:" + ColorType.Green56da35 + $tb.advisepoint;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_force_txt.skinName, $expStr, 14, TextAlign.LEFT, ColorType.Whiteffffff);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_tip_info.skinName, "Boss奖励:", 14, TextAlign.LEFT, ColorType.Whiteffffff);

            this.clearIcon();
            for (var i: number = 0; i < 3; i++) {
                if (i > $tb.showitems.length - 1) {
                    return;
                }
                var $b_reward_frame: FrameCompenent = <FrameCompenent>this.perent.addChild(this._topRender.getComponent("b_reward_frame"));
                $b_reward_frame.goToAndStop(i)
                $b_reward_frame.x += i * 50;
                this.drawIconReward($b_reward_frame, $tb.showitems[i])
                $b_reward_frame.addEventListener(InteractiveEvent.Up, this.itemClick, this);
                // IconManager.getInstance().drawItemIcon40($b_reward_frame, $tb.showitems[i]);
                this.iconFrameItem.push($b_reward_frame);
            }
        }
        private drawIconReward($ui: FrameCompenent, $id: number): void {
            var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($id);
            $ui.data = obj;
            IconManager.getInstance().getIcon(geteqiconIconUrl(obj.icon),
                ($img: any) => {
                    var $skillrec: Rectangle = $ui.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);


                    UiDraw.cxtDrawImg($ctx, PuiData.PropBg40, new Rectangle(0, 0, 48, 48), UIData.publicUi);
                    UiDraw.cxtDrawImg($ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 48, 48), UIData.publicUi);
                    $ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 40, 40);
                    $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
                });
        }

        public itemClick($e: InteractiveEvent): void {
            var itemData: any = $e.target.data;
            var bag: BagItemData = new BagItemData();
            bag.entryData = itemData;
            var evt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
            evt.data = bag;
            evt.buttonType = -1;
            ModuleEventManager.dispatchEvent(evt);
        }

        private clearIcon(): void {
            if (this.iconFrameItem) {
                while (this.iconFrameItem.length) {
                    this.perent.removeChild(this.iconFrameItem.pop())
                }
            } else {
                this.iconFrameItem = new Array
            }


        }
        private iconFrameItem: Array<FrameCompenent>;



        public show(): void {
            this.perent.setUiListVisibleByItem(this.uiList, true)
            this.refresh();
        }
        public hide(): void {
            this.clearIcon();
            this.perent.setUiListVisibleByItem(this.uiList, false)
        }

    }
}