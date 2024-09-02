function makeBeforeDataArrayLikeAfterDataLineBreak(argBeforeDataTextArray, argAfterDataTextArray) {
  const copiedBeforeData = JSON.parse(JSON.stringify(argBeforeDataTextArray));
  const copiedAfterData = JSON.parse(JSON.stringify(argAfterDataTextArray));

  const beforeDataLoopLimitNumber = copiedBeforeData.length;
  const afterDataLoopLimitNumber = copiedAfterData.length;

  const extractionStringArray = [];


  // 編集前と編集後の本文がイコールでなかった場合に詳細をチェックするための再帰関数を定義しておきます。
  // 基本的に編集前、編集後ともに「。」で区切ったデータを比較しますが、編集後データで本文が長い場合、改行を挟むことがあります。
  // そのため、同じlengthで比較するとイコールにならない場合が発生するためです。
  const recursiveFunction = function(argBeforeObject, argAfterObject, stringArray = []) {

    const deepCopiedBeforeObject = JSON.parse(JSON.stringify(argBeforeObject));
    const deepCopiedAfterObject = JSON.parse(JSON.stringify(argAfterObject));

    const useReturnObject = {
      'stringArray': '',
      'afterLoopCount': 0,
    }; // end of const useReturnObject

    const beforeDataString = deepCopiedBeforeObject['beforeDataString'];
    const afterData = deepCopiedAfterObject['afterData'];
    let afterLoopCount = deepCopiedAfterObject['afterLoopCount'];


    if (afterLoopCount >= deepCopiedAfterObject['afterDataLoopLimitNumber']) {
      stringArray.push(beforeDataString);
      useReturnObject['stringArray'] = stringArray;
      useReturnObject['afterLoopCount'] = afterLoopCount;

      return useReturnObject;

    } else {
      // 何もせず次の処理へ。
    }


    const stringLengthObject = (function(beforeDataString, deepCopiedAfterObject) {
      const temporaryObject = {
        'before': beforeDataString.length,
        'after': 0,
      };

      const afterCount = deepCopiedAfterObject['afterLoopCount'];

      if (afterCount < deepCopiedAfterObject['afterDataLoopLimitNumber']) {
        temporaryObject['after'] = deepCopiedAfterObject['afterData'][afterCount].length;
      } else {
        temporaryObject['after'] = 0;
      }
      return temporaryObject;
    }(beforeDataString, deepCopiedAfterObject)); // end of const stringLengthObject

            
    const maxLengthObject = extractionKeyMathMaxOfImaginaryObject(stringLengthObject);


    switch (maxLengthObject['key']) {
      // 変数、定数を作成する際はブロックスコープ内で行っています。
      case 'before': {
          if (beforeDataString.indexOf(afterData[afterLoopCount]) === 0) {
            const extractionString = beforeDataString.substring(beforeDataString.indexOf(afterData[afterLoopCount]), afterData[afterLoopCount].length);
            stringArray.push(extractionString);
            const remainingString = beforeDataString.substring(afterData[afterLoopCount].length);

            if (remainingString.length !== 0) {
              deepCopiedBeforeObject['beforeDataString'] = remainingString;
              deepCopiedAfterObject['afterLoopCount'] = afterLoopCount + 1;
              return recursiveFunction(deepCopiedBeforeObject, deepCopiedAfterObject, stringArray);

            } else {
              stringArray.push(beforeDataString);
              afterLoopCount ++;
            } // end of if (remainingString.length !== 0)

          } else {
            stringArray.push(beforeDataString);
            afterLoopCount ++;
          } // end of if (beforeDataString.indexOf(afterData[afterLoopCount]) === 0)
        } // end of case 'before'
        break; // end of case 'before':


      case 'after': 
        stringArray.push(beforeDataString);
        afterLoopCount ++;
        break; // end of case 'after'


      case 'both': 
        stringArray.push(beforeDataString);
        afterLoopCount ++;
        break; // end of case 'both'


      default:
        // 何もせず次の処理へ。
        break;
    } // end of switch (maxLengthObject['key'])


    useReturnObject['stringArray'] = stringArray;
    useReturnObject['afterLoopCount'] = afterLoopCount;


    // useReturnObjectをreturnして定数の作成を終えます。
    return useReturnObject;
  }; // end of const recursiveFunction


  let afterCount = 0;

  for (let i = 0; i < copiedBeforeData.length; i ++) {

    if (afterCount >= afterDataLoopLimitNumber) {
      extractionStringArray.push(copiedBeforeData[i]);
    } else {
      // 何もせず次の処理へ。
    } // end of if (afterCount >= afterDataLoopLimitNumber)

    if (copiedBeforeData[i] === copiedAfterData[afterCount]) {
      extractionStringArray.push(copiedBeforeData[i]);
      afterCount ++;

    } else {

      const beforeDataObject = { 
        'beforeData': copiedBeforeData, 
        'beforeLoopCount': i, 
        'beforeDataLoopLimitNumber': beforeDataLoopLimitNumber,
        'beforeDataString': copiedBeforeData[i],
      }; // end of const beforeDataObject

      const afterDataObject = { 
        'afterData': copiedAfterData, 
        'afterLoopCount': afterCount,
        'afterDataLoopLimitNumber': afterDataLoopLimitNumber,
      }; // end of const afterDataObject

      const recursiveResult = recursiveFunction(beforeDataObject, afterDataObject);

      for (let me = 0; me < recursiveResult['stringArray'].length; me ++) {
        extractionStringArray.push(recursiveResult['stringArray'][me]);
      } // end of for (let me = 0; me < recursiveResult['stringArray'].length; me ++)

      afterCount = recursiveResult['afterLoopCount'];
              
              
    } // end of if (copiedBeforeData[i] === copiedAfterData[afterCount])
  } // end of for (let i = 0; i < copiedBeforeData.length; i ++)


  // extractionStringArrayをreturnして処理を終えます。
  return extractionStringArray;
}