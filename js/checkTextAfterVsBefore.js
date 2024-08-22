function checkTextAfterVsBefore(thisForm, buttonIdString, extractionAttributeNameObject, setItemNameObject, outputTargetObject) {

  const arrangedFormAfterDataString = arrangeFormData(thisForm, buttonIdString, extractionAttributeNameObject['after']);

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

  }(buttonIdString));

  outputConsole({ beforeData });
  

  const periodSplitBeforeTextArray = makeMainTextArray(beforeData, 'before');

  outputConsole({ checkedAfterData });
  outputConsole({ periodSplitBeforeTextArray });

  let afterDataMainTextSplitPeriodCount = 0;

  for (let i = 0; i < checkedAfterData.length; i ++) {
    for (let me = 0; me < checkedAfterData[i]['mainDataObject']['object_2_mainTextArray'].length; me ++) {
      afterDataMainTextSplitPeriodCount ++;
    }
  }

  
  // 編集後データと編集前データのそれぞれの本文を「。」で分割した行数を比較し、多いほうの数を取得します。
  // 取得した多いほうの数の疎配列を作成し、この後の本文比較の結果を格納できるようにします。
  const resultCheckArray = (function(afterDataMainTextSplitPeriodCount, periodSplitBeforeTextArray) {
    const lengthValueArray = [];
    lengthValueArray.push(afterDataMainTextSplitPeriodCount);
    lengthValueArray.push(periodSplitBeforeTextArray.length);
    return new Array(Math.max(...lengthValueArray));
  }(afterDataMainTextSplitPeriodCount, periodSplitBeforeTextArray));


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
  }

  // 編集後の本文の「。」が編集前の本文の「。」より少ない場合、resultCheckArrayに空要素が発生してしまいます。
  // 条件分岐を用いて空要素になっている配列にfalseを格納します。
  if (resultCheckArrayIndexCount < resultCheckArray.length) {
    for (let i = resultCheckArrayIndexCount; i < resultCheckArray.length; i ++) {
      console.log(i + ' :の要素にfalseを格納します');
      resultCheckArray[i] = false;
    }
  } else {
    // 何もせず次の処理へ。
  }

  outputConsole({ resultCheckArray });

  const comparisonTargetObject = {
    'after': checkedAfterData,
    'before': periodSplitBeforeTextArray,
  };

  const nameAttributeObject = {
    'after': 'checked_after_text[]',
    'before': 'checked_before_text[]',
  };


  outputTextCheckResult(outputTargetObject, comparisonTargetObject, nameAttributeObject, resultCheckArray);

  return;
}