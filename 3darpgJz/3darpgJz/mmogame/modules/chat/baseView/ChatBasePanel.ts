module Chat {

    export class ChatBasePanel extends UIConatiner {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        private listPanel: ChatListContextComponent;
        private _listMask: UIMask;
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.top = 0
            this.left = 0

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);



            this._midRender.uiAtlas = new UIAtlas();



        }

        public applyLoad(): void {


            this._midRender.uiAtlas.setInfo("ui/uidata/chat/chat.xml", "ui/uidata/chat/chat.png", () => { this.loadConfigCom() }, "ui/uidata/chat/chatuse.png");
        }
        private uiAtlasComplet: boolean = false
        private w_list_page_bg: UICompenent;
        private chatBaseMenu: ChatBaseMenu;
        private chatBaseLeftMenu: ChatBaseLeftMenu
        private w_win_close: UICompenent;
        private w_right_gold_line:UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas
            this._topRender.uiAtlas = this._midRender.uiAtlas


            this.w_list_page_bg = this.addEvntBut("w_list_page_bg", this._midRender)


            this.w_list_page_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
        
            this.w_win_close = this.addEvntButUp("w_win_close", this._bottomRender);
            this.w_win_close.top = 10;

            this.w_right_gold_line = this.addChild(this._topRender.getComponent("w_right_gold_line"));
            this.w_right_gold_line.top = 0;

            

            this.chatBaseMenu = new ChatBaseMenu();
            this.chatBaseMenu.setRender(this._bottomRender, this._midRender, this._topRender);
            this.addVirtualContainer(this.chatBaseMenu);


            this.chatBaseLeftMenu = new ChatBaseLeftMenu();
            this.chatBaseLeftMenu.setRender(this._bottomRender, this._midRender, this._topRender);
            this.addVirtualContainer(this.chatBaseLeftMenu);

            this.listPanel = new ChatListContextComponent();
            this.listPanel.panelUiAtlas = this._midRender.uiAtlas;
            this.listPanel.pageBasePos = new Vector2D(90, 0);
            this.listPanel.textScale = 1.35
            this.listPanel.configUIAtlas(this);
            this.addRender(this.listPanel);

            this._listMask = new UIMask();
            this._listMask.x = 0
            this._listMask.y = 0
            this._listMask.width = 512;
            this._listMask.height = 100;
            this.addMask(this._listMask);
            this.listPanel.mask = this._listMask;


   


            this.uiAtlasComplet = true
            this.applyLoadComplete();


            this.refresh()

        }

      
        private _lastMouseY: number = 0;
        private _lastChatListY: number = 0;
        private _chatListMove: boolean = false
        private listBgMouseDown(evt: InteractiveEvent): void {
            this._chatListMove = false
            this._lastMouseY = evt.y;
            this._lastChatListY = this.listPanel.pagey
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onStageMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onStageUp, this);

        }
        private onStageMove(evt: InteractiveEvent): void {
            this._chatListMove = true
            this.listPanel.pagey = this._lastChatListY - (evt.y - this._lastMouseY);
        }
        private onStageUp(evt: InteractiveEvent): void {

            this._chatListMove = false
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onStageMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onStageUp, this);
            this.listPanel.uptoCtx()
        }

 

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
       
                case this.w_win_close:
                    this.close()
                    break
                case this.w_list_page_bg:
                    if (evt.type == InteractiveEvent.Up) {
                        if (!this._chatListMove) {
                            this.listPanel.clikEvent(evt)
                        }
                    } else {
                        this.listBgMouseDown(evt);
                    }
                    break;
                default:
                    break

            }
        }
        public close(): void {

            UIManager.getInstance().removeUIContainer(this)
            Engine.needInputTxt = false
        }
        private listRect: Rectangle = new Rectangle(0, 0, 100, 100);

        public resize(): void {
            super.resize()
            if (this.uiAtlasComplet) {
 
                this.listRect.x = 80;
                this.listRect.y = 0;
                this.listRect.width = 400;
                this.listRect.height = Scene_data.stageHeight / UIData.Scale - 65;

 
  

                this.w_list_page_bg.x = this.listRect.x
                this.w_list_page_bg.y = this.listRect.y
                this.w_list_page_bg.width = this.listRect.width;
                this.w_list_page_bg.height = this.listRect.height;


                this._listMask.x = this.listRect.x;
                this._listMask.y = this.listRect.y;
                this._listMask.width = this.listRect.width;

                this._listMask.height = this.listRect.height;
                this._listMask.applyObjData();

          
                this.listPanel.textHeight = this.listRect.height;
                this._bottomRender.applyObjData();
                this._midRender.applyObjData();
                this._topRender.applyObjData();
            }
  
        }



        public refresh(): void {
            if (this.uiAtlasComplet&&this.hasStage) {
                this.resize();

          
                this.listPanel.refresh();
                this.chatBaseLeftMenu.refresh();
                this.chatBaseMenu.refresh();
               
            }
        }

    }
}