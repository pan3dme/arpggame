var pan2d;
(function (pan2d) {
    var Scene2dInit = /** @class */ (function () {
        function Scene2dInit() {
        }
        Scene2dInit.initData = function () {
            //替换SceneManager场景管理对象；
            pan2d.Override2dSceneManager.initConfig();
            //替换Engine引擎对象；
            pan2d.Override2dEngine.initConfig();
            Scene_data.fileRoot = " http://" + document.domain + "/res/";
            Engine.init(main.canvas); //初始化场景
            Engine.resetSize(main.canvas.width, main.canvas.height); //设置canvas大小
            Engine.initPbr();
            Scene2dInit.isConfig = true; //完成
            SceneManager.getInstance().ready = true; //场景update可以
            // new scenedis.CharModelShow();
            // new scenedis.CharSkillPlayModel();
            //  scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
            // this.addGroundPic();
            this.addRoleChar();
        };
        //添加角色
        Scene2dInit.addRoleChar = function () {
            for (var i = 0; i < 10; i++) {
                var $sc = new pan2d.Scene2dChar();
                $sc.setRoleUrl(getRoleUrl("50001"));
                //  $sc.setRoleUrl(getRoleUrl("pan003"));
                $sc.setWingByID("901");
                $sc.setMountById("4103");
                $sc.setWeaponByAvatar(50011);
                $sc.play(CharAction.STAND_MOUNT);
                $sc.rotationY = random(360);
                $sc.set2dPos(i * 100, i * 100); //坐标
                SceneManager.getInstance().addMovieDisplay($sc);
            }
        };
        //添加地面
        Scene2dInit.addGroundPic = function () {
            for (var i = 0; i < 80; i++) {
                var $url = Scene_data.fileRoot + "pan/zymap2d/scene/1007/maps/" + Math.floor(i / 10) + "_" + Math.floor(i % 10) + ".jpg";
                var $dis = pan2d.GroundModel.getInstance().addGroundPicByeUrl();
                //图片坐标和高宽
                $dis.width = 200;
                $dis.height = 200;
                $dis.x = Math.floor(i % 10) * $dis.width;
                $dis.y = Math.floor(i / 10) * $dis.height;
                $dis.setPicUrl($url); //图片地址
            }
        };
        Scene2dInit.addGridLineSprite = function () {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            SceneManager.getInstance().addDisplay(new GridLineSprite());
        };
        Scene2dInit.isConfig = false;
        return Scene2dInit;
    }());
    pan2d.Scene2dInit = Scene2dInit;
})(pan2d || (pan2d = {}));
//# sourceMappingURL=Scene2dInit.js.map