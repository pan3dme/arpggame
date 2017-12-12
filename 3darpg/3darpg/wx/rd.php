<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx7ac17e1cd597cbf4", "63cebd7c48193eaf2be3d9167335b66a");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  wx.config({
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中
      "startRecord",
      "stopRecord",
      "onVoiceRecordEnd",
      "playVoice",
      "pauseVoice",
      "stopVoice",
      "onVoicePlayEnd",
      "uploadVoice",
      "downloadVoice",
    ]
  });
  wx.ready(function () {
    // 在这里调用 API
	  //alert("ok");
	  console.log("wx ok");
    //当前页面参数
    sid = GetQueryString("sid");
    if(sid){
      loadplay(sid);
    }
  });
  
  wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	  console.log(res);
  });

  function GetQueryString(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)return  decodeURI(r[2]); return null;
  }

  function onDown(e){
    //trace("down");
    e.preventDefault();
    wx.startRecord();
  }

  function onUp(e){
    //trace("up");
    e.preventDefault();
    wx.stopRecord({
        success: function (res) {
            var localId = res.localId;
            trace("录音成功：" + localId);
            //playvoice(localId);
            upvic(localId);
        }
    });
  }

  function upvic(str){
    trace("upload");
    wx.uploadVoice({
      localId: str, // 需要上传的音频的本地ID，由stopRecord接口获得
      isShowProgressTips: 0, // 默认为1，显示进度提示
      success: function (res) {
        var serverId = res.serverId; // 返回音频的服务器端ID
        trace("serverID：" + serverId);
        sendSave("file.php?sid=" + serverId);
        loadplay(serverId);
      }
    });
  }

  function playvoice(str){
    wx.playVoice({
        localId: str // 需要播放的音频的本地ID，由stopRecord接口获得
    });
  }

  function loadplay(sid){
    wx.downloadVoice({
        serverId: sid, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (res) {
            var localId = res.localId; // 返回音频的本地ID
            trace("播放server: " + localId);
            playvoice(localId)
        }
    });
  }

  function trace(str){
    document.getElementById("multxt").innerHTML += str + "<br/>";
  }

  function init(){
    document.ontouchstart = onDown;
    document.ontouchend = onUp;
    
  }

  function sendSave(url){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);

      xhr.onreadystatechange = function() {
          trace("send to php");
      }

      xhr.send();

  }

  
</script>
<body onload='init()' ontouchmove="event.preventDefault()" style="overflow-x: hidden; overflow-y: hidden">
    
    <div id="multxt"></div>
</body>
</html>
