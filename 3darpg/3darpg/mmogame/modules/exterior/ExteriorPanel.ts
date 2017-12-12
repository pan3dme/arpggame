module exterior {

    export class ExteriorCellVo {
        public tb: tb.TB_appearance_info
        public isHave: boolean
        public isUse: boolean
        public type: number;
        public node: RedPointNode;
    }
    export class ExteriorListRender extends SListItem {
        //public static baseAtlas: UIAtlas;

        private G_BG: UICompenent;
        private G_ICON: UICompenent;
        private G_NAME: UICompenent;
        private G_USE_INFO: UICompenent;
        private G_TIP_PIC: UICompenent;

        private G_MASK: UICompenent;
        private G_RED: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var customRender: UIRenderComponent = this._customRenderAry[0];


            this.G_BG = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "G_BG", 0, 0, 230, 90, 10, 10);
            $container.addChild(this.G_BG);
            this.G_BG.addEventListener(InteractiveEvent.Down, this.butClik, this);



            this.G_MASK = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "G_MASK", 0, 0, 230, 90, 10, 10);
            $container.addChild(this.G_MASK);



            this.G_ICON = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_ICON", 12, 10, 68, 68);
            $container.addChild(this.G_ICON);


            this.G_NAME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_NAME", 90, 20, 100, 18);
            $container.addChild(this.G_NAME);

            this.G_USE_INFO = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_USE_INFO", 90, 45, 100, 18);
            $container.addChild(this.G_USE_INFO);



            this.G_TIP_PIC = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_TIP_PIC", 188, 1, 30, 60);
            $container.addChild(this.G_TIP_PIC);

            this.G_RED = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_Red", 195, 3, 17, 16);
            //$container.addChild(this.G_RED);
            this.G_RED.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.G_RED.skinName, UIData.publicUi, PuiData.A_RED_POINT);



        }
        private butClik(evt: any): void {
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            } else {
                this.setnull();
            }
        }
        private setnull(): void {
            this.uiAtlas.clearCtxTextureBySkilname(this.G_BG.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.G_ICON.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.G_NAME.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.G_USE_INFO.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.G_TIP_PIC.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.G_MASK.skinName)
            this.G_RED.preHide();
        }
        public set selected(val: boolean) {
            this._selected = val;
            this.applyRender();
            if (val) {
                if (this.itdata && this.itdata.data) {
                    var $exteriorEvent: ExteriorEvent = new ExteriorEvent(exterior.ExteriorEvent.SELECT_EXTERIOR_CELL)
                    $exteriorEvent.exteriorCellVo = this.itdata.data;
                    ModuleEventManager.dispatchEvent($exteriorEvent);
                }
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        public drawIcon($icon:number) {
            IconManager.getInstance().getIcon(getExteriorIconUrl($icon),
                ($img) => {
                    var $rec: UIRectangle = this.G_ICON.uiRender.uiAtlas.getRec(this.G_ICON.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                    this.G_ICON.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private applyRender(): void {
            if (this.itdata && this.itdata.data) {

                var $exteriorCellVo: ExteriorCellVo = this.itdata.data
                if ($exteriorCellVo.node) {
                    $exteriorCellVo.node.bindUI(this.G_RED);
                }

                this.drawIcon($exteriorCellVo.tb.icon);

                if ($exteriorCellVo.isUse) {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.G_TIP_PIC.skinName, "U_TIP");
                } else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.G_TIP_PIC.skinName)
                }
                if (this.selected) {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.G_BG.skinName, "U_BG_SELECT");
                } else {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.G_BG.skinName, "U_BG");
                }
                if ($exteriorCellVo.isHave) {
                    this.uiAtlas.clearCtxTextureBySkilname(this.G_MASK.skinName)
                } else {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.G_MASK.skinName, "U_BG_NO");
                }

                var $butTxt: string
                if ($exteriorCellVo.isUse) {
                    $butTxt = ""
                } else {
                    if ($exteriorCellVo.isHave) {
                        $butTxt = ""
                    } else {
                        $butTxt = "未收集"

                    }
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.G_USE_INFO.skinName, ColorType.Yellowffecc6 + $butTxt, 16, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.G_NAME.skinName, ColorType.Brown7a2f21 + $exteriorCellVo.tb.name, 16, TextAlign.LEFT);
            } else {
                this.G_RED.preHide();
            }
        }

    }



    export class ExteriorList extends SList {

        public constructor() {
            super();
        }
        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, ExteriorListRender, 230, 90 * 5 - 20, 230, 90, 5, 256, 1024, 1, 9, 1);
        }
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }

    export class ExteriorPanel extends WindowUi {

        private _bgRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _redPointRender: RedPointRender;

        private uiAtlasComplet: boolean = false;

        public dispose() {
            this._bgRender.dispose();
            this._bgRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;

            this.mountRoleSprite.destory();
            this.mountRoleSprite = null;

            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender);

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);

            this._midRender.uiAtlas = new UIAtlas;
        }

        public applyLoad(): void {

            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this._midRender.uiAtlas.setInfo("ui/uidata/exterior/exterior.xml", "ui/uidata/exterior/exterior.png", () => { this.loadConfigCom() }, "ui/uidata/exterior/exterioruse.png");

            // });

        }

        private a_tab0: SelectButton;
        private a_tab1: SelectButton;

        private a_left_list_pos: UICompenent;



        private a_big_but_txt: UICompenent;
        private a_res_need_icon: UICompenent;
        private a_res_need_num: UICompenent;
        private a_big_but_bg: UICompenent;
        private a_select_name: UICompenent;
        private a_zhuangbei_ing: UICompenent;
        private a_tujian_icon: UICompenent;
        private a_zhanli_numAry: Array<FrameCompenent>

        private _btnRedPoint: UICompenent;
        private loadConfigCom(): void {

            this._bgRender.uiAtlas = this._midRender.uiAtlas;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.a_tab0 = <SelectButton>this.addEvntBut("a_tab0", this._topRender);
            this.a_tab1 = <SelectButton>this.addEvntBut("a_tab1", this._topRender);

            this._redPointRender.getRedPointUI(this, 21, new Vector2D(this.a_tab0.x + this.a_tab0.width - 5, this.a_tab0.y));
            this._redPointRender.getRedPointUI(this, 24, new Vector2D(this.a_tab1.x + this.a_tab1.width - 5, this.a_tab1.y));


            this.addChild(this._bgRender.getComponent("a_basebg"));

            this.addChild(this._bottomRender.getComponent("a_rolebg"));
            this.addChild(this._bottomRender.getComponent("a_win_tittle"));
            this.addChild(this._bottomRender.getComponent("a_right_bg_top"));
            this.addChild(this._bottomRender.getComponent("a_right_bg_bottom"));

            this.addChild(this._bottomRender.getComponent("a_shuxing_label1"));
            this.addChild(this._bottomRender.getComponent("a_add_label2"));
            this.a_zhuangbei_ing = this.addChild(this._bottomRender.getComponent("a_zhuangbei_ing"));
            this.addChild(this._bottomRender.getComponent("a_zhanli_label"));
            this.a_zhanli_numAry = new Array
            for (var i = 0; i < 5; i++) {
                this.a_zhanli_numAry.push(<FrameCompenent>this.addChild(this._topRender.getComponent("a_zhanli_num" + i)));
            }

            this.a_tujian_icon = this.addEvntButUp("a_tujian_icon", this._bottomRender)


            this.addChild(this._bottomRender.getComponent("a_right_center_line"));

            this.addChild(this._bottomRender.getComponent("a_left_labe3"));

            this.a_select_name = this.addChild(this._topRender.getComponent("a_select_name"));



            this.a_left_list_pos = this.addChild(this._bottomRender.getComponent("a_left_list_pos"));

            this.a_big_but_bg = this.addEvntButUp("a_big_but_bg", this._bottomRender);
            this._btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.a_big_but_bg.x + this.a_big_but_bg.width, this.a_big_but_bg.y));

            this.a_big_but_txt = this.addChild(this._bottomRender.getComponent("a_big_but_txt"));

            this.a_res_need_num = this.addChild(this._bottomRender.getComponent("a_res_need_num"));
            this.a_res_need_icon = this.addChild(this._bottomRender.getComponent("a_res_need_icon"));



            this.a_valueItem = new Array
            this.a_upItem = new Array
            for (var i: number = 0; i < 5; i++) {
                this.a_valueItem.push(this.addChild(this._topRender.getComponent("a_value_txt" + i)))
                this.a_upItem.push(this.addChild(this._topRender.getComponent("a_value_up" + i)))
            }


            this.mountRoleSprite = new Person2DChar();
            // this.mountRoleSprite.needUIUrl = false;
            this._bottomRender.addModel(this.mountRoleSprite);


            this.initRightBg()
            this.initList()
            this.uiAtlasComplet = true;
            this.applyLoadComplete();

        }

        private _scale: number;
        private _posy: number;
        private resizeRole(): void {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = this._scale * UIData.Scale;
                this.mountRoleSprite.rotationY = 0
                this.mountRoleSprite.y = this._posy * UIData.Scale;

            }
        }
        private mountRoleSprite: Person2DChar;

        private a_valueItem: Array<UICompenent>
        private a_upItem: Array<UICompenent>


        private exteriorList: ExteriorList
        private initList(): void {
            this.exteriorList = new ExteriorList;
            this.exteriorList.init(this._midRender.uiAtlas)

        }

        private initRightBg(): void {


            var cnew_bg_yellow = this.addChild(this.winmidRender.getComponent("cnew_bg_yellow"));
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._midRender);


            var cnew_bg_yellow = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_rightbg_yellow", this._midRender);

            var cnew_right_bg_top: UICompenent = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "a_right_bg_top", this._midRender);
            var cnew_right_bg_bottom: UICompenent = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "a_right_bg_bottom", this._midRender);

            this._scale = 4
            this._posy = -100;
            this.winmidRender.applyObjData();
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.exteriorList.show();
            this.selectTabType(0)
        }
        private tabIndex: number = 0
        private selectTabType(value: number): void {


            this.tabIndex = value
            if (this.tabIndex == 0) {
                this.a_tab0.selected = true
                this.a_tab1.selected = false
            } else {
                this.a_tab0.selected = false
                this.a_tab1.selected = true
            }
            this.refrish();
        }
        public hide(): void {
            this.exteriorList.hide();
            UIManager.getInstance().removeUIContainer(this);
            super.hide();
        }
        public resize(): void {
            super.resize();
            if (this.exteriorList) {
                this.exteriorList.left = this.a_left_list_pos.parent.x / UIData.Scale + this.a_left_list_pos.x;
                this.exteriorList.top = this.a_left_list_pos.parent.y / UIData.Scale + this.a_left_list_pos.y;
            }
            this.resizeRole()
        }
        private selectExteriorCellVo: ExteriorCellVo
        public selectCell($vo: ExteriorCellVo): void {
            this.selectExteriorCellVo = $vo;
            var $valueItem: Array<number> = new Array
            for (var i: number = 0; i < this.selectExteriorCellVo.tb.attrKeys.length; i++) {
                //  
                var $attrNum: number = this.selectExteriorCellVo.tb.attrValues[i];
                var $attrKey: number = this.selectExteriorCellVo.tb.attrKeys[i]
                var $pNum: number = GuidData.player.getPropById($attrKey);
                $valueItem.push(Math.ceil($pNum * $attrNum / 100))
                //   console.log($attrNum, $attrKey, $pNum, Math.ceil($pNum * $attrNum / 100))
                UiDraw.drawAttVal(this.a_valueItem[i], $attrKey, Math.ceil($pNum * $attrNum / 100));
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_upItem[i].skinName, ColorType.Green20a200 + "增加" + $attrNum + "%", 14, TextAlign.LEFT);
            }


            for (var i = 0; i < 5; i++) {
                var selx: number = this.selectExteriorCellVo.tb.level > i ? 0 : 1;
                this.a_zhanli_numAry[i].goToAndStop(selx);
            }
            // ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, this.a_zhanli_num.skinName, String(getForceByAtt(this.selectExteriorCellVo.tb.attrKeys, $valueItem)), ArtFont.num56, 3)

            this.mountRoleSprite.showAvatarVisibel = (this.tabIndex == 0)
            if (this.tabIndex == 0) { //衣服
                this.mountRoleSprite.setAvatar(this.selectExteriorCellVo.tb.avatar);
                this.mountRoleSprite.setWeapon(0);
                this._posy = -100;
            } else { //武器
                this.mountRoleSprite.setAvatar(6302);
                // if (this.selectExteriorCellVo.tb.id == 12) {
                //     this.mountRoleSprite.setBaseRoleWeapon(14);
                // } else {
                this.mountRoleSprite.setBaseRoleWeapon(this.selectExteriorCellVo.tb.id);
                // }
                this._posy = -50;
            }
            this.setUiListVisibleByItem([this.a_zhuangbei_ing], this.selectExteriorCellVo.isUse);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_select_name.skinName, ColorType.colorfef3d7 + this.getSelectTbname(), 16, TextAlign.LEFT)
            this.drawUseRes();
            if ($vo.node.show) {
                this._btnRedPoint.preShow();
            } else {
                this._btnRedPoint.preHide();
            }
            this.resize();
        }
        private kkkb: boolean = true
        private getSelectTbname(): string {
            var $strName: string = ""
            for (var i: number = 0; i < this.selectExteriorCellVo.tb.name.length; i++) {
                $strName += this.selectExteriorCellVo.tb.name.substr(i, 1)
                $strName += "\n";
            }
            if (this.selectExteriorCellVo.tb.name.length < 4) {
                $strName = "\n" + $strName;
            }
            return $strName
        }
        private drawUseRes(): void {

            var $butTxt: string
            this.setUiListVisibleByItem([this.a_res_need_icon, this.a_res_need_num], false)
            if (this.selectExteriorCellVo.isUse) {
                $butTxt = "取消装备";

            } else {
                if (this.selectExteriorCellVo.isHave) {
                    $butTxt = "装备";
                } else {
                    var $id: number = this.selectExteriorCellVo.tb.costs[0][0];
                    var $needNum: number = this.selectExteriorCellVo.tb.costs[0][1];
                    var $resColor: string = hasEnoughResItem([$id, $needNum]) ? ColorType.Brown623424 : ColorType.Redd92200

                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_res_need_num.skinName, $resColor + + GuidData.bag.getItemCount($id) + "/" + $needNum, 16)
                    IconManager.getInstance().drawItemIcon60(this.a_res_need_icon, $id, 1);
                    this.setUiListVisibleByItem([this.a_res_need_icon, this.a_res_need_num], true)
                    $butTxt = "激活";
                }
            }


            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_big_but_txt.skinName, ColorType.Brown623424 + $butTxt, 16)

        }
        private bigButClik(): void {
            if (this.selectExteriorCellVo.isUse) {
                NetManager.getInstance().protocolos.cancel_equip_appearance(this.tabIndex == 1 ? 0 : 1);
                console.log("取消", this.tabIndex);

            } else {
                if (this.selectExteriorCellVo.isHave) {
                    NetManager.getInstance().protocolos.equip_appearance(this.selectExteriorCellVo.tb.id);
                    console.log("装备", this.selectExteriorCellVo.tb.id);
                } else {
                    var $id: number = this.selectExteriorCellVo.tb.costs[0][0];
                    var $needNum: number = this.selectExteriorCellVo.tb.costs[0][1];

                    if (GuidData.bag.hasItem($id, $needNum)) {
                        NetManager.getInstance().protocolos.active_appearance(this.selectExteriorCellVo.tb.id);
                        console.log("收集", this.selectExteriorCellVo.tb.id);
                    } else {
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = $id
                        ModuleEventManager.dispatchEvent($aaa);
                        // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99)
                    }

                }
            }
        }
        public refrish(): void {
            if (this.uiAtlasComplet) {
                var $arr: Array<number>;//外观数组
                var nodeList: Array<RedPointNode>;
                console.log("---当前tab页签---", this.tabIndex);
                if (this.tabIndex == 0) {
                    $arr = tb.TB_char_info.getTempVo(GuidData.player.getCharType()).waiguan;
                    nodeList = RedPointManager.getInstance().getNodeByID(22).children;
                } else {
                    $arr = tb.TB_char_info.getTempVo(GuidData.player.getCharType()).weaponwg;
                    nodeList = RedPointManager.getInstance().getNodeByID(25).children;
                }
                var $hasIdArr: Array<number> = GuidData.grow.getSpellIntFieldAppearanceId();
                var $tbDataArr: Array<SListItemData> = new Array();
                var $selectIndex: number = 0;
                for (var i: number = 0; i < $arr.length; i++) {
                    var $exteriorCellVo: ExteriorCellVo = new ExteriorCellVo()
                    $exteriorCellVo.tb = tb.TB_appearance_info.getTempVo($arr[i])
                    for (var j: number = 0; j < $hasIdArr.length; j++) {
                        if ($hasIdArr[j] == $exteriorCellVo.tb.id) {
                            $exteriorCellVo.isHave = true
                        }
                    }
                    if ($exteriorCellVo.tb.id == GuidData.player.getPlayerIntFieldAppearance(0) || $exteriorCellVo.tb.id == GuidData.player.getPlayerIntFieldAppearance(1)) {
                        $exteriorCellVo.isUse = true;
                    }
                    //组装数据
                    $exteriorCellVo.node = nodeList[i];
                    var $vo: SListItemData = new SListItemData();
                    $vo.id = i;
                    $vo.data = $exteriorCellVo;
                    //特定序列
                    if (this.selectExteriorCellVo) {
                        if (this.selectExteriorCellVo.tb.id == $exteriorCellVo.tb.id) {
                            $selectIndex = $tbDataArr.length
                            this.selectCell($exteriorCellVo);
                        }
                    }
                    //将数据装入数组
                    $tbDataArr.push($vo);
                }
                this.exteriorList.refreshData($tbDataArr);
                this.exteriorList.setSelectIndex($selectIndex)




                // SharedDef.PLAYER_FIELD_MAX_HEALTH

            }
        }
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.w_close:
                    this.hide()
                    break
                case this.a_tab0:
                    this.selectTabType(0)
                    break
                case this.a_tab1:
                    this.selectTabType(1)
                    break
                case this.a_big_but_bg:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this.bigButClik()
                    break
                case this.a_tujian_icon:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    ModuleEventManager.dispatchEvent(new ExteriorEvent(ExteriorEvent.SHOW_IDENTIFICATION_EVENT))
                    break
                default:
                    break;
            }
        }







    }
}