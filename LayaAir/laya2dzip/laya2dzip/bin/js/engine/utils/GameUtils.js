var keyProp = [
    "生命", "攻击", "防御", "命中", "闪避", "暴击", "抗暴", "攻速", "移速", "破防", "忽视闪避", "生命值回复", "伤害加深", "伤害减免", "反弹伤害" //15个
    ,
    "吸血", "回复效率", "暴击", "抗暴", "暴击伤害", "暴伤减免", "命中率", "闪避率", "眩晕", "定身", "沉默", "混乱", "魅惑", "控制增强", "控制减免" //15个
    ,
    "防御", "境界", "PVP伤害增加", "减少PVP伤害", "增加PVE伤害", "减少伤害",
];
function getKeyProById($id) {
    return keyProp[$id - 1];
}
var btnClickTime = 500;
var professionalKey = [
    "", "枪客", "枪客", "道士", "道士", "剑客", "剑客"
];
function getProfessional($type) {
    return professionalKey[$type];
}
function getColorQua(qua) {
    // TODO
    var quaColorAry = [ColorType.Whitefff4d6, ColorType.color2daa35, ColorType.color4392ff, ColorType.colorb759ff, ColorType.colorff7200, ColorType.colorce0a00];
    return this.quaColorAry[qua];
}
var colorNameAry = ["白色", "绿色", "蓝色", "紫色", "橙色", "红色"];
function getQuaName(qua) {
    return this.colorNameAry[qua];
}
var dailyAry = ["日", "一", "二", "三", "四", "五", "六"];
function getDateName(qua) {
    return this.dailyAry[qua];
}
function getRoleUrl(name) {
    // if (name.search("2242") != -1) {
    //     //console.log("2242224222422242")
    // }
    // if (name == "0") {
    //     //console.log("没有这个装备")
    // }
    return "role/" + name + getBaseUrl() + ".txt";
}
function getRoleUIUrl(name) {
    // if (name.search("6013") != -1) {
    //     //console.log("6013")
    // }
    // if (name == "0") {
    //     //console.log("没有这个装备")
    // }
    return "role/ui/" + name + getBaseUrl() + ".txt";
}
function getSkillUrl(name) {
    if (!name || name.length == 0) {
    }
    var str = "skill/" + name + getBaseUrl() + ".txt";
    return str.replace(".txt", "_byte.txt");
}
function getModelUrl(name) {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getModelUIUrl(name) {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getMapUrl(name) {
    return "map/" + name + ".txt";
}
function getfactionmapUrl(name) {
    return "ui/load/map/world/" + name + ".png";
}
function getZipMapUrl(name) {
    return "map/" + name + "/";
}
function getactivityIconUrl(name) {
    return "ui/load/activity/icon/" + name + ".jpg";
}
//玩家头像
function getTouPic(gender) {
    // return gender == 1 ? "ui/tou/1.png" : "ui/tou/2.png";
    return "ui/tou/" + (gender % 2) + ".png";
}
function getVipIconUrl(name) {
    return "ui/load/Vip/" + name + ".png";
}
function getExteriorIconUrl(name) {
    return "ui/load/exterior/" + name + ".png";
}
function getFactionBuildMapUrl(name) {
    return "ui/load/map/factionbuildmap/" + name + ".png";
}
function geteqiconIconUrl(name) {
    return "ui/eqicon/" + name + ".png";
}
function getrestaskhardIconUrl(name) {
    return "ui/load/rescopy/hardlev/" + name + ".png";
}
function getstrongerIconUrl(name) {
    return "ui/load/stronger/" + name + ".png";
}
function getgemIconUrl(name) {
    return "ui/load/gem/" + name + ".png";
}
function getRoleIconUrl(name) {
    return "ui/roleicon/" + name + ".png";
}
function getStateUpIconUrl(name) {
    return "ui/load/stateup/" + name + ".png";
}
function getKaifuIconUrl(name) {
    return "ui/load/kaifu/" + name + ".png";
}
function getTeamcopyIconUrl(name) {
    return "ui/load/teamcopy/" + name + ".png";
}
function getSuccesspromptUrl(name) {
    return "ui/load/toptip/txt/" + name + ".png";
}
function getSkillIconUrl(name) {
    return "ui/skillicon/" + name + ".png";
}
function getTreasureIconUrl(name) {
    return "ui/load/treasure/" + name + "_c.png";
}
function getEffectUIUrl(name) {
    return "ui/load/effect/" + name + ".png";
}
function getMountIconUrl(name) {
    return "ui/load/mount/photo/" + name + ".png";
}
function getload_IconUrl(name) {
    return "ui/load/icon/" + name + ".png";
}
function getload_FacBuildUrl(name) {
    return "ui/load/faction/buildicon/" + name + ".png";
}
function getload_LogingiftUrl(name) {
    return "ui/load/Logingift/Name/" + name + ".png";
}
function getload_LogingiftInfoUrl(name) {
    return "ui/load/Logingift/Info/" + name + ".png";
}
function getUIIconUrl(name) {
    return "ui/uiicon/" + name + ".png";
}
function getQueenIconUrl(id) {
    return Scene_data.fileRoot + "ui/load/queen/" + id + ".jpg";
}
function getUItimeOutUrl(name) {
    return "ui/load/timeOut/" + name + ".png";
}
function getUIpkGradeUrl(name) {
    return "ui/load/pkGrade/" + name + ".png";
}
function getUItittleUrl(name) {
    return "ui/load/tittle/" + name + ".png";
}
function getOutBossUiUrl(name, pre) {
    if (pre) {
        return "ui/tittlename/oboss/t_" + name + ".png";
    }
    else {
        return "ui/tittlename/oboss/" + name + ".png";
    }
}
/**标准化数字 */
function Snum($num) {
    if ($num > 999999) {
        return float2int($num / 10000) + "万";
    }
    else if ($num > 999999999) {
        return float2int($num / 100000000) + "亿";
    }
    else {
        return String(float2int($num));
    }
}
/**将道具中的资源类，转换为消耗资源id */
function getresIdByreward($itemid) {
    return $itemid;
}
/**将后台名称 2.1001.张三 解析成 1001.张三  跨服使用 */
function getServerAndName(name) {
    var ary = name.split(",");
    if (ary.length == 3) {
        return ary[1] + ary[2];
    }
    else {
        return name;
    }
}
/**将后台名称 2.1001.张三 解析成 张三 */
function getBaseName(name) {
    var ary = name.split(",");
    if (ary.length == 3) {
        return ary[2];
    }
    else {
        return name;
    }
}
//# sourceMappingURL=GameUtils.js.map