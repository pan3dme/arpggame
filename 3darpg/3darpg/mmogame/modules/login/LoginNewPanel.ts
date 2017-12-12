module login {
    class LoginChar extends Person2DChar {
        public constructor() {
            super();
        }

        // public resize(): void {
        //     var $temp: Matrix3D = new Matrix3D();
        //     $temp.perspectiveFieldOfViewLH(1, 1, 10, 2000);
        //     this.uiViewMatrix.identity();
        //     this.uiViewMatrix.appendScale(this.scale, this.scale, this.scale);
        //     this.uiViewMatrix.appendScale(1000 / Scene_data.stageWidth, 1000 / Scene_data.stageHeight, 1);
        //     this.uiViewMatrix.prepend($temp);
        // }
    }
    export class LoginNewPanel extends UIPanel {

        private _baImg: UIBackImg;
        private _baseBgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;

        private _leftTop: UIVirtualContainer;
        private _rightTop: UIVirtualContainer;
        private _leftBottom: UIVirtualContainer;
        private _rightBottom: UIVirtualContainer;

        public dispose(): void {
            this._baImg.dispose();
            this._baImg = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
        }

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0
            this.middle = 0;

            this._baImg = new UIBackImg();
            this._baImg.setImgInfo("ui/load/charbg.jpg", 1024, 512);
            this.addRender(this._baImg);

            this._baseBgRender = new UIRenderComponent();
            this.addRender(this._baseBgRender);

            this._bgRender = new UIRenderComponent();
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            this._baseUiAtlas = new UIAtlas();

            this._leftTop = new UIVirtualContainer();
            this._leftTop.width = this.width;
            this._leftTop.height = this.height;
            this._leftTop.left = 0;
            this._leftTop.top = 0;
            this.addVirtualContainer(this._leftTop);

            this._rightTop = new UIVirtualContainer();
            this._rightTop.width = this.width;
            this._rightTop.height = this.height;
            this._rightTop.right = 0;
            this._rightTop.top = 0;
            this.addVirtualContainer(this._rightTop);

            this._leftBottom = new UIVirtualContainer();
            this._leftBottom.width = this.width;
            this._leftBottom.height = this.height;
            this._leftBottom.left = 0;
            this._leftBottom.bottom = 0;
            this.addVirtualContainer(this._leftBottom);

            this._rightBottom = new UIVirtualContainer();
            this._rightBottom.width = this.width;
            this._rightBottom.height = this.height;
            this._rightBottom.right = 0;
            this._rightBottom.bottom = 0;
            this.addVirtualContainer(this._rightBottom);


            Engine.resReady();

        }
        private _data: s2c_chars_list;
        private _mainType: number = 1;
        public setData($data: s2c_chars_list): void {
            this._data = $data;
            if (this._data.queen_name != "") {
                this._mainType = 1;
            }
            this._baseUiAtlas.setInfo("ui/uidata/login/loginnew.xml", "ui/uidata/login/loginnew.png", () => { this.loadConfigCom() });

        }

        private _qiangkeBtn: FrameCompenent;
        private _jiankeBtn: FrameCompenent;
        private _daoshiBtn: FrameCompenent;

        private _raceUnselBg1: UICompenent;
        private _raceUnselBg2: UICompenent;
        private _raceSelBg: UICompenent;

        private _raceBgPos: Array<Array<number>> = [[18, 89], [30, 229], [55, 357]];
        private _raceBgSelPos: Array<number> = [-15, -13];


        private maleBtn: UICompenent;
        private femaleBtn: UICompenent;
        private genderBg: FrameCompenent;

        private iconUI: UICompenent;
        private facUI: UICompenent;
        private queenUI: UICompenent;
        private nameUI: UICompenent;
        private nameBgUI: UICompenent;
        private timeUI: UICompenent;

        private randomBtn: UICompenent;
        private enterBtn: UICompenent;

        private bg1: UICompenent;
        private bg2: UICompenent;
        private initUI(): void {

            //this.addUIList([, "t_bg2"], this._baseBgRender);
            this.bg1 = this._baseBgRender.getComponent("t_bg1");
            this._leftTop.addChild(this.bg1);
            this.bg2 = this._baseBgRender.getComponent("t_bg2");
            this._rightTop.addChild(this.bg2);

            var back1: UICompenent = this._bgRender.getComponent("t_back1");
            this._leftTop.addChild(back1);
            var back2: UICompenent = this._bgRender.getComponent("t_back2");
            this._leftTop.addChild(back2);
            var info0: UICompenent = this._bgRender.getComponent("t_info0");
            this._rightBottom.addChild(info0);

            //this.addChild(this._bgRender.getComponent("t_name_bg"));

            // this.addUIList(["t_back1", "t_back2", "t_info0", "t_name_bg"], this._bgRender);


            this._qiangkeBtn = <FrameCompenent>this._baseRender.getComponent("t_qiangke");
            this.addChild(this._qiangkeBtn);
            this._qiangkeBtn.addEventListener(InteractiveEvent.Down, this.raceClick, this);

            this._jiankeBtn = <FrameCompenent>this._baseRender.getComponent("t_jianke");
            this.addChild(this._jiankeBtn);
            this._jiankeBtn.addEventListener(InteractiveEvent.Down, this.raceClick, this);

            this._daoshiBtn = <FrameCompenent>this._baseRender.getComponent("t_daoshi");
            this.addChild(this._daoshiBtn);
            this._daoshiBtn.addEventListener(InteractiveEvent.Down, this.raceClick, this);

            this._raceUnselBg1 = this._bgRender.getComponent("t_unsel1");
            this.addChild(this._raceUnselBg1);

            this._raceUnselBg2 = this._bgRender.getComponent("t_unsel2");
            this.addChild(this._raceUnselBg2);

            this._raceSelBg = this._bgRender.getComponent("t_sel");
            this.addChild(this._raceSelBg);

            if (this._mainType != 0) {
                this.maleBtn = this._baseRender.getComponent("t_male");
                this._leftBottom.addChild(this.maleBtn);
                this.maleBtn.addEventListener(InteractiveEvent.Down, this.genderClick, this);

                this.femaleBtn = this._baseRender.getComponent("t_female");
                this._leftBottom.addChild(this.femaleBtn);
                this.femaleBtn.addEventListener(InteractiveEvent.Down, this.genderClick, this);

                this.genderBg = <FrameCompenent>this._baseRender.getComponent("t_sex_bg");
                this._leftBottom.addChild(this.genderBg);
            } else {
                this._genderType = 1;
            }

            this.nameBgUI = this.addEvntBut("t_name_bg", this._bgRender);
            this.nameUI = this._baseRender.getComponent("t_name"); //= this.addEvntBut("t_name", this._baseRender);
            this.addChild(this.nameUI);

            this.timeUI = this._bgRender.getComponent("t_sec");
            this._rightBottom.addChild(this.timeUI);

            this.randomBtn = this.addEvntBut("t_random", this._baseRender);
            //this.addEvntBut("t_enter", this._baseRender);
            this.enterBtn = this._baseRender.getComponent("t_enter");
            this._rightBottom.addChild(this.enterBtn);
            this.enterBtn.addEventListener(InteractiveEvent.Up, this.enterGame, this);

            //this.initQueenUI();

            this.addChar();

            var raceRan:number = Math.random();
            var raceRanType:number = 0;
            if(raceRan < 0.333){
                raceRan = 0;
            }else if(raceRanType < 0.666){
                raceRan = 1;
            }else{
                raceRan = 2;
            }
            this.setRaceType(raceRan);

            // if (this._mainType != 0) {
            //     this.setGenderType(0);
            // }

            this.setGenderType(Math.random() > 0.5 ? 0 : 1);


            this.getRandomName();

            if (sessionStorage.getItem("name") && sessionStorage.getItem("name") != "") {
                this.setNameLable(sessionStorage.getItem("name"));
            }



        }



        private initQueenUI(): void {
            this.iconUI = this._baseRender.getComponent("t_icon");
            this._rightTop.addChild(this.iconUI);

            this.facUI = this._baseRender.getComponent("t_fac");
            this._rightTop.addChild(this.facUI);

            this.queenUI = this._baseRender.getComponent("t_queen");
            this._rightTop.addChild(this.queenUI);

            LoadManager.getInstance().load(getQueenIconUrl(this._data.icon), LoadManager.IMG_TYPE, ($img: any) => {
                var rec: UIRectangle = this._baseUiAtlas.getRec(this.iconUI.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

                //UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 66, 66), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 0, 0, 60, 60);

                this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
            });

            if (this._mainType == 1) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.facUI.skinName, "家族:" + getBaseName(this._data.faction_name), 15, TextAlign.LEFT, ColorType.Yellowedce7e);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.queenUI.skinName, "女王:" + getBaseName(this._data.queen_name), 15, TextAlign.LEFT, ColorType.Yellowedce7e);
            }
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.nameBgUI:
                    InputPanel.show(($str: string) => { this.setNameLable($str) }, "")
                    break;
                case this.randomBtn:
                    this.getRandomName();
                    break;
                case this.enterBtn:
                    this.enterGame();
                    break;
            }
        }

        private char: LoginChar;
        private charRotationFun: Function;
        private _roYNum: number = 0;
        private addChar(): void {
            this.char = new LoginChar();
            this.char.bindZero = true;
            this.char.setCamData(-10, -90, 800);
            //this.char.scale = 2.5;
            this._baseRender.addModel(this.char);

            this.char.lightData = [[0.2, 0.2, 0.2 * 202 / 255], [-0.6126, 0.783, -0.10], [0.5, 0.5, 0.5 * 202 / 255]];

            //this.char.addPart("sss", "none", getModelUIUrl("2001"));
            //this.char.addPart("sss", "none", getModelUrl("1"));

            TimeUtil.addFrameTick(() => {
                this._roYNum += 0.01;
                this.char.rotationY = 30 * Math.sin(this._roYNum);
            })

            this.resize();

        }

        public resize(): void {

            super.resize();
            if (this.char) {
                this.char.resize();
                this.char.scale = 1.8 * UIData.Scale;
                this.char.y = -120 * UIData.Scale;
            }
            if (this.bg1 && this.bg2) {
                this.bg1.height = Scene_data.stageHeight / UIData.Scale;
                this.bg2.height = (Scene_data.stageHeight - 60) / UIData.Scale;
            }

        }

        private raceClick($e: InteractiveEvent): void {
            switch ($e.target) {
                case this._jiankeBtn:
                    this.setRaceType(0);
                    break;

                case this._qiangkeBtn:
                    this.setRaceType(1);
                    break;
                case this._daoshiBtn:
                    this.setRaceType(2);
                    break;
            }
        }

        private genderClick($e: InteractiveEvent): void {
            switch ($e.target) {
                case this.maleBtn:
                    this.setGenderType(0);
                    break;

                case this.femaleBtn:
                    this.setGenderType(1);
                    break;
            }
        }
        private _raceType: number = 0;
        private setRaceType($type: number): void {
            if ($type == 0) {
                this._jiankeBtn.goToAndStop(1);
                this._qiangkeBtn.goToAndStop(0);
                this._daoshiBtn.goToAndStop(0);

                this._raceSelBg.setPos(this._raceBgPos[0][0] + this._raceBgSelPos[0], this._raceBgPos[0][1] + this._raceBgSelPos[1]);
                this._raceUnselBg1.setPos(this._raceBgPos[1][0], this._raceBgPos[1][1]);
                this._raceUnselBg2.setPos(this._raceBgPos[2][0], this._raceBgPos[2][1]);

            } else if ($type == 1) {
                this._jiankeBtn.goToAndStop(0);
                this._qiangkeBtn.goToAndStop(1);
                this._daoshiBtn.goToAndStop(0);

                this._raceUnselBg1.setPos(this._raceBgPos[0][0], this._raceBgPos[0][1]);
                this._raceSelBg.setPos(this._raceBgPos[1][0] + this._raceBgSelPos[0], this._raceBgPos[1][1] + this._raceBgSelPos[1]);
                this._raceUnselBg2.setPos(this._raceBgPos[2][0], this._raceBgPos[2][1]);
            } else if ($type == 2) {
                this._jiankeBtn.goToAndStop(0);
                this._qiangkeBtn.goToAndStop(0);
                this._daoshiBtn.goToAndStop(1);

                this._raceUnselBg1.setPos(this._raceBgPos[0][0], this._raceBgPos[0][1]);
                this._raceUnselBg2.setPos(this._raceBgPos[1][0], this._raceBgPos[1][1]);
                this._raceSelBg.setPos(this._raceBgPos[2][0] + this._raceBgSelPos[0], this._raceBgPos[2][1] + this._raceBgSelPos[1]);
            }
            this._raceType = $type;
            this.applyShow();
        }
        private _genderType: number = 0;
        private setGenderType($type: number): void {

            // if ($type == 0) {
            //     this.maleBtn.selected = true;
            //     this.femaleBtn.selected = false;
            // } else if ($type == 1) {
            //     this.maleBtn.selected = false;
            //     this.femaleBtn.selected = true;
            // }
            var flag:boolean = false;
            if(this._genderType != $type){
                flag = true;
            }
            this.genderBg.goToAndStop($type);
            this._genderType = $type;
            this.applyShow();
            if(flag){
                this.getRandomName();
            }
        }

        private applyShow(): void {
            var modelID: number = 0;
            if (this._raceType == 0) {
                if (this._genderType == 0) {
                    modelID = 5;
                } else {
                    modelID = 6;
                }
                this.char.setCamData(-10, -20, 800);
            } else if (this._raceType == 1) {
                if (this._genderType == 0) {
                    modelID = 1;
                } else {
                    modelID = 2;
                }
                this.char.setCamData(-10, -90, 800);
            } else if (this._raceType == 2) {
                if (this._genderType == 0) {
                    modelID = 3;
                } else {
                    modelID = 4;
                }
                this.char.setCamData(-10, 0, 800);
            }
            this.genderUint = modelID;
            this.char.addPart("sss", "none", getModelUrl(String(50020 + modelID)));
            //this.char.addPart("sss", "none", getModelUrl(String(1)));
        }

        private loadConfigCom(): void {
            this._baseBgRender.uiAtlas = this._baseUiAtlas;
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;

            this.initUI();

            this.timeEnter();

            this.loadName();

        }
        private nameDic:any;
        private loadName():void{
            LoadManager.getInstance().load(Scene_data.fileRoot + "data/gamename.txt",LoadManager.XML_TYPE,($str:string)=>{
                var ary:Array<string> = $str.split("\n");
                this.nameDic = new Object;
                this.nameDic.xing = ary[0].split(",");
                this.nameDic.nan = ary[1].split(",");
                this.nameDic.nv = ary[2].split(",");
                this.nameDic.xingl = this.nameDic.xing.length;
                this.nameDic.nanl = this.nameDic.nan.length;
                this.nameDic.nvl = this.nameDic.nv.length;

                this.getRandomName();
            })
        }

        private timeEnter(): void {
            var num = 30;
            var fun: Function = () => {
                num--;
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.timeUI.skinName, String(num), 16, TextAlign.RIGHT, ColorType.colorce0a00);
                if (num == 0) {
                    this.enterGame();
                    TimeUtil.removeTimeTick(fun);
                }
            }
            TimeUtil.addTimeTick(1000, fun);
        }

        private genderUint: number = 1;

        private enterGame($e: InteractiveEvent = null): void {
            var $name: string = this._nameStr;
            if ($name.length > 6) {
                AlertUtil.show("名字不能超过6个字符", "", null, 1);
                return;
            }
            if ($name.length) {
                var info: char_create_info = new char_create_info();
                info.faction = 0;
                info.hair_id = 0;
                info.head_id = 0;
                info.level = 1;
                info.race = 0;
                info.gender = this.genderUint;
                //alert(info.gender)

                info.name = $name;


                info.inviteGuid = "";
                //L1.2_1003
                if (getUrlParam("inviteGuid")) {
                    info.inviteGuid = getUrlParam("inviteGuid");
                } else {
                    info.faction_name = $name + "的家族";
                }
                console.log(" info.inviteGuid=======>", info.inviteGuid)

                NetManager.getInstance().protocolos.char_create(info);

            }

            //this.close()
            document.body.ontouchend = function (event) { event.preventDefault() };
        }
        private getRandomName(): void {
            var str: string
            if(this.nameDic){
                str = this.nameDic.xing[float2int(this.nameDic.xingl * Math.random())];
                if(this._genderType == 0){
                    str += this.nameDic.nan[float2int(this.nameDic.nanl * Math.random())];
                }else{
                    str += this.nameDic.nv[float2int(this.nameDic.nvl * Math.random())];
                }
            }else{
                var s1: Array<string> = ['陈', '成', '程', '池', '褚', '淳于', '崔', '代', '单', '单于', '福', '澹台', '狄', '帝', '东', '龚', '东方', '东郭', '独孤', '杜', '端木', '段', '朵', '樊', '范'];
                var s2: Array<string> = ['傲风', '傲之', '霸', '柏舟', '半夏', '邦少', '彼岸', '伯光', '伯雷', '伯庸', '博风', '不败', '不悔', '展天', '残夜', '残竹', '沧海', '浩云', '皓轩', '皓月', '和风'];
    
                str = s1[float2int(s1.length * Math.random())] + s2[float2int(s2.length * Math.random())];
            }
            

            this.setNameLable(str);
        }
        private _nameStr: string;
        public setNameLable(str: string): void {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.nameUI.skinName, str, 16, TextAlign.CENTER, ColorType.Yellowffe9b4);
            if (this._mainType == 0) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.facUI.skinName, "家族:" + str + "的家族", 15, TextAlign.LEFT, ColorType.Yellowedce7e);
            }
            this._nameStr = str;
        }

        public close(): void {

            // if (this.chatHtmlInput.parentElement) {
            //     this.chatHtmlInput.value = "";
            //     document.body.removeChild(this.chatHtmlInput);
            // }

            UIManager.getInstance().removeUIContainer(this);

        }



    }
}  