function checkCorrectFormatToDetails(arg) {

  const argArray = makeArraySplitTabKey(arg);

  // const checkPattern = /^☆（[０-９]{2,}：[０-５][０-９]：[０-５][０-９]）\t\t.+\t☆（[０-９]{2,}：[０-５][０-９]：[０-５][０-９]）$/;

  const checkPatternArray = [
    /☆（[０-９]{2,}：[０-５][０-９]：[０-５][０-９]）/,
    '',
    /.+/,
    /☆（[０-９]{2,}：[０-５][０-９]：[０-５][０-９]）/,
  ];

  let checkCount = 0;

  for (let i = 0; i < argArray.length; i ++) {
    // console.log(checkPatternArray[i]);
    for (let me = 0; me < argArray[i].length; me ++) {
      checkCount ++;
      switch (me) {
        case 0:
          if (checkPatternArray[me].test(argArray[i][me])) {
            // 何もせず次の処理へ。
          } else {
            console.log(false);
            console.log(argArray[i][me]);
          }
          break;
        case 1:
          if (argArray[i][me] === '') {
            // 何もせず次の処理へ。
          } else {
            console.log(false);
            console.log(argArray[i][me]);
          }
          break;
        case 2:
          if (checkPatternArray[me].test(argArray[i][me])) {
            // 何もせず次の処理へ。
          } else {
            console.log(false);
            console.log(argArray[i][me]);
          }
          break;
        case 3:
          if (checkPatternArray[me].test(argArray[i][me])) {
            // 何もせず次の処理へ。
          } else {
            console.log(false);
            console.log(argArray[i][me]);
          }
          break;
      }
    }
  }

  if (checkCount === 4) {
    // 何もせず次の処理へ。
  } else {
    console.log(false);
    outputConsole({ checkCount });
  }

}