function resultCheckControl(itemNameArray, outputPlaceNameArray) {
  console.log('---resultCheckControl呼び出し---');
  
  const afterData = JSON.parse(sessionStorage.getItem(itemNameArray[0]));
  const beforeData = JSON.parse(sessionStorage.getItem(itemNameArray[1]));
  const afterDataOutputTarget = document.getElementById(outputPlaceNameArray[0]);
  const beforeDataOutputTarget = document.getElementById(outputPlaceNameArray[0]);

  outputConsole({ afterData });
  outputConsole({ beforeData });

  
  /*
  for (let i = 0; i < afterData.length; i ++) {
    console.log(afterData[i]['baseLineString']);
    afterDataOutputTarget.innerHTML += '<div class="max-width-100pa"><textarea name="resultAfterData[]" cols="160" rows="2">' + afterData[i]['baseLineString'] + '</textarea></div>';
  }
  */

  
  /*
  // 編集後データをタブ記号で分割して配列にします。
  const splitAEIArray = makeArraySplitTabKey(afterEditingItem);
  outputConsole({ splitAEIArray });
  
  // 編集後データが正しい形式かどうかをチェックします。
  // 戻り値はオブジェクトで、下記のとおりです。
  // resultBool : 「全て正しい形式 → true」もしくは「1つでも正しくない形式あり → false」
  // noMatchIndex : 正しい形式でなかった配列のインデックス番号
  const correctFormatBool = checkCorrectFormat(afterEditingItem);
  outputConsole({ correctFormatBool });
  
  // correctFormatBoolの値により条件分岐します。
  if (correctFormatBool['resultBool'] !== true) {
    for (let i = 0; i < correctFormatBool['noMatchIndexArray'].length; i ++) {
      checkCorrectFormatToDetails(afterEditingItem[correctFormatBool['noMatchIndexArray'][i]]);
    }
  } else {
    // 何もせず次の処理へ。
  }
  */


}