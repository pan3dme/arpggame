
class UIPanelEvent extends BaseEvent {
    public static DISPOSE_PANEL_EVENT: string = "dispose_panel_event";
    public panel: UIPanel
}
class UIPanel extends UIConatiner {

    private _disposeEventFun: Function;
    public constructor() {
        super();
    }

    public onAdd(): void {

        if (this._disposeEventFun) {
            TimeUtil.removeTimeOut(this._disposeEventFun);
        }

    }

    public onRemove(): void {
        if (!this._disposeEventFun) {
            this._disposeEventFun = () => {
                var evt: UIPanelEvent = new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT);
                evt.panel = this;
                ModuleEventManager.dispatchEvent(evt);
            }
        }
        TimeUtil.addTimeOut(20000000, this._disposeEventFun);
    }
}
