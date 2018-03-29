var engine;
(function (engine) {
    var ui;
    (function (ui) {
        var IconManager = (function () {
            function IconManager() {
                this._dic = new Object;
                this._loadDic = new Object;
            }
            IconManager.getInstance = function () {
                if (!this._instance) {
                    this._instance = new IconManager();
                }
                return this._instance;
            };
            IconManager.prototype.getIconName = function (name, $fun, $info) {
                if ($info === void 0) { $info = null; }
                this.getIcon(geteqiconIconUrl(name), $fun, $info);
            };
            IconManager.prototype.getIcon = function (url, $fun, $info) {
                var _this = this;
                if ($info === void 0) { $info = null; }
                var uri = Scene_data.fileRoot + url;
                if (this._dic[uri]) {
                    if ($info) {
                        $fun(this._dic[uri], $info);
                    }
                    else {
                        $fun(this._dic[uri]);
                    }
                    return;
                }
                else if (!this._loadDic[uri]) {
                    this._loadDic[uri] = new Array;
                    this._loadDic[uri].push({ fun: $fun, info: $info });
                    var _img = new Image();
                    _img.onload = function () {
                        var loadList = _this._loadDic[uri];
                        for (var i = 0; i < loadList.length; i++) {
                            var obj = loadList[i];
                            if (obj.info) {
                                obj.fun(_img, obj.info);
                            }
                            else {
                                obj.fun(_img);
                            }
                        }
                        delete _this._loadDic[uri];
                        _this._dic[uri] = _img;
                    };
                    _img.src = uri;
                }
                else {
                    this._loadDic[uri].push({ fun: $fun, info: $info });
                }
            };
            IconManager.prototype.drawLoadImg = function ($ui, $url) {
            };
            /**
             * 绘制坐骑头像74*74
             * @param  $ui
             * @param  $id
             * @param gray
             * @param select
             */
            IconManager.prototype.drawMountIcon = function ($ui, $id, gray, select) {
                // var objskill: tb.TB_skill_base = tb.TB_skill_base.get_TB_skill_base($id);
                // var url: string = getSkillIconUrl(String(objskill.icon))
                if (gray === void 0) { gray = false; }
                if (select === void 0) { select = false; }
                IconManager.getInstance().getIcon(getMountIconUrl(String($id)), function ($img) {
                    var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx = ui.UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, ui.PuiData.SKILL_BG68, new Rectangle(3, 3, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 6, 6, 62, 62);
                    if (gray) {
                        ui.UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 74, 74));
                        UiDraw.cxtDrawImg(ctx, ui.PuiData.A_CHAIN, new Rectangle(4, 4, 65, 65), UIData.publicUi);
                    }
                    if (select) {
                        UiDraw.cxtDrawImg(ctx, ui.PuiData.CIRCL74, new Rectangle(0, 0, 74, 74), UIData.publicUi);
                    }
                    $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            };
            IconManager.prototype.drawTxtLabel = function ($ui, $str) {
                var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx = ui.UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, ui.PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
                LabelTextFont.writeSingleLabelToCtx(ctx, $str, 16, $rec.pixelWitdh - ctx.measureText($str).width - 15, 5, TextAlign.LEFT, ColorType.Orange7a2f21);
                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            };
            IconManager.prototype.drawCostTxtLabel = function ($ui, $str) {
            };
            IconManager.prototype.drawSkillIcon = function ($ui) {
            };
            IconManager.prototype.drawVip = function ($ui, vip) {
                IconManager.getInstance().getIcon(getVipIconUrl(vip), function ($img) {
                    var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx = ui.UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $img.width, $img.height);
                    $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            };
            return IconManager;
        }());
        ui.IconManager = IconManager;
    })(ui = engine.ui || (engine.ui = {}));
})(engine || (engine = {}));
//# sourceMappingURL=IconManager.js.map