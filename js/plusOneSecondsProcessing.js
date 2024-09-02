function plusOneSecondsProcessing(getItemName, setItemName) {

  const afterData = JSON.parse(sessionStorage.getItem(getItemName));

  const plusOneFlagStoredAfterData = makePlusOneSecondsFlagObject(afterData);

  const addedOneSecondsAfterData = doPlusOneSeconds(plusOneFlagStoredAfterData);

  // プラス1秒したタイムスタンプを反映させ、文字列を作成します。
  // setAndCheckAfterData関数に渡せるよう、下記の形式に加工します。
  // ・「頭のタイムスタンプ」
  // ・「タブ記号×2」
  // ・「本文」
  // ・「お尻のタイムスタンプ」
  // ・「改行記号」※最後の行のみ「改行記号」なし
  const addedOneSecondsResultStrings = (function(argArray) {

    const deepCopiedArgArray = JSON.parse(JSON.stringify(argArray));

    let resultStrings = '';

    for (let i = 0; i < deepCopiedArgArray.length; i ++) {
      for (let me = 0; me < deepCopiedArgArray[i]['splitBaseLineStringArray'].length; me ++) {

        switch (me) {
          case 0:
            if (deepCopiedArgArray[i]['pulsOneSecondsTimeStampObject']['headTimeStampByOverlap'] !== '') {
              resultStrings += deepCopiedArgArray[i]['pulsOneSecondsTimeStampObject']['headTimeStampByOverlap'] + '\t';
            } else {
              resultStrings += deepCopiedArgArray[i]['splitBaseLineStringArray'][me] + '\t';
            }
            break;

          case 1:
            resultStrings += deepCopiedArgArray[i]['splitBaseLineStringArray'][me] + '\t';
            break;

          case 2:
            resultStrings += deepCopiedArgArray[i]['splitBaseLineStringArray'][me] + '\t';
            break;

          case 3:
            if (deepCopiedArgArray[i]['pulsOneSecondsTimeStampObject']['justNowIndexHipTimeStamp'] !== '') {
              resultStrings += deepCopiedArgArray[i]['pulsOneSecondsTimeStampObject']['justNowIndexHipTimeStamp'] + '\n';
            } else {
              resultStrings += deepCopiedArgArray[i]['splitBaseLineStringArray'][me] + '\n';
            }
            break;

          default:
            console.error('想定外の分岐に到達しています。調査願います。');
            break;
        } // end of switch (me)
      } // end of for (let me = 0; me < deepCopiedArgArray[i]['splitBaseLineStringArray'].length; me ++)
    } // end of for (let i = 0; i < deepCopiedArgArray.length; i ++)

    // 文字列の最後にある「\n」を削除します。
    const replaceLastLineBreakStrings = resultStrings.replace(/\n$/, '');

    // プラス1秒したタイムスタンプを反映させた全ての文字列をreturnして処理を終えます。
    return replaceLastLineBreakStrings;
  }(addedOneSecondsAfterData)); // end of const addedOneSecondsResultStrings


  // 作成したプラス1秒加工したデータをsetAndCheckAfterDataに渡し、セッションストレージにデータを保存します。
  setAndCheckAfterData(addedOneSecondsResultStrings, setItemName);

  // 返り値はないためreturnして処理を終えます。
  return;
}