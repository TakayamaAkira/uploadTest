function checkCorrectFormat(argArray) {

  const correctFormat = /^☆（[０-９]{2,}：[０-５][０-９]：[０-５][０-９]）\t\t.+\t☆（[０-９]{2,}：[０-５][０-９]：[０-５][０-９]）$/;

  let count = 0;
  const noMatchIndexArray = [];

  for (let i = 0; i < argArray.length; i ++) {
    if (correctFormat.test(argArray[i])) {
      // 何もせず次の処理へ。
    } else {
      count ++;
      noMatchIndexArray.push(i);
    }
  }

  if (count === 0){
    return { 'resultBool': true, 'noMatchIndexArray': noMatchIndexArray };
  } else {
    return { 'resultBool': false, 'noMatchIndexArray': noMatchIndexArray };
  }
}