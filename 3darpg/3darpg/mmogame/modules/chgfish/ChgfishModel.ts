module chgfish {
    export class ChgfishModel {

        private static _instance: ChgfishModel;
        public static getInstance(): ChgfishModel {
            if (!this._instance) {
                this._instance = new ChgfishModel();
            }
            return this._instance;
        }

        public constructor() {

        }

        private _itemAry: Array<RedPointNode>
        public addItem($node: RedPointNode) {
            if (!this._itemAry) {
                this._itemAry = new Array;
            }
            if ($node.id) {
                var tabred: tb.TB_red_point = tb.TB_red_point.get_TB_red_pointById($node.id);
                if (tabred && tabred.tip == 1) {
                    if (!this.hasitem($node.id)) {
                        $node.tab = tabred;
                        this._itemAry.push($node);
                        ModuleEventManager.dispatchEvent(new ChgfishEvent(ChgfishEvent.REFRESH_Chgfish_EVENT));
                    }
                }
            }
        }

        public removeItem($node: RedPointNode) {
            if (!this._itemAry) {
                this._itemAry = new Array;
                return;
            }
            if ($node.id) {
                var tabred: tb.TB_red_point = tb.TB_red_point.get_TB_red_pointById($node.id);
                if (tabred && tabred.tip == 1) {
                    var idx: number = this._itemAry.indexOf($node);
                    // console.log("--------------删除节点----------",idx,$node,this._itemAry);
                    if (idx != -1) {
                        this._itemAry.splice(idx, 1);
                        ModuleEventManager.dispatchEvent(new ChgfishEvent(ChgfishEvent.REFRESH_Chgfish_EVENT));
                    }
                }
            }
        }

        private hasitem($id: number): boolean {
            if (!this._itemAry) {
                return false;
            }
            for (var i = 0; i < this._itemAry.length; i++) {
                if (this._itemAry[i].id == $id) {
                    return true;
                }
            }
            return false;
        }
        /**
         * getList
         */
        public getList(): Array<RedPointNode> {
            if (!this._itemAry) {
                this._itemAry = new Array;
            }
            return this._itemAry;
        }
    }
}