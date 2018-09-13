class RedPointManager {
    private static _instance: RedPointManager;
    public static getInstance(): RedPointManager {
        if (!this._instance) {
            this._instance = new RedPointManager();
        }
        return this._instance;
    }

    private _dic: any = new Object;
    private _root: RedPointNode;
    public init(): void {
        this._root = new RedPointNode;
        this._root.isRoot = true;

        var size: number = TableData.getInstance().getTabMaxID(TableData.tb_red_point);
        for (var i: number = 1; i <= size; i++) {
            var obj: any = TableData.getInstance().getData(TableData.tb_red_point, i);
            if (obj && obj.parent >= 0) {
                var node: RedPointNode = new RedPointNode;
                node.id = obj.id;
                node.name = obj.desc;
                if (obj.parent) {
                    node.parent = this._dic[obj.parent];
                } else {
                    node.parent = this._root;
                }
                node.parent.addChild(node);
                if (obj.list) {
                    node.isList = true;
                }
                this._dic[obj.id] = node;
            }
        }
        this.initAtlas();
    }
    public uiAtlas: UIAtlas;
    public initAtlas(): void {
        var atlas: UIAtlas = new UIAtlas();
        var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(64, 64);
        UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(0, 0, 17, 16), UIData.publicUi);
        UiDraw.cxtDrawImg(ctx, PuiData.A_JIANTOU, new Rectangle(20, 0, 26, 33), UIData.publicUi);
        var textRes: TextureRes = TextureManager.getInstance().getCanvasTexture(ctx);
        atlas.textureRes = textRes;
        atlas.configData = new Array;
        atlas.layoutData = new Object;

        atlas.configData.push(this.getConfigData("Style", new Rectangle(0, 0, 17, 16), 64, 64));
        atlas.configData.push(this.getConfigData("Style1", new Rectangle(20, 0, 26, 33), 64, 64));


        atlas.layoutData["s0"] = this.getLayoutData(new Rectangle(0, 0, 17, 16), "Style", "style");
        atlas.layoutData["s1"] = this.getLayoutData(new Rectangle(0, 0, 26, 33), "Style1", "style1");
        this.uiAtlas = atlas;
    }

    public getLayoutData(rec: Rectangle, skinName: string, texName: string): any {
        var ary: any = new Array;
        var recObj: any = new Object;
        recObj.type = 0;
        recObj.rect = rec;
        recObj.dataItem = [skinName];
        recObj.name = texName;
        ary.push(recObj)
        recObj.item = ary;
        return { item: [recObj] };
    }

    public getConfigData(name: string, rec: Rectangle, width: number, height: number): any {
        var obj: any = new Object;
        obj.x = rec.x / width;
        obj.y = rec.y / height;
        obj.width = rec.width / width;
        obj.height = rec.height / height;
        obj.ow = rec.width;
        obj.oh = rec.height;
        obj.ox = rec.x;
        obj.oy = rec.y;
        obj.type = 0;
        obj.cellX = 0;
        obj.cellY = 0;
        obj.name = name;
        return obj;
    }

    public getNodeByID($id: number): RedPointNode {
        return this._dic[$id];
    }



}

class RedPointRender extends UIRenderComponent {
    public constructor() {
        super();
        this.uiAtlas = RedPointManager.getInstance().uiAtlas;
    }
    private _getSrcList: Array<RedPointCompenent> = new Array;
    public getRedPointUI($container: UIConatiner, $nodeID: number, $v2d: Vector2D, $style: string = "style"): RedPointCompenent {
        var ui: RedPointCompenent = this.getRedPointComponent($style);
        ui.preParent = $container;
        ui.x = $v2d.x - 16;
        ui.y = $v2d.y;
        if ($nodeID > 0) {
            var node: RedPointNode = RedPointManager.getInstance().getNodeByID($nodeID);
            node.bindUI(ui);
            ui.node = node;
        }
        return ui;
    }
    public getRedPointComponent($uiName: string): RedPointCompenent {
        var obj: any = this.uiAtlas.getLayoutData($uiName);

        var ui: RedPointCompenent = this.creatRedPointComponent(obj.dataItem[0]);
        ui.width = obj.rect.width;
        ui.height = obj.rect.height;
        ui.x = obj.rect.x;
        ui.y = obj.rect.y;

        ui.baseRec = obj.rect;
        ui.name = $uiName;
        this._getSrcList.push(ui);
        return ui;
    }

    public creatRedPointComponent($skinName: string): RedPointCompenent {
        var ui: RedPointCompenent = new RedPointCompenent();
        ui.skinName = $skinName;
        var rec: UIRectangle = this.uiAtlas.getRec($skinName);

        ui.tr.setRec(rec);
        ui.width = rec.pixelWitdh;
        ui.height = rec.pixelHeight;

        ui.uiRender = this;
        return ui;
    }

    public dispose(): void {
        this.uiAtlas = null;
        for (var i: number = 0; i < this._getSrcList.length; i++) {
            var ui: RedPointCompenent = this._getSrcList[i];
            if (ui.node) {
                ui.node.unBind();
            }
        }
        super.dispose();
    }


    public update(): void {
        super.update();
        var targetScale: number = 1 + (Math.sin(TimeUtil.getTimer() * 0.008) + 1) * 0.1;
        for (var i: number = 0; i < this._uiList.length; i++) {
            this._uiList[i].uvScale = targetScale;
        }
    }

}

class RedPointCompenent extends UICompenent {
    //public redPointContainer: UIConatiner;
    public node: RedPointNode;
    public constructor() {
        super();
    }
    // public show(): void {
    //     this.redPointContainer.addChild(this);
    // }
    // public hide(): void {
    //     this.redPointContainer.removeChild(this);
    // }

    public bindNode($nodeID: number): void {
        if (this.node) {
            this.node.unBind();
        }
        var node: RedPointNode = RedPointManager.getInstance().getNodeByID($nodeID);
        node.bindUI(this);
        this.node = node;
    }

    public applyRenderSize(): void {
        if (!this.parent) {
            return;
        }

        this.renderX = this.absoluteX / Scene_data.stageWidth;
        this.renderY = this.absoluteY / Scene_data.stageHeight;

        this.renderWidth = this.absoluteWidth / Scene_data.stageWidth;
        this.renderHeight = this.absoluteHeight / Scene_data.stageHeight;


        var $vt: number = Math.abs(this._uvScale);
        this.renderData[0] = this.renderX + this.renderWidth * (1 - $vt) * 0.5;
        this.renderData[1] = this.renderY + this.renderHeight * (1 - $vt) * 0.5;
        this.renderData[2] = this.renderWidth * this.scale * $vt;
        this.renderData[3] = this.renderHeight * this.scale * $vt;

        this.renderData2[0] = this.tr.width;
        this.renderData2[1] = this.tr.height;
        this.renderData2[2] = this.tr.x;
        this.renderData2[3] = this.tr.y;


        this.uiRender.makeRenderDataVc(this.vcId)

        // 
    }
}

class RedPointEvent extends BaseEvent {
    public node:RedPointNode;
    public static SHOW_REDPOINT_EVENT: string = "SHOW_REDPOINT_EVENT";
    public static HIDE_REDPOINT_EVENT: string = "HIDE_REDPOINT_EVENT";
}

class RedPointNode {
    public parent: RedPointNode;
    public children: Array<RedPointNode> = new Array;
    public isList: boolean = false;
    public isRoot: boolean = false;
    public id: number;
    public name: string;
    public _show: boolean = false;
    private _ui: UICompenent;
    public data: any;
    public tab: tb.TB_red_point;

    public addChild($sun: RedPointNode): void {
        $sun.parent = this;
        this.children.push($sun);
    }

    public removeAllChild(): void {
        for (var i: number = 0; i < this.children.length; i++) {
            this.children[i].parent = null;
        }
        this.children = [];
    }

    public set show(val: boolean) {
        if (this._show == val) {
            return;
        }
        this._show = val;
        this.applyUI();
        if (this.parent) {
            if (val) {
                this.parent.show = true;
            } else {
                this.parent.sunHide();
            }
        }
        var evt: RedPointEvent;
        if (val) {
            evt = new RedPointEvent(RedPointEvent.SHOW_REDPOINT_EVENT);
            evt.node = this;
            ModuleEventManager.dispatchEvent(evt);
        } else {
            evt = new RedPointEvent(RedPointEvent.HIDE_REDPOINT_EVENT);
            evt.node = this;
            ModuleEventManager.dispatchEvent(evt);
        }

    }

    public sunHide(): void {
        for (var i: number = 0; i < this.children.length; i++) {
            if (this.children[i].show) {
                return;
            }
        }
        this.show = false;
    }

    public applyUI(): void {
        if (this._ui) {
            if (this._show) {
                this._ui.preShow();
            } else {
                this._ui.preHide();
            }
        }
    }

    public get show(): boolean {
        return this._show;
    }

    public bindUI($ui: UICompenent): void {
        this._ui = $ui;
        this.applyUI();
    }
    public unBind(): void {
        if(this._ui){
            this._ui.preHide();
        }
        this._ui = null;
    }

}