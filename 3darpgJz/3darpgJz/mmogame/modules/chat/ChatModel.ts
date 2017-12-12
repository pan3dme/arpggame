module Chat {
    export class WhisperToVo {
        public name: string;
        public guid: string;
    }
    export class CharUiVo {
        public ui: UICompenent
        public select: boolean;
        public s2c_send_chat: s2c_send_chat

    }
    export class SendSeverCmd {

        private static talkToNpc($entryId: number, $quid:number): void
        {
            console.log("talk", $entryId, $quid)
            for (var i: number = 0; i < GameInstance.roleList.length; i++) {
                if (GameInstance.roleList[i].unit.getEntry() == $entryId) {
                    console.log("发送", GameInstance.roleList[i].unit.getUintGuid(), $quid)
                    NetManager.getInstance().protocolos.talk_with_npc(GameInstance.roleList[i].unit.getUintGuid(), $quid);
                    return;
                }
            }
        

        }
        public static sendStr(str: string): void {



            var $arr: Array<string> = str.split(" ");
            if ($arr.length) {
                var $id: number = 0
                if ($arr.length > 1) {
                    $id = Number($arr[1])
                }
                switch ($arr[0]) {
                    case "#raise":
                        NetManager.getInstance().protocolos.raise_base_spell(SharedDef.RAISE_BASE_SKILL, $id);
                        console.log("send raise=>" + $id)
                        break;
                    case "#upgrade":
                        NetManager.getInstance().protocolos.upgrade_anger_spell($id);
                        console.log("send upgrade=>" + $id)
                        break;
                    case "#RMount":
                        //培养
                        NetManager.getInstance().protocolos.raise_mount();
                        console.log("send raise_mount=>")
                        break;
                    //祝福
                    case "#UMount":
                        NetManager.getInstance().protocolos.upgrade_mount(0);
                        console.log("send upgrade_mount=>")
                        break;
                    case "#Talk":
                    case "#talk":

                        SendSeverCmd.talkToNpc(Number($arr[1]), Number($arr[2]))
              
                      
                        break;
                    //直接完成
                    case "#UMounts":
                        NetManager.getInstance().protocolos.upgrade_mount_one_step(0);
                        console.log("send upgrade_mount_one_step=>")
                        break;
                    case "#IlluActive":
                        //激活
                        NetManager.getInstance().protocolos.illusion_mount_active($id);
                        console.log("send illusion_mount_active=>" + $id)
                        break;
                    //幻化
                    case "#Illu":
                        NetManager.getInstance().protocolos.illusion_mount($id);
                        console.log("send Illu=>" + $id)
                        break;
                    case "#Ride":
                        NetManager.getInstance().protocolos.upgrade_anger_spell($id);
                        console.log("send upgrade_anger_spell=>" + $id)
                        break
                    case "#a":
                        NetManager.getInstance().protocolos.upgrade_anger_spell($id);
                        console.log("send upgrade=>" + $id)
                        break;
                    case "#submitDaily":
                        NetManager.getInstance().protocolos.submit_quest_daily2();
                        console.log("send upgrade=>" + "#submitDaily")
                        break;


                    case "#evi":  //        #evi id
                        NetManager.getInstance().protocolos.enter_vip_instance($id, 1);
                        console.log("send enter_vip_instance=>" + $id)
                        break;
                    case "#CL":  //        #evi id
                        NetManager.getInstance().protocolos.change_line($id);
                        console.log("#CL lineNo>" + $id)
                        break;
                    case "#doujiantai":  //        #evi id
                        NetManager.getInstance().protocolos.doujiantai_fight($id);
                        console.log("#doujiantai>" + $id)
                        break;

                    case "#r":  //        #evi id
                        Scene_data.gameAngle = Number($id)
                        break;

                    case "#200":  //        #evi id
                        NetManager.getInstance().protocolos.use_broadcast_gameobject($id);
                        console.log("#200", $id)
                        break;


                    case "#move":  //        #evi id

                        var $arr: Array<string> = str.split(" ");
                        var $toPos: Vector2D = new Vector2D(Number($arr[1]), Number($arr[2]));
                        GameInstance.mainChar.moveToPos2D = $toPos

                        break;

                    case "#add":  //        #evi id
                        var $arr: Array<string> = str.split(" ");
                        //  NetManager.getInstance().protocolos.add_para(Number($arr[1]), Number($arr[2]));

                        console.log("12#add", Number($arr[1]), Number($arr[2]))
                        break;

                    case "#全民boss":  //           #全民boss id
                        var $arr: Array<string> = str.split(" ");
                        //  NetManager.getInstance().protocolos.add_para(Number($arr[1]), Number($arr[2]));
                        NetManager.getInstance().protocolos.try_mass_boss(Number($arr[1]));

                        console.log("#全民boss", Number($arr[1]));
                        break;

                    case "#组队副本":  //           #全民boss id
                        var $arr: Array<string> = str.split(" ");
                        //  NetManager.getInstance().protocolos.add_para(Number($arr[1]), Number($arr[2]));
                        NetManager.getInstance().protocolos.group_instance_match(Number($arr[1]));

                        console.log("#组队副本", Number($arr[1]));

                        break;
                    case "#经脉":  //           #全民boss id
                        console.log("#经脉", Number($arr[1]));
                        NetManager.getInstance().protocolos.meridian_practise();
                        break;
                    case "#经脉经验":  //           #全民boss id
                        console.log("#经脉经验", Number($arr[1]));
                        NetManager.getInstance().protocolos.add_meridian_exp(Number($arr[1]));
                        break;

                    case "#排位赛":  //           #全民boss id
                        console.log("#排位赛", Number($arr[1]));
                        NetManager.getInstance().protocolos.match_single_pvp();
                        break;

                    case "#改名":  //           #全民boss id
                        console.log("#改名", String($arr[1]));
                        NetManager.getInstance().protocolos.rename(String($arr[1]));
                        break;

                    default:
                        console.log("没有对应消息")
                        break;
                }
            }
        }
    }

    export class ChatLinkJasonVo {
        public T: number;
        public M: number;
        public L: number;
        public X: number;
        public Y: number;
    }
    export class ChatVo {
        public s2c_send_chat: s2c_send_chat;
        public isSelf: boolean;
        public showLast: boolean;
        public contentTxt: string;
        public jasonlink: ChatLinkJasonVo;
        public rect: Rectangle;
        public startY: number
        public time: string;
        public constructor() {

        }
        public makeJasonStr(): void {
            //    	public static CHAT_TYPE_SYSTEM: number = 0;	// 系统
            //public static CHAT_TYPE_WORLD: number = 1;	// 世界
            //public static CHAT_TYPE_FACTION: number = 2;	// 帮派
            //public static CHAT_TYPE_CURRENT: number = 3;	// 当前(场景)
            //public static CHAT_TYPE_HORM: number = 4;	// 喇叭
            //public static CHAT_TYPE_GROUP: number = 5;	// 队伍
            //public static CHAT_TYPE_WHISPER: number = 6;	// 私聊
            this.contentTxt = this.toJasonStr(this.s2c_send_chat.content)
            var $color: string = "[]";
            switch (this.s2c_send_chat.channel) {
                case SharedDef.CHAT_TYPE_SYSTEM:// 系统
                    $color = "[]";
                    break;
                case SharedDef.CHAT_TYPE_WORLD:// 世界
                    break;
                case SharedDef.CHAT_TYPE_FACTION:// 帮派
                    break;
                case SharedDef.CHAT_TYPE_CURRENT:// 当前(场景)
                    break;
                case SharedDef.CHAT_TYPE_HORM:// 喇叭
                    break;
                case SharedDef.CHAT_TYPE_GROUP:// 队伍
                    break;
                case SharedDef.CHAT_TYPE_WHISPER:// 私聊
                    break;
                default:
                    break;
            }


        }
        private toJasonStr($str: string): string {
            //var $str: string = "asdsad{\"T\":1,\"M\":1,\"L\":1,\"X\":3,\"Y\":2}eeed{\"T\":1,\"M\":1,\"L\":1,\"X\":3,\"Y\":2}eea"
            var q: Array<any> = new Array;
            console.log("解析toJasonStr", $str);
            var $stack: Array<number> = new Array;
            for (var i: number = 0; i < $str.length; i++) {
                if ($str.charAt(i) == '{') {
                    $stack.push(i);
                } else if ($str.charAt(i) == '}') {
                    if ($stack.length > 0) {
                        var $a: number = $stack.pop();
                        var $len: number = i - $a + 1;
                        var $jsonString: string = $str.substr($a, $len);
                        try {
                            var $obj: any = JSON.parse($jsonString);
                            if (this.needChangeStr($obj)) {
                                var $aa: number = Number($obj["T"]);
                                if ($aa == SharedDef.TEXT_TYPE_POSITION) {
                                    //  < 临安城(68, 14) >
                                    var bbb: string = "<{NAME}({X},{Y})>"
                                    // bbb = bbb.replace("{NAME}", $obj.M)
                                    var mapVO: tb.TB_map = tb.TB_map.getTB_map(Number($obj.M))
                                    bbb = bbb.replace("{NAME}", mapVO.name)
                                    bbb = bbb.replace("{X}", $obj.X)
                                    bbb = bbb.replace("{Y}", $obj.Y)
                                    bbb = "[00ff00]" + bbb + "[]";
                                    q.push({ obj: $obj, replace: bbb, st: $a, ed: i + 1 });
                                    this.jasonlink = new ChatLinkJasonVo();
                                    this.jasonlink.T = $obj.T;
                                    this.jasonlink.M = $obj.M;
                                    this.jasonlink.L = $obj.L;
                                    this.jasonlink.X = $obj.X;
                                    this.jasonlink.Y = $obj.Y;

                                }
                            }
                        } catch (e) {
                            console.log(e);
                            return $str
                        }
                    }
                }
            }
            var tt: string = "";
            var st: number = 0;
            for (var j: number = 0; j < q.length; ++j) {
                var ed: number = q[j].st;
                var len: number = ed - st;
                if (st < ed) {
                    tt = tt + $str.substr(st, len);
                }
                tt = tt + q[j].replace;
                st = q[j].ed;
            }
            if (st < $str.length) {
                tt = tt + $str.substr(st, $str.length - st);
            }
            if (tt == "") {
                tt = $str
            }
            return tt

        }
        private needChangeStr($obj: any): boolean {
            if (!$obj["T"]) {
                return false;
            }
            var $a: number = Number($obj["T"]);
            if ($a == SharedDef.TEXT_TYPE_POSITION) {
                if (isNaN($obj["M"]) || isNaN($obj["L"]) || isNaN($obj["X"]) || isNaN($obj["Y"])) {
                    return false;
                }
                //TODO: 判断变量都是number
            } else {
                return false;
            }

            return true;
        }

    }
    export class ChatModel {

        public chatItem: Array<ChatVo> = new Array;
        public static uiHeight: number = 60;
        public static whisperGuid: WhisperToVo;
        private static _showType: number = 1;
        /*
        *私聊接口
        */
        public static toWhisper($name: string, $guid: string): void {
            ChatModel.showType = SharedDef.CHAT_TYPE_WHISPER;
            ChatModel.whisperGuid = new WhisperToVo;
            ChatModel.whisperGuid.name = $name;
            ChatModel.whisperGuid.guid = $guid;
            ModulePageManager.openPanel(SharedDef.MODULE_CHATPERSON,$guid);
        }

        public static set showType(value: number) {
            this._showType = value;
        }
        public static get showType(): number {
            return this._showType
        }
        public constructor() {
            //   this.makeBaseChatHositry()
        }

        private makeBaseChatHositry(): void {
            for (var i: number = 0; i < 20; i++) {
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_SYSTEM)
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_WORLD)
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_FACTION)
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_CURRENT)
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_HORM)
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_GROUP)
                //  this.addBaseHositryByType(SharedDef.CHAT_TYPE_WHISPER)
            }
            for (var i: number = 0; i < 5; i++) {
                this.addBaseHositryByType(SharedDef.CHAT_TYPE_WHISPER)
            }
        }

        //public static CHAT_TYPE_SYSTEM: number = 0;	// 系统
        //public static CHAT_TYPE_WORLD: number = 1;	// 世界
        //public static CHAT_TYPE_FACTION: number = 2;	// 帮派
        //public static CHAT_TYPE_CURRENT: number = 3;	// 当前(场景)
        //public static CHAT_TYPE_HORM: number = 4;	// 喇叭
        //public static CHAT_TYPE_GROUP: number = 5;	// 队伍
        //public static CHAT_TYPE_WHISPER: number = 6;	// 私聊
        private addBaseHositryByType(value: number): void {
            var $chatVo: ChatVo = this.getTempVo();
            $chatVo.s2c_send_chat.channel = value;
            $chatVo.s2c_send_chat.guid = $chatVo.s2c_send_chat.name;
            $chatVo.s2c_send_chat.lvl = random(99);
            $chatVo.s2c_send_chat.vip = random(15);

            this.chatItem.push($chatVo)
            if (SharedDef.CHAT_TYPE_SYSTEM == value && Math.random() > 0.5) {
                $chatVo.s2c_send_chat.content = "[000000]恭喜[ff0000]玩家名字[000000]获得神器[00ff00]霸王枪"
            } else {
                $chatVo.s2c_send_chat.content = "[000000]" + $chatVo.s2c_send_chat.content;
            }
            //   $chatVo.s2c_send_chat.content = "/大笑[000000]恭喜/大笑[ff0000]玩家名字[]获得神器[00ff00]霸王枪"
            //  $chatVo.s2c_send_chat.content = "[00FF00]<临安城(86,63)>"
            //  $chatVo.s2c_send_chat.content = "{T=1,M=1,L=1,X=3,Y=2}"
            // $chatVo.s2c_send_chat.content = this.toJasonStr($chatVo.s2c_send_chat.content);

            // $chatVo.s2c_send_chat.content = "习近平主持政治局民主生活会并发表表"
            //  $chatVo.s2c_send_chat.content = "习近平主持政治局民主"
            //  $chatVo.s2c_send_chat.content = "习近平"




            $chatVo.makeJasonStr()

        }


        private static _instance: ChatModel;
        public static getInstance(): ChatModel {
            if (!this._instance) {
                this._instance = new ChatModel();
            }
            return this._instance;
        }
        //最后三条消息
        public getLastThreeChatVo(): Array<ChatVo> {
            //      var $text = " [ffc13a]【世界】李逍遥获得了绝世神兵\n[00b1f1]【家族】赵灵儿加入了家族\n[ffffff]【组队】林月如退出了队伍";
            var $arr: Array<ChatVo> = new Array;
            for (var i: number = this.chatItem.length - 1; i >= 0 && $arr.length < 3; i--) {
                // var contxt: string = GameInstance.toserverName(this.chatItem[i].s2c_send_chat.name) + ":" + this.chatItem[i].contentTxt
                var $vo: s2c_send_chat = this.chatItem[i].s2c_send_chat;
                if ($vo.channel == SharedDef.CHAT_TYPE_WORLD || $vo.channel == SharedDef.CHAT_TYPE_FACTION || $vo.channel == SharedDef.CHAT_TYPE_CURRENT) {
                    $arr.push(this.chatItem[i]);
                }


            }
            console.log($arr)
            var $vvv: Array<ChatVo> = new Array;
            for (var i: number = 0; i < $arr.length; i++) {
                $vvv.push($arr[$arr.length - i - 1]);
            }
            return $vvv

        }
        //来新的消息
        public pushNewMes($s2c_send_chat: s2c_send_chat): void {
            var $item: Array<BlockVo> = ChatModel.getInstance().getChatBlockItem(false);
            for (var i: number = 0; i < $item.length; i++) {
                if ($item[i].guid == $s2c_send_chat.guid) {
                    console.log("已被屏蔽")
                    return
                }
            }
            var $chatVo: ChatVo = new ChatVo()
            $chatVo.s2c_send_chat = $s2c_send_chat
            if ($chatVo.s2c_send_chat.guid == GuidData.player.getGuid()) {
                $chatVo.isSelf = true;
            } else {
                $chatVo.isSelf = false;
            }
            $chatVo.makeJasonStr();
            var $ts: number = GameInstance.getServerNow();
            $chatVo.time = TimeUtil.getLocalTime2($ts);
            this.chatItem.push($chatVo);
        }
        public getHaveNewChatInfo(): Boolean {
            for (var j: number = 0; j < this.chatItem.length; j++) {
                var vo: ChatVo = this.chatItem[j];
                if (!vo.showLast && vo.s2c_send_chat.channel == SharedDef.CHAT_TYPE_WHISPER) { //有新的私聊信息
                    return true;
                }
            }
            return false;

        }

        private chatTypeDic: any = new Object
        public getChatItemByType(value: number): Array<ChatVo> {
            var $arr: Array<ChatVo> = new Array
            for (var i: number = 0; i < this.chatItem.length; i++) {
                if (this.chatItem[i].s2c_send_chat.channel == value) {
                    $arr.push(this.chatItem[i])
                }
            }
            return $arr
        }
        /**
         * 获得和某好友的聊天记录
         * @param value 
         */
        public getChatItemByToGuid($toguid: string): Array<ChatVo> {
            var $arr: Array<ChatVo> = new Array
            var $arrwhisper: Array<ChatVo> = this.getChatItemByType(SharedDef.CHAT_TYPE_WHISPER);
            var myGuid: string = GuidData.player.getGuid();
            for (var i: number = 0; i < $arrwhisper.length; i++) {
                if ($arrwhisper[i].s2c_send_chat.guid == $toguid && $arrwhisper[i].s2c_send_chat.to_guid == myGuid) {
                    $arrwhisper[i].showLast  = true;
                    $arr.push($arrwhisper[i]);
                }
                if ($arrwhisper[i].s2c_send_chat.guid == myGuid && $arrwhisper[i].s2c_send_chat.to_guid == $toguid) {
                    $arrwhisper[i].showLast  = true;
                    $arr.push($arrwhisper[i]);
                }
            }
            return $arr
        }

        public getChatNameByGuid($guid: string): string {
            for (var i: number = 0; i < this.chatItem.length; i++) {
                if (this.chatItem[i].s2c_send_chat.guid == $guid) {
                    return this.chatItem[i].s2c_send_chat.name

                }

            }
            return "没找到"
        }
        public getWhisperByGuid(): Array<ChatVo> {
            var $showArr: Array<ChatVo> = new Array
            var $arr: Array<ChatVo> = this.getChatItemByType(SharedDef.CHAT_TYPE_WHISPER);
            for (var i: number = 0; i < $arr.length; i++) {
                if (ChatModel.whisperGuid) {
                    if ($arr[i].s2c_send_chat.guid == ChatModel.whisperGuid.guid || $arr[i].s2c_send_chat.to_guid == ChatModel.whisperGuid.guid) {
                        $showArr.push($arr[i]);
                    }
                }

            }
            return $showArr
        }

        private getTempVo(): ChatVo {
            var $vo: ChatVo = new ChatVo()
            $vo.s2c_send_chat = new s2c_send_chat();
            $vo.s2c_send_chat.name = randomByItem(this.nameItem);
            $vo.s2c_send_chat.name = "A,B," + $vo.s2c_send_chat.name
            $vo.s2c_send_chat.content = "";
            var num: number = random(50) + 5;
            var str: string = "中共第中央委员会第六次全会公报";
            for (var i: number = 0; i < num; i++) {
                $vo.s2c_send_chat.content += str.substr(random(str.length - 1), 1);
                if (Math.random() > 0.9) {
                    $vo.s2c_send_chat.content += "/脸i"
                }
            }
            if (Math.random() > 0.5) {
                $vo.s2c_send_chat.guid = GuidData.player.getGuid();
                $vo.isSelf = true;
            } else {
                $vo.isSelf = false;
            }



            return $vo
        }
        private nameItem: Array<string> = ["潘佳治", "欧阳拿来", "得宜", "色", "dse52", "乖巧", "不得了"]

        public sendCharInfo($str: string): void {

            if ($str.length) {
                var $index: number = $str.search("#");
                if ($index == -1) {
                    //NetManager.getInstance().protocolos.chat_world(GuidData.player.getGuid(), 0, GuidData.player.getName(), str);
                    var $type: number = ChatModel.showType;
                    //  str = str.replace("[位置]", "{\"T\":1,\"M\":1,\"L\":1,\"X\":3,\"Y\":2}");
                    $str = $str.replace("[位置]", "{T=1}");
                    if (ChatModel.showType == SharedDef.CHAT_TYPE_WHISPER) {
                        NetManager.getInstance().protocolos.chat_whisper(ChatModel.whisperGuid.guid, $str)
                    } else {
                        NetManager.getInstance().protocolos.chat_by_channel($type, $str)
                    }
                    console.log("发送编码", $str);



                } else {
                    SendSeverCmd.sendStr($str)
                }
                if (GameStart.GM) {
                    this.saveChatStr($str);
                }
            }
        }
        private saveChatStr($str: string): void {

            var $temp: string = localStorage.getItem("GMITEM");
            var $gmitem: Array<string> = new Array();
            if ($temp) {
                $gmitem = JSON.parse($temp)
                if ($gmitem.length > 5) {
                    $gmitem.shift();
                }
            }
            var $needAdd: boolean = true
            for (var i: number = 0; i < $gmitem.length; i++) {
                if ($gmitem[i] == $str) {
                    $gmitem.splice(i, 1);
                    break;
                }
            }
            $gmitem.push($str);
            localStorage.setItem("GMITEM", JSON.stringify($gmitem));
        }
        private sendToChar(str: string): void {
            var $displayList: Array<Display3dMovie> = GameInstance.roleList
            var $nearChar: SceneChar;
            var $dis: number = 100000;
            for (var i: number = 0; $displayList && i < $displayList.length; i++) {
                var $tempChar: SceneChar = <SceneChar>$displayList[i];
                if ($tempChar.unit.isPlayer() && !$tempChar.unit.isMain) {
                    var $temptis: number = GameInstance.mainChar.math_distance($tempChar);
                    if ($dis > $temptis) {
                        $dis = $temptis;
                        $nearChar = $tempChar;
                    }
                }
            }
            if ($nearChar) {
                console.log($nearChar.unit.getName(), $nearChar.unit.getPlayerGUID(), str)
                NetManager.getInstance().protocolos.chat_whisper($nearChar.unit.getPlayerGUID(), str)
            }

        }
        private ismyfriends($guid): boolean {
            var list: Array<SocialItemData> = GuidData.social.getFriendList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].guid == $guid) {
                    return true;
                }
            }
            return false;
        }
        public getPopMenuItemByGuid($vo: s2c_send_chat): Array<number> {
            var $arr: Array<number> = new Array

            //密聊
            if (this.ismyfriends($vo.guid)) {
                $arr.push(8)
            } else {
                $arr.push(7)

            }
            //查看消息
            $arr.push(0)
            //家族邀请
            if (GuidData.player.getFactionID() && !Boolean($vo.faction_guid)) {
                $arr.push(1)
            }


            //申请好友
            //申请入队
            //邀请入队
            //赠送礼物
            //屏蔽消息

            if (!this.getBlockByGuid($vo.guid)) {
             //  $arr.push(6)
            }



            return $arr;
        }
        public getBlockByGuid($guid: string): boolean {

            var $item: Array<BlockVo> = ChatModel.getInstance().getChatBlockItem();
            for (var i: number = 0; i < $item.length; i++) {
                if ($item[i].guid == $guid) {
                    console.log("已被屏蔽")
                    return true
                }
            }
            return false
        }

        private blockItem: Array<BlockVo>
        public getChatBlockItem(value: boolean = true): Array<BlockVo> {
            if (!value && this.blockItem) {
                return this.blockItem
            }
            if (!this.blockItem) {
                this.blockItem = new Array
            }
            this.blockItem.length = 0

            var $strItem: Array<string> = GuidData.player.getPlayChatBlock();
            for (var i: number = 0; i < $strItem.length; i++) {
                if ($strItem[i]) {
                    var tempArr: Array<string> = $strItem[i].split("|");
                    var $vo: BlockVo = new BlockVo();
                    $vo.gender = Number(tempArr[0]);
                    $vo.level = Number(tempArr[1]);
                    $vo.name = String(tempArr[2]);
                    $vo.vip = Number(tempArr[3]);
                    $vo.factionName = String(tempArr[4]);
                    $vo.guid = String(tempArr[5]);
                    $vo.indx = i;
                    console.log($vo.indx)
                    this.blockItem.push($vo)
                }

            }
            return this.blockItem
        }
        public static _textWidth: number = 360;
        public static writeMultiFaceLineToCtx($ctx: CanvasRenderingContext2D, $str: string, fontsize: number = 12, $tx: number = 0, $ty: number = 0): number {

            $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str);
            return this.wrapFaceText($ctx, $str, "[]", $tx, $ty, ChatModel._textWidth, fontsize + 5)
        }
        public static getTextHeight($ctx: CanvasRenderingContext2D, $str: string, fontsize: number = 12, $tx: number = 0, $ty: number = 0): number {

            $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str);
            return this.wrapFaceText($ctx, $str, "[]", $tx, $ty, ChatModel._textWidth, fontsize + 5, false)
        }
        private static getNextWords($str: string, indx: number): number {
            var $iconId: number = -1
            if ($str[indx] == "/" && $str.length > (indx + 2)) {
                var tempA: string = $str[indx + 0] + $str[indx + 1] + $str[indx + 2]
                for (var i: number = 0; i < UIData.faceItem.length; i++) {
                    if (UIData.faceItem[i] == tempA) {
                        return i + 1
                    }
                }
            }
            return $iconId
        }
        public static wrapFaceText($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x: number = 0, y: number = 0, maxWidth: number = 500, lineHeight: number = 10, $wirte: boolean = true): number {
            TextRegExp.pushStr(text);
            var words: string = text;
            var line: string = "";
            var ty: number = 0
            var $lineNum: number = 1 //行数
            for (var n = 0; n < words.length; n++) {
                if (TextRegExp.isColor(n, $ctx)) {
                    continue;
                }
                var metrics: TextMetrics = $ctx.measureText(line.replace("\n", ""));
                var $faceId: number = this.getNextWords(words, n)
                if ($faceId == -1) {
                    if (metrics.width > maxWidth || words[n] == "\n") {
                        ty += lineHeight;
                        line = "";
                        if (words[n] != "\n") {
                            if ($wirte) {
                                $ctx.fillText(words[n], x, y + ty);
                            }
                        }
                        $lineNum++
                    } else {
                        if ($wirte) {
                            $ctx.fillText(words[n], x + metrics.width * 1.0, y + ty);
                        }
                    }
                    line += words[n];
                } else {

                    var $rect: Rectangle = new Rectangle(x + metrics.width * 1.0 + 0, y + ty - 5, 35, 35);
                    if (metrics.width > maxWidth) {
                        ty += lineHeight;
                        line = "";
                        $lineNum++

                        $rect = new Rectangle(x + 0, y + ty - 5, 35, 35);

                    }
                    if ($wirte) {
                        this.drawFaceIcon($ctx, $rect, $faceId)
                    }

                    n = n + 2;
                    line += "大1"
                }

            }
            return $lineNum
        }
        private static drawFaceIcon(ctx: CanvasRenderingContext2D, $rect: Rectangle, $faceId: number): void {
            UiDraw.cxtDrawImg(ctx, "F_FACE_" + $faceId, $rect, UIData.publicUi);
        }



    }


    export class BlockVo {

        public gender: number;
        public level: number;
        public name: string
        public vip: number
        public factionName: string
        public guid: string
        public indx: number
    }

}
