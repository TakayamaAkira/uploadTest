function checkTextAfterVsBefore(thisForm, buttonIdString, extractionAttributeNameObject, setItemNameObject, outputTargetObject) {

  const arrangedFormAfterDataString = (function(thisForm, buttonIdString, extractionAttributeNameObject) {
    let temporaryData = '';

    if (buttonIdString ===  'plus_one_seconds_button') {
      const sessionItemName = extractionAttributeNameObject['after'];

      temporaryData = (function(sessionItemName) {

        let totalString = '';
        const sessionItemArray = JSON.parse(sessionStorage.getItem(sessionItemName));
        for (i = 0; i < sessionItemArray.length; i ++) {
          totalString += sessionItemArray[i]['baseLineString'] + '\n';
        }

        // 文字列の最後にある「\n」を削除します。
        const replaceLastLineBreakStrings = totalString.replace(/\n$/, '');

        // 全ての文字列を格納した定数replaceLastLineBreakStringsをreturnして処理を終えます。
        return replaceLastLineBreakStrings;
      }(sessionItemName)); // end of temporaryData = (function(sessionItemName)
      
    } else {
      temporaryData = arrangeFormData(thisForm, buttonIdString, extractionAttributeNameObject['after']);
    }

    return temporaryData;
  }(thisForm, buttonIdString, extractionAttributeNameObject)); // const arrangedFormAfterDataString



  const checkedAfterData = setAndCheckAfterData(arrangedFormAfterDataString, setItemNameObject['after']);


  const beforeData = (function(buttonIdString)  {
    
    if (buttonIdString === 'check_text_after_vs_before') {
      const sessionItemName = extractionAttributeNameObject['before'];
      return JSON.parse(sessionStorage.getItem(sessionItemName));
    } else {
      // 何もせず次の処理へ。
    }


    if (buttonIdString === 'again_check_text_after_vs_before') {
      const sessionItemName = extractionAttributeNameObject['before'];
      return JSON.parse(sessionStorage.getItem(sessionItemName));
    } else {
      // 何もせず次の処理へ。
    }

    if (buttonIdString === 'plus_one_seconds_button') {
      const sessionItemName = extractionAttributeNameObject['before'];
      return JSON.parse(sessionStorage.getItem(sessionItemName));
    } else {
      // 何もせず次の処理へ。
    }

  }(buttonIdString)); // end of const beforeData
  

  const periodSplitBeforeTextArray = makeMainTextArray(beforeData, 'before');


  const afterDataMainTextArray = (function(checkedAfterData) {
    const totalLineArray = [];

    for (let i = 0; i < checkedAfterData.length; i ++) {
      for (let me = 0; me < checkedAfterData[i]['mainDataObject']['object_2_mainTextArray'].length; me ++) {
        totalLineArray.push(checkedAfterData[i]['mainDataObject']['object_2_mainTextArray'][me]);
      }
    } // end of for (let i = 0; i < checkedAfterData.length; i ++)

    return totalLineArray;
  }(checkedAfterData));
  

  // 編集後の改行に合わせた形に編集前データを作成し、定数に代入します。
  const beforeDataLineBreakLikeAfterData = makeBeforeDataArrayLikeAfterDataLineBreak(periodSplitBeforeTextArray, afterDataMainTextArray);

  
  // 編集前データとその改行に合わせて作成した編集前データのそれぞれの要素数を比較し、多いほうの数を取得します。
  // 取得した多いほうの数の疎配列を作成し、この後の本文比較の結果を格納できるようにします。
  const resultCheckArray = (function(beforeDataLineBreakLikeAfterData, afterDataMainTextArray) {
    const lengthValueArray = [];
    lengthValueArray.push(beforeDataLineBreakLikeAfterData.length);
    lengthValueArray.push(afterDataMainTextArray.length);    

    return new Array(Math.max(...lengthValueArray));
  }(beforeDataLineBreakLikeAfterData, afterDataMainTextArray)); // end of const resultCheckArray

  
  // 改行を合わせた編集前データと編集後データを比較し、結果をresultCheckArrayに格納していきます。
  for (let i = 0; i < resultCheckArray.length; i ++) {
    if (beforeDataLineBreakLikeAfterData[i] === afterDataMainTextArray[i]) {
      resultCheckArray[i] = true;
    } else {
      resultCheckArray[i] = false;
    }
  }


  const comparisonTargetObject = {
    'after': checkedAfterData,
    'before': beforeDataLineBreakLikeAfterData,
  }; // end of const comparisonTargetObject

  const nameAttributeObject = {
    'after': 'checked_after_text[]',
    'before': 'checked_before_text[]',
  }; // end of const nameAttributeObject


  // 本文チェック結果をoutputTargetObjectで指定した2箇所に出力します。
  outputTextCheckResult(outputTargetObject, comparisonTargetObject, nameAttributeObject, resultCheckArray);

  // 返り値はないため何もreturnせずに処理を終えます。
  return;
}