// ==UserScript==
// @name         BiliBili Extend Tool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  B站扩展工具
// @author       MisakaCirno
// @match        https://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// @require https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

(function () {
  "use strict";
  // Your code here...
  let rateListSlow = [0.1, 0.25];
  let rateList = [3, 4, 5, 6, 8, 10, 16];

  let interval = setInterval(createExtendElement, 1000);

  function createExtendElement() {
    console.log("interval is running……");

    //功能1：扩展倍速选项
    extend1();

    clearInterval(interval);
    console.log("interval was cleared");

    //功能2：如果有合集，扩大合集播放列表的高度
    extend2();

    //功能3：添加显示视频原始链接并支持复制的input和button
    extend3();

    //功能4：去除右侧的小广告
    extend4();
  }

  function extend1() {
    //功能1：扩展倍速选项
    //尝试获取按钮列表
    let buttons = document.querySelector(".bpx-player-ctrl-playbackrate-menu");

    if (buttons == null) {
      return;
    }

    //添加低倍速
    for (let index = 0; index < rateListSlow.length; index++) {
      const rate = rateListSlow[index];

      let newLi = document.createElement("li");
      newLi.className = "bpx-player-ctrl-playbackrate-menu-item";
      newLi.setAttribute("data-value", rate);
      newLi.innerText = rate + "x";
      buttons.append(newLi);
    }

    //添加高倍速
    for (let index = 0; index < rateList.length; index++) {
      const rate = rateList[index];

      let newLi = document.createElement("li");
      newLi.className = "bpx-player-ctrl-playbackrate-menu-item";
      newLi.setAttribute("data-value", rate);
      newLi.innerText = rate + ".0x";
      buttons.prepend(newLi);
    }
    //修改按钮文字
    var button = document.querySelector(".bpx-player-ctrl-playbackrate-result");
    button.innerText = "倍速+";
  }

  function extend2() {
    //功能2：如果有合集，扩大合集播放列表的高度
    let outPanel = document.querySelector(".base-video-sections-v1");
    outPanel.style.height = "500px";

    let listPanel = document.querySelector(".video-sections-content-list");
    listPanel.style.height = "425px";
    listPanel.style.maxHeight = "none";
  }

  function extend3() {
    //功能3：添加显示视频原始链接并支持复制的input和button
    let slide_ad = document.querySelector("#slide_ad");
    slide_ad.style.marginBottom = "20px";

    let newInput = document.createElement("input");
    newInput.id = "extendLinkInput";
    newInput.style.width = "100%";
    newInput.style.height = "35px";
    newInput.style.margin = "5px 0px";
    newInput.style.borderStyle = "solid";
    newInput.style.borderRadius = "6px";
    newInput.style.borderColor = "rgb(241,242,243)";
    newInput.style.boxSizing = "border-box";
    newInput.style.textAlign = "center";
    newInput.value =
      "https://www.bilibili.com/video/" + window.__INITIAL_STATE__.bvid;
    newInput.style.fontSize = "14px";
    console.log(window.__INITIAL_STATE__.bvid);
    newInput.readOnly = true;

    let newButton = document.createElement("button");
    newButton.id = "extendCopyButton";
    newButton.style.width = "100%";
    newButton.style.height = "35px";
    newButton.innerHTML = "复制链接";
    newButton.style.fontSize = "14px";
    newButton.style.margin = "5px 0px";
    newButton.style.borderStyle = "solid";
    newButton.style.borderRadius = "6px";
    newButton.style.borderColor = "rgb(233,233,237)";
    newButton.onclick = () => {
      let input = document.getElementById("extendLinkInput");
      newInput.value =
        "https://www.bilibili.com/video/" + window.__INITIAL_STATE__.bvid;
      navigator.clipboard.writeText(input.value);

      let button = document.getElementById("extendCopyButton");
      button.innerHTML = "复制成功！";
      setTimeout(() => {
        button.innerHTML = "复制链接";
      }, 2000);
    };

    slide_ad.append(newInput);
    slide_ad.append(newButton);
  }

  function extend4() {
    //功能4：去除右侧的小广告
    let sideAD1 = document.getElementsByClassName(
      "ad-report video-card-ad-small"
    );
    sideAD1[0].parentNode.removeChild(sideAD1[0]);
    let sideAD2 = document.getElementsByClassName(
      "video-page-special-card-small"
    );
    sideAD2[0].parentNode.removeChild(sideAD2[0]);
  }
})();
