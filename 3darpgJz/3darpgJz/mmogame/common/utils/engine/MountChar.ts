class MountChar extends SceneBaseChar{

    public setData($rank:number,$iid:number):void{
        if($iid > 0){
            var obj:any = TableData.getInstance().getData(TableData.tb_mount_illusion,$iid);
            var avatar:number = obj.mountID;
            this.setAvatar(avatar);
            return;
        }

        if($rank > 0){
            var obj:any = TableData.getInstance().getData(TableData.tb_mount_base,$rank);
            var avatar:number = obj.mountID;
            this.setAvatar(avatar);
        }
    }

}