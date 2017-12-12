module msgtip {
    export class MsgTipEvent extends BaseEvent {
        public static SHOW_MSG_PIC_DATA: string = "SHOW_MSG_PIC_DATA";
        public static SHOW_EFFECTS_DATA: string = "SHOW_EFFECTS_DATA";

        public static SHOW_SKILL_TIP_DATA: string = "SHOW_SKILL_TIP_DATA";
        public static SHOW_EQU_MOVE_DATA: string = "SHOW_EQU_MOVE_DATA";
        public static SHOW_SMSG_ITEM_NOTICE: string = "SHOW_SMSG_ITEM_NOTICE";

        public static OPEN_SKILL_SLOT: string = "OPEN_SKILL_SLOT";

        public static SHOW_GUIDE_POP_VIEW = "SHOW_GUIDE_POP_VIEW";
        public static SHOW_PAGE_POP_VIEW = "SHOW_PAGE_POP_VIEW";

        public data: any

    }
    export class MsgTipModule extends Module {
        public getModuleName(): string {
            return "MsgTipModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MsgTipProcessor()];
        }
    }

    export class MsgTipProcessor extends BaseProcessor {
        public getName(): string {
            return "MsgTipProcessor";
        }
        private nextCanShowOpenSysTM: number = 0
        protected receivedModuleEvent($event: BaseEvent): void {
            if (GuidData.map) {
                if (Scene_data.isPanGm) {
                    //   return
                }

                if ($event instanceof MsgTipEvent) {
                    var $MsgTipEvent: MsgTipEvent = <MsgTipEvent>$event;
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_MSG_PIC_DATA) {
                        this.showMsgTopCenterPic($MsgTipEvent.data);
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_EFFECTS_DATA) {
                        this.showEffectsMove($MsgTipEvent.data);
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_SKILL_TIP_DATA) {
                        this.showSkillTip(Number($MsgTipEvent.data));
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_EQU_MOVE_DATA) {
                        this.showEquMoveTip(Number($MsgTipEvent.data));
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_SMSG_ITEM_NOTICE) {
                        this.showSmsgItemNotice($MsgTipEvent.data);
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.OPEN_SKILL_SLOT) {
                        this.showOpenSkill(<SkillUintVo>$MsgTipEvent.data);
                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_GUIDE_POP_VIEW) {
                        // Scene_data.isPanGm
                        if (GuidData.map && SceneManager.getInstance().render) {
                            GuideModel.getInstance().showMainUIGuidePopView()  //主UI引导
                        }

                    }
                    if ($MsgTipEvent.type == MsgTipEvent.SHOW_PAGE_POP_VIEW) {
                        GuideModel.getInstance().showModuleOptionalPage($MsgTipEvent.data);
                        if (GuidData.player.needGuididPop) {
                            GuideModel.getInstance().showModuleGuidePage($MsgTipEvent.data);
                        }
                    }
                }
                if ($event instanceof EngineEvent) {
                    var $engineEvent: EngineEvent = <EngineEvent>$event;
                    if ($engineEvent.type == EngineEvent.PLAYER_FIELD_FORCE) {
                        if (GuidData.player.lastForceNum != GuidData.player.getForce() && GuidData.player.lastForceNum > 0) {
                            this.showMsgZhanliPanel();
                        }
                        GuidData.player.lastForceNum = GuidData.player.getForce()
                    }
                    if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                        this.playerFieldLevel()
                    }
                    this.nextCanShowOpenSysTM = TimeUtil.getTimer() + 1000
                }
            }
        }
        private showOpenSkill($vo: SkillUintVo): void {
            var $tb: tb.TB_system_icon = new tb.TB_system_icon({ list: [], bindactive: [] });
            $tb.id = $vo.id;
            $tb.move = 1;
            $tb.position = 99;
            $tb.index = $vo.slot;
            $tb.text = tb.TB_skill_base.get_TB_skill_base($vo.id).name;

            console.log($tb)
            console.log($vo)
            this.showSystemOpenPanel($tb);
        }
        private playerFieldLevel(): void {
            var $obj: msgtip.MsgPicData = new msgtip.MsgPicData
            $obj.type = 1; //升级
            $obj.info = GuidData.player.getLevel();
            var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_MSG_PIC_DATA)
            $MsgTipEvent.data = $obj;
            ModuleEventManager.dispatchEvent($MsgTipEvent);;
        }
        private _msgZhanliPanel: MsgZhanliPanel;
        private showMsgZhanliPanel(): void {

            var $temp: Vector2D = new Vector2D(GuidData.player.lastForceNum, GuidData.player.getForce())
            if (!this._msgZhanliPanel) {
                this._msgZhanliPanel = new MsgZhanliPanel();
            }
            this._msgZhanliPanel.load(() => {
                this._msgZhanliPanel.setData($temp);
                UIManager.getInstance().addUIContainer(this._msgZhanliPanel);
            }, false)
        }

        private _systemOpenPanel: SystemOpenPanel;
        private showSystemOpenPanel($tb: tb.TB_system_icon): void {

            if (GuidData.map && SceneManager.getInstance().render) {
                var $ktim: number = this.nextCanShowOpenSysTM - TimeUtil.getTimer()
                ModuleEventManager.dispatchEvent(new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.HIDE_BIEGUIDE_EVENT));


                TimeUtil.addTimeOut($ktim, () => {
                    //  MainCharControlModel.getInstance().sendStop()
                    if (SceneManager.getInstance().render) {
                        ModuleEventManager.dispatchEvent(new dialog.DialogueEvent(dialog.DialogueEvent.HIDE_DIALOGUE_PANEL));//
                        ModuleEventManager.dispatchEvent(new Chat.ChatEvent(Chat.ChatEvent.HIDE_CHAT_EVENT));//
                    } else {
                        UIManager.getInstance().removeAll();
                        ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));//
                    }
                    if (!this._systemOpenPanel) {
                        this._systemOpenPanel = new SystemOpenPanel();
                    }
                    this._systemOpenPanel.load(() => {
                        this._systemOpenPanel.setData($tb);
                        UIManager.getInstance().addUIContainer(this._systemOpenPanel);
                    }, false)

                });
            } else {
                GuidData.player.resetSystemItem()
            }

        }
        private showSmsgItemNotice($vo: s2c_item_notice): void {
            console.log("---$vo---",$vo);
            for (var i: number = 0; i < $vo.list.length; i++) {
                var $item_reward_info: item_reward_info = $vo.list[i]
                //如果是获得境界经验，则特殊处理
                if($item_reward_info.item_id == 107){
                    var $evt = new stateup.StateUpEvent(stateup.StateUpEvent.SHOW_EFFECT_PANEL);
                    $evt.data = $item_reward_info;
                    ModuleEventManager.dispatchEvent($evt);
                    continue;
                }
                var $temp: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($item_reward_info.item_id)
                if ($temp.money_type > 0) { //资源
                    for (var i: number = 0; i < Math.min($item_reward_info.num, 20); i++) {
                        this.showEffectsMovetoBg($vo.showType, $temp.money_type - 1);
                    }
                } else {
                    msgtip.MsgEquMoveToBag.show($temp.id);
                }
            }
        }
        private showEquMoveTip($id: number): void {
            msgtip.MsgEquMoveToBag.show($id);
        }
        private showSkillTip($id: number): void {
            msgtip.MsgSkillTipPanel.show($id);
        }
        //大类 panelType,moneyType
        private showEffectsMovetoBg($panelType: number, $moneyType: number): void {
            //panelType==1为左任务
            var $data: msgtip.MsgEffectsMoveData = new msgtip.MsgEffectsMoveData()
            var $pos: Vector2D = new Vector2D(UIData.designWidth / 2, UIData.designHeight / 2)
            switch ($panelType) {
                case 1:
                    $pos = UiTweenVo.getPosByPanel(new Vector2D(50, 150), { width: UIData.designWidth, height: UIData.designHeight, left: 0, middle: 0 })
                    break;
                default:
                    break;
            }
            $data.startTM = TimeUtil.getTimer() + random(200)
            $data.endTM = $data.startTM + 500;
            $data.pos = $pos;
            $data.bezierPos = new Vector2D($pos.x + Math.random() * 400 - 200, $pos.y + Math.random() * 400 - 200);
            var $toPos: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(277, 476), { width: UIData.designWidth, height: UIData.designHeight, center: 0, bottom: 0 })
            switch ($moneyType) {
                case 2:
                    $toPos = UiTweenVo.getPosByPanel(new Vector2D(617, 478), { width: UIData.designWidth, height: UIData.designHeight, center: 0, bottom: 0 })
                    break;
                default:
                    break;
            }

            $data.toPos = $toPos
            $data.MONEY_TYPE = $moneyType //SharedDef.MONEY_TYPE_SILVER
            var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_EFFECTS_DATA)
            $MsgTipEvent.data = $data;
            ModuleEventManager.dispatchEvent($MsgTipEvent);
        }

        private showMsgTopCenterPic($obj: MsgPicData): void {
            MsgTopCenterPic.show($obj);
        }
        private showEffectsMove($obj: MsgEffectsMoveData): void {
            MsgEffectsManager.getInstance().setPopMsgVo($obj);
        }

        public smsgAtiribute($byte: ByteArray): void {
            var $len: number = $byte.readUint16();
            var $arr: Array<Vector2D> = new Array
            for (var i: number = 0; i < $len; i++) {
                var $id: number = $byte.readUint16();
                var $num: number = $byte.readDouble();
                $arr.push(new Vector2D($id, $num))
            }
            if ($arr.length) {
                this.showMsgZhanliInfoPanel($arr)
            }
        }
        private _msgZhanliInfoPanel: MsgZhanliInfoPanel;
        private showMsgZhanliInfoPanel($arr: Array<Vector2D>): void {
            /*
            if (SceneManager.getInstance().render) {
                if (!this._msgZhanliInfoPanel) {
                    this._msgZhanliInfoPanel = new MsgZhanliInfoPanel();
                }
                this._msgZhanliInfoPanel.load(() => {
                    this._msgZhanliInfoPanel.setData($arr);
                    UIManager.getInstance().addUIContainer(this._msgZhanliInfoPanel);
                }, false)
            }

            */
            var $size: number = 28 * UIData.Scale
            for (var i: number = 0; i < $arr.length; i++) {
                var v2d: Vector2D = new Vector2D((Scene_data.stageWidth / 3), (Scene_data.stageHeight / 2));

                var showvalue: number = Math.floor($arr[i].y / 100);
                var $str: string = ColorType.Green20a200 + getKeyProById($arr[i].x)
                $str += showvalue > 0 ? "+" + showvalue : showvalue;
                var $colorstr: string = $arr[i].y > 0 ? ColorType.Green56da35 : ColorType.Redd92200;

                //    msgtip.MsgTipManager.outStr($colorstr + $str, msgtip.PopMsgVo.type7, v2d);
                //   v2d.y +=(i % 2)*30*UIData.Scale
                this.showZhanliTip($colorstr + $str, msgtip.PopMsgVo.type7, v2d)

            }

        }
        private zhanliNearTime: number = 0

        private showZhanliTip($str: string, $type: number, $v2d: Vector2D): void {
            var t: number = 0;
            if (this.zhanliNearTime >= TimeUtil.getTimer()) {
                t = (this.zhanliNearTime - TimeUtil.getTimer()) + 500;
                t = Math.max(t, 500)
            }
            this.zhanliNearTime = TimeUtil.getTimer() + t;
            TimeUtil.addTimeOut(t, () => {
                msgtip.MsgTipManager.outStr($str, $type, $v2d);
            });

        }
        public smsgModuleActiv($byte: ByteArray): void {

            var $systemPanelId: number = $byte.readUint32();
            var $tb_system_base: tb.TB_system_base = tb.TB_system_base.getTempVo($systemPanelId);
            if ($tb_system_base.show) {
                var $baseId: number = Math.floor($tb_system_base.id / 10)
                var $tb_system_icon: tb.TB_system_icon = tb.TB_system_icon.getTempVo($baseId);
                if ($tb_system_icon.move) {
                    switch ($tb_system_icon.id) {
                        /*
                        case 202://神兵;
                            this.showActivityTittle(tb.TB_system_preview.getTempVo(1))
                            break
                        case 210: //坐骑;
                            this.showActivityTittle(tb.TB_system_preview.getTempVo(2))
                            break
                            */
                        default:
                            this.showSystemOpenPanel($tb_system_icon);
                            break
                    }
                } else {
                    if (GuidData.player) {
                        GuidData.player.resetSystemItem();
                        ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.REFRESH_MAINUI_PANEL));
                    }
                }
            }

        }
        // private showActivityTittle($tb: tb.TB_system_preview): void {
        //     var a: vec3DshowVo = new vec3DshowVo();
        //     a.info = $tb.p_info;
        //     a.name = $tb.p_name;
        //     a.type = $tb.type;
        //     a.id = $tb.id;
        //     if ($tb.p_model[0].length > 1) {
        //         if (GuidData.player.getCharType() == 1) {
        //             a.modelid = $tb.p_model[0][0];
        //         } else {
        //             a.modelid = $tb.p_model[0][1];
        //         }
        //     } else {
        //         a.modelid = $tb.p_model[0][0];
        //     }
        //     a.state = 0;
        //     Vec3DshowPanel.getInstance().show(a);

        // }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MsgTipEvent(MsgTipEvent.SHOW_MSG_PIC_DATA),
                new MsgTipEvent(MsgTipEvent.SHOW_EFFECTS_DATA),
                new MsgTipEvent(MsgTipEvent.SHOW_SKILL_TIP_DATA),
                new MsgTipEvent(MsgTipEvent.SHOW_EQU_MOVE_DATA),
                new MsgTipEvent(MsgTipEvent.SHOW_SMSG_ITEM_NOTICE),
                new MsgTipEvent(MsgTipEvent.OPEN_SKILL_SLOT),

                new MsgTipEvent(MsgTipEvent.SHOW_GUIDE_POP_VIEW),
                new MsgTipEvent(MsgTipEvent.SHOW_PAGE_POP_VIEW),


                new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
            ];
        }
        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_ATTRIBUTE_CHANGED] = ($byte: ByteArray) => { this.smsgAtiribute($byte) };
            obj[Protocols.SMSG_MODULE_ACTIVE] = ($byte: ByteArray) => { this.smsgModuleActiv($byte) };
            return obj;
        }


    }

}
