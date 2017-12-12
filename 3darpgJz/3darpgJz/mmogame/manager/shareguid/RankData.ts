class RankData extends GuidObject {
    
    public getRankGuid(): string {
        return this.GetStr(SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_PLAYER_GUID)
    }
    public getRankName(): string {
        return this.GetStr(SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_PLAYER_NAME)
    }
    public getRankFaction(): string {
        return this.GetStr(SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_FACTION_NAME)
    }
    public getRankPower(): number {
        return this.GetDouble(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_FORCE)
    }
    public getRankCoat(): number {
        return this.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_SHOW)
    }
    public getRankWeapon(): number {
        return this.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_SHOW + 1);
    }
    public getRankVip(): number {
        return this.GetByte(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_BYTE, 2);
    }

    public getRankGender(): number {
        return this.GetByte(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_BYTE, 0);
    }

    public getLevel():number{
        return this.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_LEVEL);
    }

    public getMoney():number{
        return this.GetDouble(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_MONEY);
    }

    public getDivineNum():number{
        return this.GetByte(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_BYTE,2);
    }

    public getFactionActive():number{
        return this.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_BYTE2);
    }

    public getFactionIcon():number{
        return this.GetUInt16(SharedDef.RANK_LIST_INT_FIELD_FACTION_BYTE,0);
    }
    public getRank():number{
        return this.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_RANKING);
    }
    public getTitle():number{
        return this.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_TITLE);
    }

    public getMountLev():number{
        return this.GetByte(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_BYTE2,0);
    }

    public getMountStart():number{
        return this.GetByte(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_BYTE2,1);
    }

    public getLike():number{
        return this.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_LIKE);
    }

    public getWingId():number{
        return this.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_WING);
    }


}