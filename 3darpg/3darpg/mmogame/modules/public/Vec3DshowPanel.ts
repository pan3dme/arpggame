class Vec3DshowPanel extends UIConatiner {
    private _wtRender: UIRenderComponent
    // private _baseRender: UIRenderComponent;
    private _midRender: UIRenderComponent

    public constructor() {
        super();
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.center = 0;
        this.middle = 0;

        //公共资源纹理
        this._wtRender = new UIRenderComponent;
        this.addRender(this._wtRender);

        this._midRender = new UIRenderComponent;
        this.addRender(this._midRender);
        // this._baseRender = new UIRenderComponent;
        // this.addRender(this._baseRender)


        GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._wtRender.uiAtlas = $publicbgUiAtlas;
            this._midRender.setInfo("ui/uidata/PopTimeout/systemtrailer.xml", "ui/uidata/PopTimeout/systemtrailer.png", () => { this.loadConfigCom() });
        });
    }

    private _complete: boolean;
    private guiBg0: UICompenent
    private useBtn: UICompenent
    private role: UICompenent
    private a_info: UICompenent
    private a_name: UICompenent
    private btn_txt: FrameCompenent
    private loadConfigCom(): void {
        this._complete = true;

        // this._baseRender.uiAtlas = this._midRender.uiAtlas;

        this.guiBg0 = this.addEvntBut("baseBg", this._wtRender);//半透明背景，不可点击

        this.useBtn = this.addEvntButUp("but_2", this._wtRender);  //使用按钮背景
        this.setUiSizeByName(this.useBtn, "btn");

        this._wtRender.applyObjData();

        var renderLevel: UIRenderComponent = this._midRender;
        this.addChild(<UICompenent>renderLevel.getComponent("a_bg"));
        this.btn_txt = <FrameCompenent>this.addChild(renderLevel.getComponent("btn_txt"));
        this.a_info = this.addChild(<UICompenent>renderLevel.getComponent("a_info"));
        this.a_name = this.addChild(<UICompenent>renderLevel.getComponent("a_name"));
        this.role = this.addChild(<UICompenent>renderLevel.getComponent("role"));
        this.role.isVirtual = true;
        this.role.addEventListener(InteractiveEvent.Down, this.A_left_bg_MouseDown, this);
        this.addPersonChar();
        this.refresh();
        this.resize();
    }

    private setUiSizeByName($ui: UICompenent, $name: string): void {
        var $temp: UICompenent = this._midRender.getComponent($name);
        $ui.x = $temp.x
        $ui.y = $temp.y
        $ui.width = $temp.width
        $ui.height = $temp.height
    }

    public resize(): void {
        if (this.guiBg0) {
            this.guiBg0.top = 0
            this.guiBg0.left = 0
            this.guiBg0.y = 0;
            this.guiBg0.x = 0;
            this.guiBg0.height = Scene_data.stageHeight / UIData.Scale;
            this.guiBg0.width = Scene_data.stageWidth / UIData.Scale;
            this.resizeRole();
        }
        super.resize();
    }

    private _rotationFun: Function;
    private addPersonChar(): void {
        this.showDisPlay = new Person2DChar();
        // this.showDisPlay = new sb.ShenBingDisp2D();
        this._midRender.addModel(this.showDisPlay);
        this._rotationFun = (d: number) => { this.rotationRole(); }

        // this.refreshRole();

    }


    private _lastMouseX: number = 0;
    private _lastRoleRotatioinY: number = 0;
    // private showDisPlay: sb.ShenBingDisp2D;
    private showDisPlay: Person2DChar;
    private A_left_bg_MouseDown(evt: InteractiveEvent): void {
        this._lastMouseX = evt.x;
        this._lastRoleRotatioinY = this.showDisPlay.rotationY;

        Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
        Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);

    }
    private A_left_bg_MouseMove(evt: InteractiveEvent): void {
        this.showDisPlay.rotationY = this._lastRoleRotatioinY - (evt.x - this._lastMouseX);
    }
    private A_left_bg_MouseUp(evt: InteractiveEvent): void {
        Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
        Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
    }
    private rotationRole(): void {
        this.showDisPlay.rotationY -= 0.5;
    }

    private resizeRole(): void {

        if (this.showDisPlay) {
            this.showDisPlay.resize();
            this.showDisPlay.scale = this._scale * UIData.Scale;
            this.showDisPlay.rotationY = 0
            this.showDisPlay.y = this._posy * UIData.Scale;

        }
    }
    public changeButEnd(): void {
        UIManager.getInstance().removeUIContainer(this);
        GuidData.player.resetSystemItem();
        ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
    }
    protected butClik(evt: InteractiveEvent): void {
        switch (evt.target) {
            case this.guiBg0:
                break;
            case this.useBtn:
                //根据state来确定具体执行什么操作
                if (this._vo.state == 0) {
                    switch (this._vo.id) {
                        case 1:
                            ModulePageManager.openPanel(SharedDef.MODULE_DIVINE, null);
                            break;
                        case 2:
                           // ModulePageManager.openPanel(SharedDef.MODULE_MOUNT, null);
                            this.changeButEnd();

                            break;
                        case 3:
                            ModulePageManager.openPanel(SharedDef.MODULE_DIVINE, null);
                            break;
                        default:
                            console.log("没有设置");
                            break;
                    }
                  //  NetManager.getInstance().protocolos.divine_switch(this._vo.id);
                } else if (this._vo.state == 1) {
                    NetManager.getInstance().protocolos.ride_mount();
                }
                this.close();
            default:
                break;
        }
    }
    private close(): void {
        UIManager.getInstance().removeUIContainer(this);

    }
    private _posy:number;
    private _scale:number;
    public refresh(): void {
        if (this._complete) {
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_name.skinName, "[d4e8ff]" + this._vo.name, 16, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_info.skinName, "[d4e8ff]" + this._vo.info, 16, TextAlign.CENTER);
            this.btn_txt.goToAndStop(this._vo.state);

            // this.showDisPlay.setAvatar(5001);
            // var $sex: number;
            // if ($proptabvo.sex == 1) {
            //     $sex = 10001
            // } else if ($proptabvo.sex == 2) {
            //     $sex = 10011
            // }
            if (this._vo.type == 1) {
                this.showDisPlay.showAvatarVisibel = false
                this.showDisPlay.setAvatar(6302);


                this.showDisPlay.setWeaponByAvatar(this._vo.modelid);


                this._scale = 4
                this._posy = 30
            } else {
                this.showDisPlay.showAvatarVisibel = true

                this.showDisPlay.removePart(SceneChar.WEAPON_PART);

                this.showDisPlay.setAvatar(this._vo.modelid);
                this._scale = 3
                this._posy = -35
            }

            this.resizeRole();


        }
    }

    private static _instance: Vec3DshowPanel;
    public static getInstance(): Vec3DshowPanel {
        if (!this._instance) {
            this._instance = new Vec3DshowPanel();
        }
        return this._instance;
    }

    private _vo: vec3DshowVo;
    public show($vo: vec3DshowVo): void {

        this._vo = $vo;
        this.refresh();
        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
        }
   
    }
}

class vec3DshowVo {
    public id: number //计划存储神兵表id
    public modelid: number //模型id
    public type: number //类型    1：武器类    2：模型、装备类
    public name: string
    public info: string
    public state: number //0:装备  1:骑乘  2：关闭
}