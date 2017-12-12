module Camand {
    export class CammandRender extends ListItemRender {

        public draw(): void {

            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);
            UiDraw.cxtDrawImg(ctx, PuiData.Slist_select, new Rectangle(0, 0, 98, 50), UIData.publicUi);

          //  UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.Slist_select);


            this.drawLable(ctx, 50, 15, this._listItemData.data.txt, 16, "#000000", false);
            this.atlas.updateCtx(ctx, this.uvData.ox, this.uvData.oy);

        }

        private drawLable(ctx: CanvasRenderingContext2D,
            $xpos: number, $ypos: number,
            $str: string, fontsize: number, fontColor: string, bolder: boolean = false): void {

            ctx.textBaseline = TextAlign.TOP;
            ctx.textAlign = TextAlign.CENTER;
            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px" + UIData.font;

            ctx.fillText($str, $xpos, $ypos);
        }


    }


    export class CammandPanel extends UIConatiner {


        private _backRender: UIRenderComponent;
        private _butRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _listRender: UIListRenderComponent;
        public constructor() {
            super();

            //  this.makeBgWinPanel();

            this.width = 600;
            this.height = 400;
            this.center = 0;
            this.middle = 0;

            this._listRender = new UIListRenderComponent;
            this.addRender(this._listRender);

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            this.addList()
        }
        private _bgList: GridList;
        private _bgMask: UIMask;
        private addList(): void {
            var $pos: Vector2D = new Vector2D(30, 20)
            this._bgList = this._listRender.createGridList();
            this._bgList.x = $pos.x;
            this._bgList.y = $pos.y;

            this.addChild(this._bgList);

            this._bgMask = new UIMask();
            this._bgMask.x = $pos.x;
            this._bgMask.y = $pos.y;
            this._bgMask.width = 512;
            this._bgMask.height = 300;
            this.addMask(this._bgMask);

            this._listRender.mask = this._bgMask;

            this.refreshData()

        }
        private refreshData(): void {
            var ary: Array<ListItemData> = new Array;
            var butItem: Array<string> = [
                //"家族模式",
                //"和平模式",
           //     "显示FPS",
                "显示A星",
                "升满级",                

                "新帐号",
                "换服务器",
                "自杀",
                "VIP+1",                
                "重置0",
                "资源清空",
                "资源+10000",
                "加道具",

                "升级+10",
                "升级+1",
                "升级+5",
                //"金币+100",
                // "真气+100",
                //"兽灵+100",
                //"元宝+100",
                //"绑定元宝+100",
                //"精华+100",
                //"兽灵元宝清空",
                
                "完成主线",
                "系统开启",
                "修改发送",
                "世界冒险",
                "重置世界BOSS",
                //"完成技能",
                //"完成神兵",
                //"完成骑乘",
                //"完成坐骑",
                //"完成副本",
                //"完成家族",
                //"完成强化",
                //"完成斗剑台",
                //"测试粒子",
                "回到主城",
                "去1006",
                "家族活动",
                /**
                "全民boss",
                "翅膀",
                "法宝",
                "组队副本",
                
                "坐骑",
                "排位赛",
                "家族技能",
                "强化系统",
                "角色",
                "外观",
                "技能",
                "我要变强",
                "日常任务",
                 */
            ]
            for (var i: number = 0; i < butItem.length; i++) {
                var listItemData: ListItemData = new ListItemData();
                listItemData.data = { txt: butItem[i], id: i };
                listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
                ary.push(listItemData);
            }
            this._bgList.contentY = 0;
            this._bgList.setGridData(ary, CammandRender, 5, 100, 50, 512, 512, 512, 300);

        }
        private itemDataClick($listItemData: ListItemData): void {

            var str: string = $listItemData.data.txt

            
            switch (str) {
                case "世界冒险":
          
                    break;
                case "家族模式":
                    NetManager.getInstance().protocolos.change_battle_mode(SharedDef.FAMILY_MODE);
                    break;
                case "和平模式":
                    NetManager.getInstance().protocolos.change_battle_mode(SharedDef.PEACE_MODE);
                    break;
       
                case "坐骑打开":
                    ModulePageManager.openPanel(SharedDef.MODULE_MOUNT);
                    break;
                case "全民boss":
                    ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.SHOW_SBOSS_PANEL));
                    break;
                case "翅膀":
                    ModuleEventManager.dispatchEvent(new wing.WingEvent(wing.WingEvent.SHOW_WING_PANEL_EVENT));
                    break;
                case "法宝":
                    ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.SHOW_TREASURE_EVENT));
                    break;
                case "组队副本":
                    break;
                case "回到主城":
                    NetManager.getInstance().protocolos.teleport_map(1, 1);
                    // NetManager.getInstance().protocolos.challange_boss();
                    break;
                case "去1006":
                    NetManager.getInstance().protocolos.teleport_map(1008, 1);
                    break;
                case "招募成员":
                    //console.log("guid", GameInstance.mainChar.unit.uintGuid);
                    //NetManager.getInstance().protocolos.clientSubscription(GameInstance.mainChar.unit.uintGuid);
                    //  NetManager.getInstance().protocolos.challange_boss();
                    //   console.log("challange_boss321")

                    var $indexUrl: string = window.location.toString();
                    var $d: number = $indexUrl.indexOf("?");
                    if ($d != -1) {
                        $indexUrl = $indexUrl.substring(0, $d)
                    }
                    var $url: string = $indexUrl + "?inviteGuid=" + GuidData.faction.getGuid();
                    $url = $url.replace("index.html", "login.html");
                    console.log("outUrl", $url)
                    copy2clipboard($url);
                    alert($url)

                    break;
                case "家族场景":

                    NetManager.getInstance().protocolos.back_to_famity();
                    break;
                case "显示FPS":
                    var $fps: any = document.getElementById('FpsTipsCanvas')
                    if ($fps.style["z-index"] == 0) {
                        $fps.style["z-index"] = 2
                    } else {
                        $fps.style["z-index"] = 0
                    }
                    break;
                case "新帐号":
                    window.location.href = "random.html";
                    break;
                case "换服务器":
                    window.location.href = "login.html";
                    break;
                case "升级+1":
                    var tempStr: string = "@Rank " + String(GameInstance.mainChar.unit.getLevel() + 1)
                    GameControlManager.sendGmCom(tempStr)
                    break;
                case "升级+5":
                    var tempStr: string = "@Rank " + String(GameInstance.mainChar.unit.getLevel() + 5)
                    GameControlManager.sendGmCom(tempStr)
                    break;
                case "升级+10":
                    var tempStr: string = "@Rank " + String(GameInstance.mainChar.unit.getLevel() + 10)
                    GameControlManager.sendGmCom(tempStr)
                    break;
                case "升满级":
                    var tempStr: string = "@Rank " + String(199)
                    GameControlManager.sendGmCom(tempStr)
                    break;
                case "系统开启":
                    this.openSystemAll()
                    break;

                case "VIP+1":

                    var tempStr: string = "@VIP " + String(GuidData.player.getVipLevel() + 1)
                    GameControlManager.sendGmCom(tempStr)
                    console.log(tempStr)
                    break;
                case "修改发送":
                    console.log("修改发送", GameInstance.mainChar.unit.uintGuid)
                    NetManager.getInstance().protocolos.clientSubscription(GameInstance.mainChar.unit.uintGuid)
                    break;
                case "进入试练塔":
                    console.log(str)
                    NetManager.getInstance().protocolos.enter_trial_instance();

                    break;
                case "重置0":
                    str = "@重置 0"
                    console.log(str)
                    GameControlManager.sendGmCom(str)
                    break;
                case "重置世界BOSS":

                    var $oDate = new Date(); //实例一个时间对象；

                    console.log($oDate.getHours(), $oDate.getMinutes())

                    var $addnum: number = 1
                    if ($oDate.getSeconds() > 50) {
                        $addnum = 2
                    }
                    $addnum = 2;

                    str = "@世界BOSS " + $oDate.getHours() + " " + ($oDate.getMinutes() + $addnum) + " 1 15"
                    console.log(str)
                    GameControlManager.sendGmCom(str)
                    break;

                // 

                case "自杀":
                    console.log(str)
                    GameControlManager.sendGmCom("@自杀")
                    // GameControlManager.sendGmCom("@制造 103 1000 1")

                    break;
                case "资源清空":

                    console.log(str)
                    GameControlManager.sendGmCom("@Resource -1 0")


                    break;
                    
                case "资源+10000":
                    this.changeMoney(SharedDef.MONEY_TYPE_GOLD_INGOT, 10000000)
                    this.changeMoney(SharedDef.MONEY_TYPE_BIND_GOLD, 10000000)
                    this.changeMoney(SharedDef.MONEY_TYPE_SILVER, 1000000000)
                    break;
                case "加道具":
                    var itemAry:Array<number> = [237,1402,1403,1401,202,203,201,227,224,226,211,212,233,234];
                    for(var i:number = 0;i<itemAry.length;i++){
                        GameControlManager.sendGmCom("@制造 " + itemAry[i] + " 990");
                    }
                    break;
                /*
                case "金币+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_SILVER, 100 + GuidData.player.getSilver())
                    break;
                case "真气+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_QI, 100 + GuidData.player.getQI())
                    break;
                case "兽灵+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_BEAST, 100 + GuidData.player.getBeast())
                    break;
                case "元宝+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_GOLD_INGOT, 100 + GuidData.player.getGoldIngot())
                    break;
                case "绑定元宝+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_BIND_GOLD, 100 + GuidData.player.getBindGold())
                    break;
                case "精华+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_GEM, 100 + GuidData.player.getGem())
                    break;
                case "兽灵元宝清空":
                    this.changeMoney(SharedDef.MONEY_TYPE_BEAST, 0)
                    this.changeMoney(SharedDef.MONEY_TYPE_GOLD_INGOT, 0)
                    */
                    // break;
                case "显示A星":
                    //  ModuleEventManager.dispatchEvent(new Camand.ComandEvent(Camand.ComandEvent.SHOW_ASTAR_LINE));
                    scene2d.SceneAstarModel.getInstance().showAstarLine();
                    break;
                case "完成主线":
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成神兵":
                    GameControlManager.sendGmCom("@制造 201 100 1");
                    GameControlManager.sendGmCom("@选择主线 10123");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成技能":
                    GameControlManager.sendGmCom("@选择主线 10220");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成骑乘":

                    GameControlManager.sendGmCom("@选择主线 10203");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成坐骑":
                    GameControlManager.sendGmCom("@选择主线 10203");
                    GameControlManager.sendGmCom("@完成当前主线");
                    GameControlManager.sendGmCom("@选择主线 10229");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成副本":
                    GameControlManager.sendGmCom("@选择主线 10209");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成强化":
                    GameControlManager.sendGmCom("@选择主线 10217");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成家族":
                    GameControlManager.sendGmCom("@选择主线 10224");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成斗剑台":
                    GameControlManager.sendGmCom("@选择主线 10214");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "家族活动":
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_PANEL_EVENT));
                    break;
                case "坐骑":
                    // ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.SHOW_MOUNT_EVENT));
                    break;
                case "排位赛":
                    ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT));
                    break;
                case "家族技能":
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONSKILL_PANEL_EVENT));
                    break;
                case "强化系统":
                    // ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.SHOW_STRENGTHGEM_PANEL));
                    break;
                case "角色":
                    ModuleEventManager.dispatchEvent(new role.RoleUiEvent(role.RoleUiEvent.SHOW_ROLE_EVENT));
                    break;
                case "测试粒子":
                    // for (var i: number = 0; i < 60; i++) {
                    //     GameInstance.mainChar.addTestWeapon();
                    // }
                    copy2clipboard("dddddddddddddddds****");
                    break;
                case "外观":
                    ModuleEventManager.dispatchEvent(new exterior.ExteriorEvent(exterior.ExteriorEvent.SHOW_EXTERIOR_EVENT));
                    break;
                case "技能":
                    ModuleEventManager.dispatchEvent(new skillUi.SkillUiEvent(skillUi.SkillUiEvent.SHOW_SKILLUI_EVENT));
                    break;
                case "我要变强":
                    ModulePageManager.openPanel(SharedDef.MODULE_STRENGTH);
                    break;
                case "日常任务":
                    ModulePageManager.openPanel(SharedDef.MODULE_DAILY_TASKS);
                    break;
                default:
                    return;
                //break;
            }
            this.sendNextMsg();
            this.hide()

            //"进入等待房间",
            //"挑战BOSS",
        }
        private openSystemAll(): void {



            //@选择主线 10220 技能
            //@选择主线 10123 神兵
            //@选择主线 10229 坐骑
            //@选择主线 10217 强化
            //@选择主线 10203 坐骑获得
            //@选择主线 10224 家族
            //@选择主线 10209 副本
            //@选择主线 10225 每日活动
            //@选择主线 10214 1v1
            //@选择主线 10130 7天登入


            var $arr: Array<number> = new Array
            $arr.push(10220)        //@选择主线 10220 技能
            $arr.push(10123)  //@选择主线 10123 神兵
            $arr.push(10229)  //@选择主线 10229 坐骑
            $arr.push(10217)          //@选择主线 10217 强化
            $arr.push(10203)  //@选择主线 10203 坐骑获得
            $arr.push(10209)            //@选择主线 10209 副本
            $arr.push(10225)         //@选择主线 10225 每日活动
            $arr.push(10214)            //@选择主线 10214 1v1
            $arr.push(10130)            //@选择主线 10130 7天登入
            $arr.push(10224)  //@选择主线 10224 家族

            for (var i: number = 0; i < $arr.length; i++) {
                GameControlManager.sendGmCom("@选择主线 " + $arr[i]);
                GameControlManager.sendGmCom("@完成当前主线");
            }
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            }
        }
        private onStageMouseUp(evt: InteractiveEvent): void {
            this.hide()
        }
        private changeMoney($id: number, $num: number): void {

            //public static MONEY_TYPE_GOLD_INGOT: number = 0;	// 元宝
            //public static MONEY_TYPE_BIND_GOLD: number = 1;	// 绑定元宝
            //public static MONEY_TYPE_SILVER: number = 2;	// 身上的银子
            //public static MONEY_TYPE_SILVER_WAREHOUSE: number = 3;	// 仓库的银子
            //public static MONEY_TYPE_GOLD_WAREHOUSE: number = 4;	// 仓库元宝
            //public static MONEY_TYPE_BIND_GOLD_WAREHOUSE: number = 5;	// 仓库的绑元
            //public static MONEY_TYPE_QI: number = 6;	// 真气
            //public static MONEY_TYPE_BEAST: number = 7;	// 兽灵
            //public static MONEY_TYPE_GEM: number = 8;	// 宝石精华
            //SharedDef.MONEY_TYPE_SILVER

            this.chatItem.push({ id: $id, num: $num })




        }
        private sendNextMsg(): void {
            if (this.chatItem.length) {
                var $obj: any = this.chatItem.pop();
                var str: string = "@Resource " + $obj.id + " " + $obj.num;
                console.log(str)

                GameControlManager.sendGmCom(str)
                if (this.chatItem.length) {
                    setTimeout(() => { this.sendNextMsg() }, 200);
                }

            }
        }
        private chatItem: Array<any> = new Array();

        private _astarLineSprite: LineDisplaySprite
        public showAstarLine(): void {
            if (!this._astarLineSprite) {
                ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader());
                this._astarLineSprite = new LineDisplaySprite();
                SceneManager.getInstance().addDisplay(this._astarLineSprite);
                this.makeAstarLine(AstarUtil.navmeshData)
            } else {
                SceneManager.getInstance().removeDisplay(this._astarLineSprite);
                this._astarLineSprite = null;
            }

        }

        private makeAstarLine($navMeshStaticMesh: any): void {
            var w: number = $navMeshStaticMesh.heightItem[0].length;
            var h: number = $navMeshStaticMesh.heightItem.length;
            var midu: number = $navMeshStaticMesh.midu;
            var aPos: Vector3D = $navMeshStaticMesh.aPos;

            var vecItem: Array<Vector3D> = new Array
            var ty: number = 0;
            for (var i: number = 0; i < h; i++) {
                for (var j: number = 0; j < w; j++) {
                    ty = $navMeshStaticMesh.heightItem[i][j];
                    var pos: Vector3D = new Vector3D(j * midu, ty, i * midu);
                    pos.x = pos.x + aPos.x
                    pos.z = aPos.z + h * midu - pos.z
                    pos.y = ty;
                    vecItem.push(pos);

                    if (i < 2 || j < 2 || i > (w - 2) || j > (h - 2)) {
                        //   $navMeshStaticMesh.astarItem[i][j] = 0  //特殊边缘为不可寻走
                    }

                }
            }
            this._astarLineSprite.clear()
            this._astarLineSprite.baseColor = new Vector3D(1, 0, 1, 1);

            for (i = 0; i < h - 1; i++) {
                for (j = 0; j < w - 1; j++) {
                    var a: number = i * w + j;
                    var b: number = a + 1
                    var c: number = a + 1 + w
                    var d: number = a + w
                    if ($navMeshStaticMesh.astarItem[i][j] == 1) {
                        this._astarLineSprite.makeLineMode(vecItem[a], vecItem[b]);
                        this._astarLineSprite.makeLineMode(vecItem[a], vecItem[d]);


                        if ($navMeshStaticMesh.astarItem[i + 1][j] == 0) {
                            this._astarLineSprite.makeLineMode(vecItem[c], vecItem[d]);
                        }
                        if ($navMeshStaticMesh.astarItem[i][j + 1] == 0) {
                            this._astarLineSprite.makeLineMode(vecItem[b], vecItem[c]);
                        }

                    }
                }
            }

            this._astarLineSprite.upToGpu();


        }
        private randomJumpTxt(): void {

        }



        private mapItem: Array<string> = ["高山竹林", "darkmap"]
        private mapId: number = 1
        public butClik(evt: InteractiveEvent): void {


            this.hide()

        }

        private charArr: Array<string> = ["wd", "em"];
        private charId: number = 0
        private changeChat(): void {


        }


        private hide(): void {
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Down, this.onStageMouseUp, this);
            UIManager.getInstance().removeUIContainer(this);
        }



    }
    export class SceneModelTwoTexture extends Display3DSprite {
        public constructor() {
            super();
        }
        public loadGroup($name: string): void {
            var groupRes: GroupRes = new GroupRes;
            groupRes.load(Scene_data.fileRoot + "model/" + $name + ".txt", () => { this.loadPartRes(groupRes) });
        }
        private loadPartRes(groupRes: GroupRes): void {
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: GroupItem = groupRes.dataAry[i];
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                } else if (item.types == BaseRes.PREFAB_TYPE) {
                    this.setObjUrl(item.objUrl);
                    console.log(item.materialUrl)
                    this.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                }

            }
        }
    }
    export class MonsterChar extends SceneChar {

        public constructor() {
            super();

        }

        public destory(): void {
            super.destory();
            while (this.skillitem.length) {
                var $Skill: Skill = this.skillitem.pop();
                $Skill.isDeath = true;
                $Skill.useNum = 0;
            }
        }
        protected walkComplete(): void {
            //this.playSkillAction("j_skill_01")

            return;
            // if (this.skillitem && this.skillitem.length) {
            //     this.watch(GameInstance.mainChar)
            //     var $skill: Skill = this.skillitem[4];
            //     $skill.reset();
            //     $skill.isDeath = false;
            //     $skill.configTrajectory(this, GameInstance.mainChar, () => {
            //         //  GameInstance.mainChar.play(CharAction.ATTACK_01,2)
            //     }, 0);
            //     SkillManager.getInstance().playSkill($skill);
            // }


        }
        public setWalkPath($arr: Array<Vector3D>): void {
            this.walkPath = $arr;
            //  this.walkPathComplete()
        }

    }
    export class SceneMonster {
        private static _instance: SceneMonster;
        public static getInstance(): SceneMonster {
            if (!this._instance) {
                this._instance = new SceneMonster();
            }
            return this._instance;
        }
        public constructor() {
            this.monsterItem = new Array()
            TimeUtil.addFrameTick((t: number) => { this.update(t) });
        }
        private update(t: number): void {

        }
        //找场景时清除所有怪物
        public clearSceneMonster(): void {
            while (this.monsterItem.length) {
                this.removeMonsterChar(this.monsterItem[0])
            }
        }
        private removeMonsterChar($MonsterChar: MonsterChar): void {
            var index: number = this.monsterItem.indexOf($MonsterChar);
            if (index != -1) {
                this.monsterItem.splice(index, 1);
            }

            GameInstance.removeSceneChar($MonsterChar);
            $MonsterChar.destory()

        }
        public roundHit($pos): void {
            for (var i: number = 0; this.monsterItem && i < this.monsterItem.length; i++) {
                var $MonsterChar: MonsterChar = this.monsterItem[i]
                var $p: Vector3D = $MonsterChar.getCurrentPos();
                if (Vector3D.distance($p, $pos) < 55) {
                    $MonsterChar.life -= 15;
                }
            }

        }
        public monsterItem: Array<MonsterChar>
        //添加10个角色
        public addSceneMonsterList(): void {

        }
        //先择一个角色自己寻路到主角的位置
        public selectMonsterMove(): void {
            if (this.monsterItem && this.monsterItem.length) {
                var $monsterChar: MonsterChar = randomByItem(this.monsterItem)
                var $arr: Array<Vector3D> = AstarUtil.findPath($monsterChar.getCurrentPos(), GameInstance.mainChar.getCurrentPos());
                $monsterChar.setWalkPath($arr);

            }
        }
        //所有怪物播放技能
        public allPlaySkill(): void {
            for (var i: number = 0; this.monsterItem && i < this.monsterItem.length; i++) {
                var $MonsterChar: MonsterChar = this.monsterItem[i]
                if ($MonsterChar) {
                    //$MonsterChar.playSkillAction("skill_01")
                }
            }

        }
        public getSceneChar(name: string, shadowSize: number = 10, watchflag: boolean = false, retinueName: string = null, fix: Vector3D = null): MonsterChar {
            var char: MonsterChar = new MonsterChar();
            char.setRoleUrl(getRoleUrl(name));
            char.x = 0;
            char.y = 5;
            char.z = 0;
            char.setShadowSize(shadowSize);
            return char;
        }


    }

}