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
      }(sessionItemName));
      
    } else {
      temporaryData = arrangeFormData(thisForm, buttonIdString, extractionAttributeNameObject['after']);
    }

    return temporaryData;
  }(thisForm, buttonIdString, extractionAttributeNameObject)); // const arrangedFormAfterDataString



  const checkedAfterData = setAndCheckAfterData(arrangedFormAfterDataString, setItemNameObject['after']);


  const beforeData = (function(buttonIdString)  {
    
    if (buttonIdString === 'check_text_after_vs_before') {
      return JSON.parse(sessionStorage.getItem('before_data'));
    } else {
      // 何もせず次の処理へ。
    }


    if (buttonIdString === 'again_check_text_after_vs_before') {
      return JSON.parse(sessionStorage.getItem('checked_before_text[]'));
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


  let afterDataMainTextSplitPeriodCount = 0;

  for (let i = 0; i < checkedAfterData.length; i ++) {
    for (let me = 0; me < checkedAfterData[i]['mainDataObject']['object_2_mainTextArray'].length; me ++) {
      afterDataMainTextSplitPeriodCount ++;
    }
  } // end of for (let i = 0; i < checkedAfterData.length; i ++)

  
  // 編集後データと編集前データのそれぞれの本文を「。」で分割した行数を比較し、多いほうの数を取得します。
  // 取得した多いほうの数の疎配列を作成し、この後の本文比較の結果を格納できるようにします。
  const resultCheckArray = (function(afterDataMainTextSplitPeriodCount, periodSplitBeforeTextArray) {
    const lengthValueArray = [];
    lengthValueArray.push(afterDataMainTextSplitPeriodCount);
    lengthValueArray.push(periodSplitBeforeTextArray.length);

    return new Array(Math.max(...lengthValueArray));
  }(afterDataMainTextSplitPeriodCount, periodSplitBeforeTextArray)); // end of const resultCheckArray


  let resultCheckArrayIndexCount = 0;


  for (let i = 0; i < checkedAfterData.length; i ++) {
    for (let me = 0; me < checkedAfterData[i]['mainDataObject']['object_2_mainTextArray'].length; me ++) {
      if (checkedAfterData[i]['mainDataObject']['object_2_mainTextArray'][me] && periodSplitBeforeTextArray[resultCheckArrayIndexCount]) { // 編集後と編集前の両方がある場合。
        if (checkedAfterData[i]['mainDataObject']['object_2_mainTextArray'][me] === periodSplitBeforeTextArray[resultCheckArrayIndexCount]) { // 編集後と編集前がイコールの場合。
          resultCheckArray[resultCheckArrayIndexCount] = true;
        } else { // 編集後と編集前がイコールではない場合。
          resultCheckArray[resultCheckArrayIndexCount] = false;
        }
      } else { // 編集後と編集前のいずれかがない場合。
        resultCheckArray[resultCheckArrayIndexCount] = false;
      }
      resultCheckArrayIndexCount ++;
    }
  } // end of for (let i = 0; i < checkedAfterData.length; i ++)


  // 編集後の本文の「。」が編集前の本文の「。」より少ない場合、resultCheckArrayに空要素が発生してしまいます。
  // 条件分岐を用いて空要素になっている配列にfalseを格納します。
  if (resultCheckArrayIndexCount < resultCheckArray.length) {
    for (let i = resultCheckArrayIndexCount; i < resultCheckArray.length; i ++) {
      resultCheckArray[i] = false;
    }
  } else {
    // 何もせず次の処理へ。
  } // end of if (resultCheckArrayIndexCount < resultCheckArray.length)


  const comparisonTargetObject = {
    'after': checkedAfterData,
    'before': periodSplitBeforeTextArray,
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