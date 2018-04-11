
module panui {


    export class MainUiPanle extends UIPanel {
    
        public _topRender: UIRenderComponent;


        public constructor() {
            super();

            this.width = 960;
            this.height = 540;

            this.top = 0;
            this.left = 0;



            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this.loadScenePanelH5UI();

        }
     

        private loadScenePanelH5UI(): void {
            this._topRender.uiAtlas = new UIAtlas();
            this._topRender.uiAtlas.setInfo("pan/test/football/playscene/playscene.xml", "pan/test/football/playscene/playscene.png", () => { this.loadConfigCom() });

        }
        private a_scene_bg: UICompenent;
        private a_scene_door: UICompenent;
        private a_ball: FrameCompenent;

        private loadConfigCom(): void {

            this.a_ball = <FrameCompenent>this.addEvntBut("a_ball", this._topRender);
            this.a_ball.speed = 1;

    
            this.a_ball.x = 0
            this.a_ball.y=0
          
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);

        }
        public onMouseDown($evt: InteractiveEvent): void {
            this.a_ball.x = $evt.x / UIData.Scale
            this.a_ball.y = $evt.y / UIData.Scale;


        }
        protected butClik($evt: InteractiveEvent): void {
            console.log($evt.target)


   
        }

   

    }
}