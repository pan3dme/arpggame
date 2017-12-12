module kuafu {

    export class KuafuModule extends Module {
        public getModuleName(): string {
            return "KuafuModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new KuaFuProcessor(),
            // new XianfuProcessor(),
            // new KuaFu3v3PkProcessor(),
            new KuaFu1v1Processor(),
                // new DJPopProcessor(),
                // new KuafuPopProcessor()
            ];
        }
    }
    export class KuaFuEvent extends BaseEvent {
        public static SHOW_KUAFU_PANEL_EVENT: string = "SHOW_KUAFU_PANEL_EVENT";
        public static INSTANCE_INT_FIELD_3V3_TIMES: string = "INSTANCE_INT_FIELD_3V3_TIMES";
        public static INSTANCE_INT_FIELD_3V3_DAY_REWARD: string = "INSTANCE_INT_FIELD_3V3_DAY_REWARD";
        public static KUAFU_1V1_REFRESH: string = "KUAFU_1V1_REFRESH";
        public static KUAFU_SHOW_ARENA_PANEL_EVENT: string = "KUAFU_SHOW_ARENA_PANEL_EVENT";
        public static KUAFU_HIDE_ARENA_PANEL_EVENT: string = "KUAFU_HIDE_ARENA_PANEL_EVENT";
        public static KUAFU_ARENA_QUALIFY_REWARD_EVENT: string = "KUAFU_ARENA_QUALIFY_REWARD_EVENT";
        public static KUAFU_ARENA_QUALIFY_RANK_EVENT: string = "KUAFU_ARENA_QUALIFY_RANK_EVENT";
        public static KUAFU_ARENA_QUALIFY_NUM_EVENT: string = "KUAFU_ARENA_QUALIFY_NUM_EVENT";
        public static FIRSTREWARD_DJ_EVENT: string = "FIRSTREWARD_DJ_EVENT";
        public static SHOW_DJT_RANK: string = "SHOW_DJT_RANK";

        public data: any
        public selTab: any

    }

    export class KuaFuProcessor extends BaseProcessor {

        public getName(): string {
            return "KuaFuProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof KuaFuEvent) {

                var $kuaFuEvent: KuaFuEvent = <KuaFuEvent>$event;
                if ($kuaFuEvent.type == KuaFuEvent.SHOW_KUAFU_PANEL_EVENT) {
                    var $tabId: number = $kuaFuEvent.data
                    //this.showKuaFuPanel($tabId);
                } else if ($kuaFuEvent.type == KuaFuEvent.INSTANCE_INT_FIELD_3V3_TIMES) {
                    // if (this._kuaFuPanel) {
                    //     this._kuaFuPanel.refresh();
                    // }
                } else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_1V1_REFRESH) {
                    // if (this._kuaFuPanel) {
                    //     this._kuaFuPanel.refresh();
                    // }
                    if (this._arenaPanel && this._arenaPanel.hasStage) {
                        this._arenaPanel.djChg();
                    }
                } else if ($kuaFuEvent.type == KuaFuEvent.INSTANCE_INT_FIELD_3V3_DAY_REWARD) {
                    // if (this._kuaFuPanel) {
                    //     this._kuaFuPanel.kuaFuRightPanel.resetRewardIcon();
                    // }
                } else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT) {
                    this.showArenaPanel($kuaFuEvent.data,$kuaFuEvent.selTab);
                } else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_HIDE_ARENA_PANEL_EVENT) {
                    this.hideArenaPanel();
                } else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_ARENA_QUALIFY_REWARD_EVENT || $kuaFuEvent.type == KuaFuEvent.KUAFU_ARENA_QUALIFY_NUM_EVENT) {
                    this.refreshArenaQualifyReward();
                } else if ($kuaFuEvent.type == KuaFuEvent.KUAFU_ARENA_QUALIFY_RANK_EVENT) {
                    this.refreshArenaQualifyRank($kuaFuEvent.data);
                } else if ($kuaFuEvent.type == KuaFuEvent.FIRSTREWARD_DJ_EVENT) {
                    this.djRewardChg();
                } else if ($kuaFuEvent.type == KuaFuEvent.SHOW_DJT_RANK) {
                    this.showRank($kuaFuEvent.data);
                }
            }else if($event.type == EngineEvent.SYSTEM_OPEN_EVENT){
                if (this._arenaPanel){
                    this._arenaPanel.showTab1();
                }
            }

            // if ($event instanceof charbg.CharBgEvent) {
            //     if (this._kuaFuPanel) {
            //         this._kuaFuPanel.refresh();
            //     }
            // }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                // if (panelEvent.panel == this._kuaFuPanel) {
                //     this._kuaFuPanel.dispose();
                //     this._kuaFuPanel = null;
                //     console.log("释放面板 _kuaFuPanel")
                // }
                // if (panelEvent.panel == this._xianfuMatchTimePanel) {
                //     this._xianfuMatchTimePanel.dispose();
                //     this._xianfuMatchTimePanel = null;
                //     console.log("释放面板 _xianfuMatchTimePanel")
                // }
                // if (panelEvent.panel == this._kuaFuMatchTimePanel) {
                //     this._kuaFuMatchTimePanel.dispose();
                //     this._kuaFuMatchTimePanel = null;
                //     console.log("释放面板 _kuaFuMatchTimePanel")
                // }
                // if (panelEvent.panel == this._kuaFuMatchListPanel) {
                //     this._kuaFuMatchListPanel.dispose();
                //     this._kuaFuMatchListPanel = null;
                //     console.log("释放面板 _kuaFuMatchListPanel")
                // }
            }
        }

        private _rankPanle: WindowRankPanel;
        public showRank($data: any): void {
            if (!this._rankPanle) {
                this._rankPanle = new WindowRankPanel();
            }
            var list: Array<WindowRankVo> = new Array;
            for (var i: number = 0; i < $data.list.length; i++) {
                var $guidObject: GuidObject = $data.list[i];

                var $obj: WindowRankVo = new WindowRankVo();
                var $name = $guidObject.GetStr(SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_PLAYER_NAME)

                if ($name) {
                    $obj.rank = String($guidObject.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_RANKING));
                    $obj.val = String($guidObject.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_FORCE));
                    $obj.name = getBaseName($name);
                    list.push($obj);
                }
            }

            var myStr: string;
            if ($data.self > 0) {
                myStr = "我的排名：" + $data.self;
            } else {
                myStr = "我的排名：未上榜";
            }

            this._rankPanle.load(() => {
                this._rankPanle.show(["排名", "玩家名字", "战力"], list, myStr);
            })
        }

        // private _kuaFuMatchListPanel: KuaFu3v3MatchListPanel;  //对战人员列表
        // private showKuaFuList(): void {
        //     if (!this._kuaFuMatchListPanel) {
        //         this._kuaFuMatchListPanel = new KuaFu3v3MatchListPanel();
        //     }
        //     this._kuaFuMatchListPanel.load(() => {
        //         this._kuaFuMatchListPanel.show();
        //     })
        // }

        // private _kuaFuPanel: KuaFuPanel;  //跨服面板
        // private showKuaFuPanel(value: number): void {
        //     if (!this._kuaFuPanel) {
        //         this._kuaFuPanel = new KuaFuPanel();
        //     }

        //     this._kuaFuPanel.load(() => {
        //         SceneManager.getInstance().render = false;
        //         ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
        //         UIManager.getInstance().addUIContainer(this._kuaFuPanel);
        //         if (value == null) {
        //             value = this._kuaFuPanel.tabId;
        //         }
        //         this._kuaFuPanel.setShowType(value);

        //         var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
        //         $scenePange.data = SharedDef.MODULE_ARENA
        //         ModuleEventManager.dispatchEvent($scenePange);
        //     })

        // }
        // private _kuaFuMatchTimePanel: KuaFu3v3MatchTimePanel; //匹配时间
        // private showKuafuMatchPanel(): void {
        //     if (!this._kuaFuMatchTimePanel) {
        //         this._kuaFuMatchTimePanel = new KuaFu3v3MatchTimePanel();
        //     }
        //     this._kuaFuMatchTimePanel.load(() => {
        //         this._kuaFuMatchTimePanel.show();
        //     }, false)
        // }

        // private _xianfuMatchTimePanel: XianfuMatchTimePanel; //匹配时间
        // private showXianfuMatchTimePanel(): void {
        //     if (!this._xianfuMatchTimePanel) {
        //         this._xianfuMatchTimePanel = new XianfuMatchTimePanel();
        //     }
        //     this._xianfuMatchTimePanel.load(() => {
        //         this._xianfuMatchTimePanel.show();
        //     }, false)
        // }

        private _arenaPanel: ArenaPanel;
        private showArenaPanel($data:any,$seltab: any): void {
            if (!this._arenaPanel) {
                this._arenaPanel = new ArenaPanel();
            }
            this._arenaPanel.load(() => {
                SceneManager.getInstance().render = false;
                var evt: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
                ModuleEventManager.dispatchEvent(evt);


                if(!$data){
                    $data = [1,4]
                }else{
                    if(!($data instanceof Array)){
                        $data = [$data];  
                    }
                }

                if(!$seltab){
                    $seltab = $data[0]
                }else{
                    if($seltab instanceof Array){
                        $seltab = $seltab[0]
                    }
                }

                this._arenaPanel.show($data,$seltab);
            })
        }

        private hideArenaPanel(): void {
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.hide();
            }
        }

        private djRewardChg(): void {
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.djRewardChg();
            }
        }

        private refreshArenaQualifyReward(): void {
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.qualifyDataChg();
            }
        }

        private refreshArenaQualifyRank($rank: number): void {
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.qualifyRankChg($rank);
            }
        }

        public msgWorldWarScPlayerInfo($byte: ByteArray): void {
            KuaFu3v3Model.getInstance().worldWarByte = new ByteArray($byte.buffer.slice($byte.position, $byte.length));
            KuaFu3v3Model.getInstance().worldWarByte.endian = Endian.LITTLE_ENDIAN;
        }

        // //跨服匹配等待数据
        // public smsgKuafu3V3WaitInfo($byte: ByteArray): void {
        //     var $vo: s2c_kuafu_3v3_wait_info = new s2c_kuafu_3v3_wait_info();
        //     s2c_kuafu_3v3_wait_info.read($vo, $byte);
        //     KuaFu3v3Model.getInstance().wait_info_vo = $vo;

        //     this.showKuaFuList();
        //     if (this._kuaFuMatchTimePanel) {
        //         this._kuaFuMatchTimePanel.hide();
        //     }
        // }

        // public cmsKuafu3V3MatchOpen($byte: ByteArray): void {
        //     console.log("匹配到人&接受或者拒绝");
        // }
        // public smsgKuafuMathchStart($byte: ByteArray): void {
        //     console.log("开始匹配");
        //     var matchType: number = $byte.readByte();
        //     if (matchType == SharedDef.KUAFU_TYPE_FENGLIUZHEN) {
        //         this.showKuafuMatchPanel();
        //     }
        //     if (matchType == SharedDef.KUAFU_TYPE_XIANFU) {
        //         this.showXianfuMatchTimePanel();
        //     }
        // }
        // private msgKuaFu3V3CancelMatch($byte: ByteArray): void {
        //     if (this._kuaFuMatchTimePanel) {
        //         this._kuaFuMatchTimePanel.hide();
        //     }
        //     if (this._xianfuMatchTimePanel) {
        //         this._xianfuMatchTimePanel.hide();
        //     }
        // }
        // private smsgKuafu3V3DeclineMath($byte: ByteArray): void {
        //     AlertUtil.show("有人拒绝了比赛", "提示", (a: any) => {
        //         if (a == 1) {
        //             NetManager.getInstance().protocolos.kuafu_3v3_match();
        //         }
        //     })
        //     if (this._kuaFuMatchListPanel) {
        //         this._kuaFuMatchListPanel.hide();
        //     }

        // }

        // public smsgKuafu3V3RankList($byte: ByteArray): void {
        //     if (this._kuaFuPanel) {
        //         this._kuaFuPanel.setBangData($byte.readUTF())
        //     }
        // }
        // public smsgKuafu3V3MyRank($byte: ByteArray): void {

        //     var rank: number = $byte.readByte()
        //     console.log("当前排名：" + rank);
        //     if (this._kuaFuPanel) {
        //         this._kuaFuPanel.setSelfBangData(rank)
        //     }
        // }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new KuaFuEvent(KuaFuEvent.SHOW_KUAFU_PANEL_EVENT),
                new KuaFuEvent(KuaFuEvent.INSTANCE_INT_FIELD_3V3_TIMES),
                new KuaFuEvent(KuaFuEvent.INSTANCE_INT_FIELD_3V3_DAY_REWARD),
                new KuaFuEvent(KuaFuEvent.KUAFU_1V1_REFRESH),
                new KuaFuEvent(KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT),
                new KuaFuEvent(KuaFuEvent.KUAFU_HIDE_ARENA_PANEL_EVENT),
                new KuaFuEvent(KuaFuEvent.KUAFU_ARENA_QUALIFY_REWARD_EVENT),
                new KuaFuEvent(KuaFuEvent.KUAFU_ARENA_QUALIFY_RANK_EVENT),
                new KuaFuEvent(KuaFuEvent.KUAFU_ARENA_QUALIFY_NUM_EVENT),
                new KuaFuEvent(KuaFuEvent.FIRSTREWARD_DJ_EVENT),
                new KuaFuEvent(KuaFuEvent.SHOW_DJT_RANK),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),

                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

        public smsgKuafuXianfuMathchWait($byte: ByteArray): void {

            var $vo: s2c_kuafu_match_wait = new s2c_kuafu_match_wait();
            s2c_kuafu_match_wait.read($vo, $byte);
            // if (this._xianfuMatchTimePanel) {
            //     this._xianfuMatchTimePanel.setVo($vo)
            // }
            console.log($vo)

            var $evtt = new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SHOW_WAITJOIN_PANEL);
            $evtt.data = $vo;
            ModuleEventManager.dispatchEvent($evtt);

        }
        private msgDoujiantaiGetEnemysInfo($byte: ByteArray): void {
            this.readRankByte($byte, false)
        }
        private msgDouJianTaiTop3($byte: ByteArray): void {
            this.readRankByte($byte, true)
        }
        private readRankByte($byte: ByteArray, $top3: boolean): void {

            var $arr: Array<KuaFu1v1BangData> = new Array
            var len: number = $byte.readShort()
            for (var i: number = 0; i < len; i++) {
                var $vo: KuaFu1v1BangData = new KuaFu1v1BangData()
                $vo.postion = $byte.readByte()  //位置
                $vo.rank = $byte.readUint16()
                $vo.name = $byte.readUTF()
                $vo.gender = $byte.readByte()
                $vo.level = $byte.readUint16()
                $vo.weapon = $byte.readUint32()
                $vo.avatar = $byte.readUint32()
                $vo.divine = $byte.readUint32()
                $vo.force = $byte.readDouble()
                $vo.pass = $top3;
                console.log($vo)
                $arr.push($vo)
            }
            // if (this._kuaFuPanel) {
            //     this._kuaFuPanel.kuafu1v1Panel.set1V1rankData($arr)
            // }
            if (this._arenaPanel && this._arenaPanel.hasStage) {
                this._arenaPanel.djData($arr);
            }
        }

        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.MSG_WORLD_WAR_SC_PLAYER_INFO] = ($byte: ByteArray) => { this.msgWorldWarScPlayerInfo($byte) };

            // obj[Protocols.SMSG_KUAFU_3V3_WAIT_INFO] = ($byte: ByteArray) => { this.smsgKuafu3V3WaitInfo($byte) };
            // obj[Protocols.SMSG_KUAFU_MATCH_START] = ($byte: ByteArray) => { this.smsgKuafuMathchStart($byte) };
            // obj[Protocols.MSG_KUAFU_3V3_CANCEL_MATCH] = ($byte: ByteArray) => { this.msgKuaFu3V3CancelMatch($byte) };

            // obj[Protocols.CMSG_KUAFU_3V3_MATCH_OPER] = ($byte: ByteArray) => { this.cmsKuafu3V3MatchOpen($byte) };
            // obj[Protocols.SMSG_KUAFU_3V3_DECLINE_MATCH] = ($byte: ByteArray) => { this.smsgKuafu3V3DeclineMath($byte) };

            // obj[Protocols.SMSG_KUAFU_3V3_RANLIST] = ($byte: ByteArray) => { this.smsgKuafu3V3RankList($byte) };
            // obj[Protocols.SMSG_KUAFU_3V3_MYRANK] = ($byte: ByteArray) => { this.smsgKuafu3V3MyRank($byte) };

            obj[Protocols.SMSG_KUAFU_MATCH_WAIT] = ($byte: ByteArray) => { this.smsgKuafuXianfuMathchWait($byte) };

            obj[Protocols.MSG_DOUJIANTAI_GET_ENEMYS_INFO] = ($byte: ByteArray) => { this.msgDoujiantaiGetEnemysInfo($byte) };
            obj[Protocols.MSG_DOUJIANTAI_TOP3] = ($byte: ByteArray) => { this.msgDouJianTaiTop3($byte) };
            return obj;
        }
    }
}