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
var mapnew;
(function (mapnew) {
    var MapnewLisDataMesh = /** @class */ (function () {
        function MapnewLisDataMesh() {
        }
        return MapnewLisDataMesh;
    }());
    mapnew.MapnewLisDataMesh = MapnewLisDataMesh;
    var MapnewListRender = /** @class */ (function (_super) {
        __extends(MapnewListRender, _super);
        function MapnewListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MapnewListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.G_BG = this.creatGrid9SUI($bgRender, MapnewListRender.baseAtlas, "G_BG", 2, 0, 170, 34, 5, 5);
            $container.addChild(this.G_BG);
            this.G_BG.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.G_NAME = this.creatSUI($baseRender, MapnewListRender.baseAtlas, "G_NAME", 35, 8, 100, 18);
            $container.addChild(this.G_NAME);
        };
        MapnewListRender.prototype.butClik = function (evt) {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                this.setSelect();
                var $MapNewEvent = new mapnew.MapNewEvent(mapnew.MapNewEvent.SELECT_MAP_NEW_CELL);
                $MapNewEvent.data = this.itdata.data;
                ModuleEventManager.dispatchEvent($MapNewEvent);
            }
        };
        MapnewListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        MapnewListRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this.G_BG.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.G_NAME.skinName);
        };
        Object.defineProperty(MapnewListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyRender();
                if (val) {
                    if (this.itdata && this.itdata.data) {
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        MapnewListRender.prototype.applyRender = function () {
            if (this.itdata && this.itdata.data) {
                var $MapnewLisDataMesh = this.itdata.data;
                if (this.itdata.id % 2 == 0) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.G_BG.skinName, UIData.publicUi, PuiData.LISTITEMBG);
                }
                else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.G_BG.skinName);
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.G_NAME.skinName, $MapnewLisDataMesh.txt, 16, TextAlign.CENTER);
            }
        };
        return MapnewListRender;
    }(SListItem));
    mapnew.MapnewListRender = MapnewListRender;
    var MapNewList = /** @class */ (function (_super) {
        __extends(MapNewList, _super);
        function MapNewList() {
            return _super.call(this) || this;
        }
        MapNewList.prototype.init = function ($uiAtlas) {
            MapnewListRender.baseAtlas = $uiAtlas;
            this.initData();
        };
        MapNewList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, MapnewListRender, 175, 35 * 6, 175, 35, 6, 128, 1024, 1, 9);
        };
        MapNewList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        MapNewList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return MapNewList;
    }(SList));
    mapnew.MapNewList = MapNewList;
    var MapNewPanel = /** @class */ (function (_super) {
        __extends(MapNewPanel, _super);
        function MapNewPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this.mapWalkLineComponent = new map.MapWalkLineComponent;
            _this.addRender(_this.mapWalkLineComponent);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this.upDataFun = function () { _this.upDataFrame(); };
            return _this;
        }
        MapNewPanel.prototype.applyLoad = function () {
            var _this = this;
            this._topRender.setInfo("ui/uidata/mapnew/mapnew.xml", "ui/uidata/mapnew/mapnew.png", function () { _this.loadConfigCom(); });
        };
        MapNewPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this.addChild(this._topRender.getComponent("a_map_name_bg"));
            this.a_big_pic_bg = this.addChild(this._midRender.getComponent("a_big_pic_bg"));
            this.a_map_pic = this.addEvntBut("a_map_pic", this._midRender);
            this.a_map_pic.x = this.a_big_pic_bg.x + 3;
            this.a_map_pic.y = this.a_big_pic_bg.y + 3;
            this.a_word_map_enter = this.addEvntButUp("a_word_map_enter", this._topRender);
            this.a_map_name_txt = this.addChild(this._topRender.getComponent("a_map_name_txt"));
            this.addChild(this._topRender.getComponent("a_left_bg_line"));
            this.a_self_pos_point = this.addChild(this._topRender.getComponent("a_self_pos_point"));
            this.a_right_tab_0 = this.addEvntButUp("a_right_tab_0", this._midRender);
            this.a_right_tab_1 = this.addEvntButUp("a_right_tab_1", this._midRender);
            this.a_tab_name0 = this.addChild(this._topRender.getComponent("a_tab_name0"));
            this.a_tab_name1 = this.addChild(this._topRender.getComponent("a_tab_name1"));
            this.a_right_list_bg = this.addChild(this._bottomRender.getComponent("a_right_list_bg"));
            this.initList();
            this.applyLoadComplete();
        };
        MapNewPanel.prototype.initList = function () {
            this.mapNewList = new MapNewList;
            this.mapNewList.init(this._midRender.uiAtlas);
        };
        MapNewPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.mapNewList.show();
            this.refrish();
            this.setTabType(1);
            NetManager.getInstance().protocolos.show_map_line();
            TimeUtil.addTimeTick(50, this.upDataFun);
        };
        MapNewPanel.prototype.refrish = function () {
            this.mapWalkLineComponent.makeLineUiItem(null);
            this.mathMinMapRect();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name_txt.skinName, ColorType.Yellowffe9b4 + GuidData.map.tbMapVo.name, 16);
            this._topRender.uiAtlas.upDataPicToTexture("ui/load/map/" + GuidData.map.getMapID() + ".jpg", this.a_map_pic.skinName);
        };
        MapNewPanel.prototype.setTabType = function (value) {
            if (this.typeNum == value) {
                return;
            }
            this.typeNum = value;
            this.mapNewList.refreshData(new Array());
            if (value == 0) {
                this.a_right_tab_0.goToAndStop(1);
                this.a_right_tab_1.goToAndStop(0);
                this.a_right_tab_1.y = 360;
                this.a_right_list_bg.y = 135;
                NetManager.getInstance().protocolos.show_map_line();
            }
            else {
                this.a_right_tab_0.goToAndStop(0);
                this.a_right_tab_1.goToAndStop(1);
                this.a_right_tab_1.y = 140;
                this.a_right_list_bg.y = 175;
                this.getMapCharList();
            }
            this.a_tab_name0.y = this.a_right_tab_0.y + 8;
            this.a_tab_name1.y = this.a_right_tab_1.y + 8;
            this.resize();
        };
        MapNewPanel.prototype.getMapCharList = function () {
            var $mapId = GuidData.map.getMapID();
            var $itemArr = new Array();
            var $tb_map_navigation = tb.TB_map_navigation.get_TB_map_navigation($mapId);
            for (var i = 0; i < $tb_map_navigation.navi.length; i++) {
                var $tb_map_object = tb.TB_map_object.get_TB_map_object($tb_map_navigation.navi[i]);
                var $cellVo = new SListItemData;
                var $temp = new MapnewLisDataMesh();
                $temp.txt = ColorType.Brown7a2f21 + $tb_map_object.name;
                $temp.type = 1;
                $temp.data = $tb_map_object;
                $cellVo.data = $temp;
                $cellVo.id = i;
                $itemArr.push($cellVo);
            }
            this.mapNewList.refreshData($itemArr);
        };
        MapNewPanel.prototype.selectmapOBJ = function ($tb) {
            console.log("就是这个地方", $tb);
            var pos3d = AstarUtil.getWorldPosByStart2D($tb.position);
            this.sendWalkToPos(pos3d);
        };
        MapNewPanel.prototype.refreshLine = function ($vo) {
            var $line_info = new line_info();
            $line_info.rate = 0; //默认
            $line_info.lineNo = 1;
            for (var i = 0; i < $vo.info.length; i++) {
                if ($vo.info[i].lineNo == GuidData.map.getLineID()) {
                    $line_info = $vo.info[i];
                }
            }
            var $showStr = ColorType.Orange7a2f21 + $line_info.lineNo + "线" + "(" + this.getRateStr($line_info.rate) + ")";
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_tab_name0.skinName, $showStr, 18);
            if (this.typeNum == 0) {
                this.mapNewList.refreshData(this.getLineData($vo));
            }
        };
        MapNewPanel.prototype.getRateStr = function (value) {
            var $rateStr = "繁忙";
            if (value < 60) {
                $rateStr = "顺畅";
            }
            if (value > 95) {
                $rateStr = "拥挤";
            }
            return $rateStr;
        };
        MapNewPanel.prototype.getLineData = function ($vo) {
            var $itemArr = new Array();
            for (var i = 0; i < 10; i++) {
                if ($vo.info[i] || i < 4) {
                    var rate = 0;
                    if ($vo.info[i]) {
                        rate = $vo.info[i].rate;
                    }
                    var $cellVo = new SListItemData;
                    var $temp = new MapnewLisDataMesh();
                    $temp.txt = ColorType.Brown7a2f21 + (i + 1) + "线" + "(" + this.getRateStr(rate) + ")";
                    $temp.type = 0;
                    $temp.data = i + 1;
                    $cellVo.data = $temp;
                    $cellVo.id = i;
                    $itemArr.push($cellVo);
                }
            }
            return $itemArr;
        };
        MapNewPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.mapNewList) {
                this.mapNewList.left = this.a_right_list_bg.parent.x / UIData.Scale + this.a_right_list_bg.x;
                this.mapNewList.top = this.a_right_list_bg.parent.y / UIData.Scale + this.a_right_list_bg.y + 5;
            }
        };
        MapNewPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break;
                case this.a_right_tab_0:
                    this.setTabType(0);
                    break;
                case this.a_right_tab_1:
                    this.setTabType(1);
                    break;
                case this.a_word_map_enter:
                    this.hide();
                    ModuleEventManager.dispatchEvent(new mapnew.MapNewEvent(mapnew.MapNewEvent.SHOW_MAP_NEW_WORLD_EVENT));
                    break;
                case this.a_map_pic:
                    var hitv2 = new Vector2D;
                    console.log(this.a_map_pic.x, this.a_map_pic.y);
                    console.log(this.x, this.y);
                    console.log("---------------");
                    hitv2.x = evt.x / UIData.Scale - this.x / UIData.Scale;
                    hitv2.y = evt.y / UIData.Scale - this.y / UIData.Scale;
                    var hitV3 = this.uiPosToWorldPos(hitv2);
                    this.sendWalkToPos(hitV3);
                    break;
            }
        };
        MapNewPanel.prototype.sendWalkToPos = function ($hitPos) {
            var _this = this;
            var $item = AstarUtil.findPath3D(GameInstance.mainChar.getCurrentPos(), $hitPos);
            if ($item) {
                for (var i = 0; i < $item.length; i++) {
                    console.log($item[i], AstarUtil.isGridCanWalk($item[i]));
                }
                console.log($item);
                this.meshToWalkLine($item);
                MainCharControlModel.getInstance().setWalkPathFun($item, function () { _this.walkPathComplete(); });
            }
        };
        MapNewPanel.prototype.walkPathComplete = function () {
            this.meshToWalkLine(null);
        };
        MapNewPanel.prototype.meshToWalkLine = function ($arr) {
            var $walkItem = new Array();
            for (var i = 0; $arr && i < $arr.length; i++) {
                var pos3d = AstarUtil.getWorldPosByStart2D($arr[i]);
                var pos2d = this.worldPosToUiPos(pos3d);
                $walkItem.push(pos2d);
            }
            this.mapWalkLineComponent.makeLineUiItem($walkItem);
        };
        MapNewPanel.prototype.uiPosToWorldPos = function ($v2) {
            var $num512 = this.a_map_pic.width;
            var tx = this.a_map_pic.x + $num512 / 2;
            var ty = this.a_map_pic.y + $num512 / 2;
            var pos = new Vector3D;
            pos.x = (($v2.x - tx) * 2) / $num512 * this.minMapRect.width;
            pos.z = ((ty - $v2.y) * 2) / $num512 * this.minMapRect.width;
            return pos;
        };
        MapNewPanel.prototype.upDataFrame = function () {
            if (!this.hasStage) {
                TimeUtil.removeTimeTick(this.upDataFun);
            }
            else {
                this.resetPostion();
            }
        };
        MapNewPanel.prototype.mathMinMapRect = function () {
            var midu = AstarUtil.navmeshData.midu;
            var mapW = AstarUtil.navmeshData.astarItem[0].length;
            var mapH = AstarUtil.navmeshData.astarItem.length;
            var tw = AstarUtil.navmeshData.aPos.x + mapW * AstarUtil.navmeshData.midu;
            var th = AstarUtil.navmeshData.aPos.z + mapH * AstarUtil.navmeshData.midu;
            tw = Math.max(Math.abs(AstarUtil.navmeshData.aPos.x), Math.abs(tw));
            th = Math.max(Math.abs(AstarUtil.navmeshData.aPos.z), Math.abs(th));
            var bsew = Math.max(tw, th);
            bsew += 100;
            bsew = Math.round(bsew);
            var $infoRect = new Rectangle();
            $infoRect.x = -bsew;
            $infoRect.y = -bsew;
            $infoRect.width = bsew * 2;
            $infoRect.height = bsew * 2;
            $infoRect.x -= 1;
            $infoRect.y -= 1;
            $infoRect.width += 2;
            $infoRect.height += 2;
            $infoRect.width /= 2;
            $infoRect.height /= 2;
            this.minMapRect = $infoRect;
        };
        MapNewPanel.prototype.resetPostion = function () {
            var pos = GameInstance.mainChar.getCurrentPos();
            var pos2d = this.worldPosToUiPos(pos);
            this.a_self_pos_point.x = pos2d.x - this.a_self_pos_point.width / 2;
            this.a_self_pos_point.y = pos2d.y - this.a_self_pos_point.height / 2;
        };
        MapNewPanel.prototype.worldPosToUiPos = function (pos) {
            var $num512 = this.a_map_pic.width;
            var tx = this.a_map_pic.x + $num512 / 2;
            var ty = this.a_map_pic.y + $num512 / 2;
            tx = tx + (pos.x / this.minMapRect.width * $num512) / 2;
            ty = ty - (pos.z / this.minMapRect.width * $num512) / 2;
            return new Vector2D(tx, ty);
        };
        MapNewPanel.prototype.hide = function () {
            this.mapNewList.hide();
            UIManager.getInstance().removeUIContainer(this);
        };
        return MapNewPanel;
    }(WindowMinUi));
    mapnew.MapNewPanel = MapNewPanel;
})(mapnew || (mapnew = {}));
//# sourceMappingURL=MapNewPanel.js.map