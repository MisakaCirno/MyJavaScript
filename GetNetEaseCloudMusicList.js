var totalList = document.getElementsByClassName("flow");
var result = "";

//第一行是标题，直接跳过
for (let index = 1; index < totalList.length; index++) {
  let title = totalList[index].children[0].children[0].title; //标题
  let author = totalList[index].children[1].title; //作者
  let album = totalList[index].children[2].children[0].title; //专辑
  let length = totalList[index].children[3].innerText; //时长

  //自行替换分隔符
  result =
    result + title + "￥" + author + "￥" + album + "￥" + length + "【】";
}

console.log(result);
