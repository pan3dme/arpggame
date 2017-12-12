var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var login;
(function (login) {
    var LoginChar = /** @class */ (function (_super) {
        __extends(LoginChar, _super);
        function LoginChar() {
            return _super.call(this) || this;
        }
        return LoginChar;
    }(Person2DChar));
    var LoginNewPanel = /** @class */ (function (_super) {
        __extends(LoginNewPanel, _super);
        function LoginNewPanel() {
            var _this = _super.call(this) || this;
            _this._mainType = 1;
            _this._raceBgPos = [[18, 89], [30, 229], [55, 357]];
            _this._raceBgSelPos = [-15, -13];
            _this._roYNum = 0;
            _this._raceType = 0;
            _this._genderType = 0;
            _this.genderUint = 1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baImg = new UIBackImg();
            _this._baImg.setImgInfo("ui/load/charbg.jpg", 1024, 512);
            _this.addRender(_this._baImg);
            _this._baseBgRender = new UIRenderComponent();
            _this.addRender(_this._baseBgRender);
            _this._bgRender = new UIRenderComponent();
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._baseUiAtlas = new UIAtlas();
            _this._leftTop = new UIVirtualContainer();
            _this._leftTop.width = _this.width;
            _this._leftTop.height = _this.height;
            _this._leftTop.left = 0;
            _this._leftTop.top = 0;
            _this.addVirtualContainer(_this._leftTop);
            _this._rightTop = new UIVirtualContainer();
            _this._rightTop.width = _this.width;
            _this._rightTop.height = _this.height;
            _this._rightTop.right = 0;
            _this._rightTop.top = 0;
            _this.addVirtualContainer(_this._rightTop);
            _this._leftBottom = new UIVirtualContainer();
            _this._leftBottom.width = _this.width;
            _this._leftBottom.height = _this.height;
            _this._leftBottom.left = 0;
            _this._leftBottom.bottom = 0;
            _this.addVirtualContainer(_this._leftBottom);
            _this._rightBottom = new UIVirtualContainer();
            _this._rightBottom.width = _this.width;
            _this._rightBottom.height = _this.height;
            _this._rightBottom.right = 0;
            _this._rightBottom.bottom = 0;
            _this.addVirtualContainer(_this._rightBottom);
            Engine.resReady();
            return _this;
        }
        LoginNewPanel.prototype.dispose = function () {
            this._baImg.dispose();
            this._baImg = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
        };
        LoginNewPanel.prototype.setData = function ($data) {
            var _this = this;
            this._data = $data;
            if (this._data.queen_name != "") {
                this._mainType = 1;
            }
            this._baseUiAtlas.setInfo("ui/uidata/login/loginnew.xml", "ui/uidata/login/loginnew.png", function () { _this.loadConfigCom(); });
        };
        LoginNewPanel.prototype.initUI = function () {
            //this.addUIList([, "t_bg2"], this._baseBgRender);
            this.bg1 = this._baseBgRender.getComponent("t_bg1");
            this._leftTop.addChild(this.bg1);
            this.bg2 = this._baseBgRender.getComponent("t_bg2");
            this._rightTop.addChild(this.bg2);
            var back1 = this._bgRender.getComponent("t_back1");
            this._leftTop.addChild(back1);
            var back2 = this._bgRender.getComponent("t_back2");
            this._leftTop.addChild(back2);
            var info0 = this._bgRender.getComponent("t_info0");
            this._rightBottom.addChild(info0);
            //this.addChild(this._bgRender.getComponent("t_name_bg"));
            // this.addUIList(["t_back1", "t_back2", "t_info0", "t_name_bg"], this._bgRender);
            this._qiangkeBtn = this._baseRender.getComponent("t_qiangke");
            this.addChild(this._qiangkeBtn);
            this._qiangkeBtn.addEventListener(InteractiveEvent.Down, this.raceClick, this);
            this._jiankeBtn = this._baseRender.getComponent("t_jianke");
            this.addChild(this._jiankeBtn);
            this._jiankeBtn.addEventListener(InteractiveEvent.Down, this.raceClick, this);
            this._daoshiBtn = this._baseRender.getComponent("t_daoshi");
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
                this.genderBg = this._baseRender.getComponent("t_sex_bg");
                this._leftBottom.addChild(this.genderBg);
            }
            else {
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
            var raceRan = Math.random();
            var raceRanType = 0;
            if (raceRan < 0.333) {
                raceRan = 0;
            }
            else if (raceRanType < 0.666) {
                raceRan = 1;
            }
            else {
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
        };
        LoginNewPanel.prototype.initQueenUI = function () {
            var _this = this;
            this.iconUI = this._baseRender.getComponent("t_icon");
            this._rightTop.addChild(this.iconUI);
            this.facUI = this._baseRender.getComponent("t_fac");
            this._rightTop.addChild(this.facUI);
            this.queenUI = this._baseRender.getComponent("t_queen");
            this._rightTop.addChild(this.queenUI);
            LoadManager.getInstance().load(getQueenIconUrl(this._data.icon), LoadManager.IMG_TYPE, function ($img) {
                var rec = _this._baseUiAtlas.getRec(_this.iconUI.skinName);
                var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                //UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 66, 66), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 0, 0, 60, 60);
                _this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
            });
            if (this._mainType == 1) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.facUI.skinName, "家族:" + getBaseName(this._data.faction_name), 15, TextAlign.LEFT, ColorType.Yellowedce7e);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.queenUI.skinName, "女王:" + getBaseName(this._data.queen_name), 15, TextAlign.LEFT, ColorType.Yellowedce7e);
            }
        };
        LoginNewPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.nameBgUI:
                    InputPanel.show(function ($str) { _this.setNameLable($str); }, "");
                    break;
                case this.randomBtn:
                    this.getRandomName();
                    break;
                case this.enterBtn:
                    this.enterGame();
                    break;
            }
        };
        LoginNewPanel.prototype.addChar = function () {
            var _this = this;
            this.char = new LoginChar();
            this.char.bindZero = true;
            this.char.setCamData(-10, -90, 800);
            //this.char.scale = 2.5;
            this._baseRender.addModel(this.char);
            this.char.lightData = [[0.2, 0.2, 0.2 * 202 / 255], [-0.6126, 0.783, -0.10], [0.5, 0.5, 0.5 * 202 / 255]];
            //this.char.addPart("sss", "none", getModelUIUrl("2001"));
            //this.char.addPart("sss", "none", getModelUrl("1"));
            TimeUtil.addFrameTick(function () {
                _this._roYNum += 0.01;
                _this.char.rotationY = 30 * Math.sin(_this._roYNum);
            });
            this.resize();
        };
        LoginNewPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.char) {
                this.char.resize();
                this.char.scale = 1.8 * UIData.Scale;
                this.char.y = -120 * UIData.Scale;
            }
            if (this.bg1 && this.bg2) {
                this.bg1.height = Scene_data.stageHeight / UIData.Scale;
                this.bg2.height = (Scene_data.stageHeight - 60) / UIData.Scale;
            }
        };
        LoginNewPanel.prototype.raceClick = function ($e) {
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
        };
        LoginNewPanel.prototype.genderClick = function ($e) {
            switch ($e.target) {
                case this.maleBtn:
                    this.setGenderType(0);
                    break;
                case this.femaleBtn:
                    this.setGenderType(1);
                    break;
            }
        };
        LoginNewPanel.prototype.setRaceType = function ($type) {
            if ($type == 0) {
                this._jiankeBtn.goToAndStop(1);
                this._qiangkeBtn.goToAndStop(0);
                this._daoshiBtn.goToAndStop(0);
                this._raceSelBg.setPos(this._raceBgPos[0][0] + this._raceBgSelPos[0], this._raceBgPos[0][1] + this._raceBgSelPos[1]);
                this._raceUnselBg1.setPos(this._raceBgPos[1][0], this._raceBgPos[1][1]);
                this._raceUnselBg2.setPos(this._raceBgPos[2][0], this._raceBgPos[2][1]);
            }
            else if ($type == 1) {
                this._jiankeBtn.goToAndStop(0);
                this._qiangkeBtn.goToAndStop(1);
                this._daoshiBtn.goToAndStop(0);
                this._raceUnselBg1.setPos(this._raceBgPos[0][0], this._raceBgPos[0][1]);
                this._raceSelBg.setPos(this._raceBgPos[1][0] + this._raceBgSelPos[0], this._raceBgPos[1][1] + this._raceBgSelPos[1]);
                this._raceUnselBg2.setPos(this._raceBgPos[2][0], this._raceBgPos[2][1]);
            }
            else if ($type == 2) {
                this._jiankeBtn.goToAndStop(0);
                this._qiangkeBtn.goToAndStop(0);
                this._daoshiBtn.goToAndStop(1);
                this._raceUnselBg1.setPos(this._raceBgPos[0][0], this._raceBgPos[0][1]);
                this._raceUnselBg2.setPos(this._raceBgPos[1][0], this._raceBgPos[1][1]);
                this._raceSelBg.setPos(this._raceBgPos[2][0] + this._raceBgSelPos[0], this._raceBgPos[2][1] + this._raceBgSelPos[1]);
            }
            this._raceType = $type;
            this.applyShow();
        };
        LoginNewPanel.prototype.setGenderType = function ($type) {
            // if ($type == 0) {
            //     this.maleBtn.selected = true;
            //     this.femaleBtn.selected = false;
            // } else if ($type == 1) {
            //     this.maleBtn.selected = false;
            //     this.femaleBtn.selected = true;
            // }
            var flag = false;
            if (this._genderType != $type) {
                flag = true;
            }
            this.genderBg.goToAndStop($type);
            this._genderType = $type;
            this.applyShow();
            if (flag) {
                this.getRandomName();
            }
        };
        LoginNewPanel.prototype.applyShow = function () {
            var modelID = 0;
            if (this._raceType == 0) {
                if (this._genderType == 0) {
                    modelID = 5;
                }
                else {
                    modelID = 6;
                }
                this.char.setCamData(-10, -20, 800);
            }
            else if (this._raceType == 1) {
                if (this._genderType == 0) {
                    modelID = 1;
                }
                else {
                    modelID = 2;
                }
                this.char.setCamData(-10, -90, 800);
            }
            else if (this._raceType == 2) {
                if (this._genderType == 0) {
                    modelID = 3;
                }
                else {
                    modelID = 4;
                }
                this.char.setCamData(-10, 0, 800);
            }
            this.genderUint = modelID;
            this.char.addPart("sss", "none", getModelUrl(String(50020 + modelID)));
            //this.char.addPart("sss", "none", getModelUrl(String(1)));
        };
        LoginNewPanel.prototype.loadConfigCom = function () {
            this._baseBgRender.uiAtlas = this._baseUiAtlas;
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.initUI();
            this.timeEnter();
            this.loadName();
        };
        LoginNewPanel.prototype.loadName = function () {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "data/gamename.txt", LoadManager.XML_TYPE, function ($str) {
                var ary = $str.split("\n");
                _this.nameDic = new Object;
                _this.nameDic.xing = ary[0].split(",");
                _this.nameDic.nan = ary[1].split(",");
                _this.nameDic.nv = ary[2].split(",");
                _this.nameDic.xingl = _this.nameDic.xing.length;
                _this.nameDic.nanl = _this.nameDic.nan.length;
                _this.nameDic.nvl = _this.nameDic.nv.length;
                _this.getRandomName();
            });
        };
        LoginNewPanel.prototype.timeEnter = function () {
            var _this = this;
            var num = 30;
            var fun = function () {
                num--;
                LabelTextFont.writeSingleLabel(_this._baseUiAtlas, _this.timeUI.skinName, String(num), 16, TextAlign.RIGHT, ColorType.colorce0a00);
                if (num == 0) {
                    _this.enterGame();
                    TimeUtil.removeTimeTick(fun);
                }
            };
            TimeUtil.addTimeTick(1000, fun);
        };
        LoginNewPanel.prototype.enterGame = function ($e) {
            if ($e === void 0) { $e = null; }
            var $name = this._nameStr;
            if ($name.length > 6) {
                AlertUtil.show("名字不能超过6个字符", "", null, 1);
                return;
            }
            if ($name.length) {
                var info = new char_create_info();
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
                }
                else {
                    info.faction_name = $name + "的家族";
                }
                console.log(" info.inviteGuid=======>", info.inviteGuid);
                NetManager.getInstance().protocolos.char_create(info);
            }
            //this.close()
            document.body.ontouchend = function (event) { event.preventDefault(); };
        };
        LoginNewPanel.prototype.getRandomName = function () {
            var str;
            if (this.nameDic) {
                str = this.nameDic.xing[float2int(this.nameDic.xingl * Math.random())];
                if (this._genderType == 0) {
                    str += this.nameDic.nan[float2int(this.nameDic.nanl * Math.random())];
                }
                else {
                    str += this.nameDic.nv[float2int(this.nameDic.nvl * Math.random())];
                }
            }
            else {
                var s1 = ['陈', '成', '程', '池', '褚', '淳于', '崔', '代', '单', '单于', '福', '澹台', '狄', '帝', '东', '龚', '东方', '东郭', '独孤', '杜', '端木', '段', '朵', '樊', '范'];
                var s2 = ['傲风', '傲之', '霸', '柏舟', '半夏', '邦少', '彼岸', '伯光', '伯雷', '伯庸', '博风', '不败', '不悔', '展天', '残夜', '残竹', '沧海', '浩云', '皓轩', '皓月', '和风'];
                str = s1[float2int(s1.length * Math.random())] + s2[float2int(s2.length * Math.random())];
            }
            this.setNameLable(str);
        };
        LoginNewPanel.prototype.setNameLable = function (str) {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.nameUI.skinName, str, 16, TextAlign.CENTER, ColorType.Yellowffe9b4);
            if (this._mainType == 0) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.facUI.skinName, "家族:" + str + "的家族", 15, TextAlign.LEFT, ColorType.Yellowedce7e);
            }
            this._nameStr = str;
        };
        LoginNewPanel.prototype.close = function () {
            // if (this.chatHtmlInput.parentElement) {
            //     this.chatHtmlInput.value = "";
            //     document.body.removeChild(this.chatHtmlInput);
            // }
            UIManager.getInstance().removeUIContainer(this);
        };
        return LoginNewPanel;
    }(UIPanel));
    login.LoginNewPanel = LoginNewPanel;
})(login || (login = {}));
//# sourceMappingURL=LoginNewPanel.js.map