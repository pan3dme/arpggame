

module CharShow {


    export class TpSceneModule extends Module {
        public getModuleName(): string {
            return "TpSceneModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new TpSceneProcessor()];
        }
    }
    export class TpSceneEvent extends BaseEvent {
        //展示面板
        public static SHOW_TP_SCENE_EVENT: string = "SHOW_TP_SCENE_EVENT";
        public static ENTER_SCENE_EVENT: string = "ENTER_SCENE_EVENT";
        public mapId: number

    }
    export class TpSceneProcessor extends BaseProcessor {
        public constructor() {
            super();
        }
        public getName(): string {
            return "TpSceneProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof TpSceneEvent) {
                var $tpMenuEvent: TpSceneEvent = <TpSceneEvent>$event;
                if ($tpMenuEvent.type == TpSceneEvent.SHOW_TP_SCENE_EVENT) {
                    this.addGridLineSprite();
                    var $role: string = getUrlParam("role")
                    if ($role) {
                        this.makeUrlParamList()
                    } else {
                        window.location.href = "index.html?role=50001&mount=4104&wing=902&&weapon=50011&action=0"
                    }
                    Scene_data.cam3D.distance = 250;
                }
            }
        }
        private makeUrlParamList(): void {
            //?role=50006&mount=5104&wing=901&&weapon=50011;
            var $sc: ModelSceneChar = new ModelSceneChar();
            var $role: string = getUrlParam("role")
            $sc.setRoleUrl(getRoleUrl($role));
            if (getUrlParam("mount")) {
                if (Number(getUrlParam("mount")) > 0) {
                    $sc.setMountById(getUrlParam("mount"));
                }
            }
            if (getUrlParam("wing")) {
                if (Number(getUrlParam("wing")) > 0) {
                    $sc.setWingByID(getUrlParam("wing"));
                }
            }
            if (Number(getUrlParam("weapon"))) {
                $sc.setWeaponByAvatar(Number(getUrlParam("weapon")));
            }
            SceneManager.getInstance().addMovieDisplay($sc);
            this.mainChar = $sc;
            var $actionId: number = Number(getUrlParam("action"));
            switch ($actionId) {
                case 1:
                    $sc.play(CharAction.WALK);
                    break
                case 2:
                    $sc.play(CharAction.DEATH);
                    break
                case 3:
                    $sc.play(CharAction.ATTACK_01);
                    break
                case 4:
                    $sc.play(CharAction.ATTACK_02);
                    break
                case 5:
                    $sc.play(CharAction.ATTACK_03);
                    break
                case 6:
                    $sc.play("m_attack_01");
                    break
                case 7:
                    $sc.play("m_attack_02");
                    break
                case 8:
                    $sc.play("m_attack_03");
                    break
                case 9:
                    $sc.play("m_attack_04");
                    break
                default:
                    $sc.play(CharAction.STANAD);
                    break
            }

            if (getUrlParam("mount")) {
                if (Number(getUrlParam("mount")) > 0) {
                    if ($actionId == 0) {
                        $sc.play(CharAction.STAND_MOUNT);
                    } else {
                        $sc.play(CharAction.WALK_MOUNT);
                    }
 
                }
            }
            
        }
        private mainChar: ModelSceneChar;
        private addGridLineSprite(): void {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            var $GridLineSprite: GridLineSprite = new GridLineSprite();
            $GridLineSprite.y = 0;
            SceneManager.getInstance().addDisplay($GridLineSprite);
            SceneManager.getInstance().ready = true;
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new TpSceneEvent(TpSceneEvent.SHOW_TP_SCENE_EVENT),
            ];
        }
    }
}