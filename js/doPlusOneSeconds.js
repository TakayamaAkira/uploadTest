function doPlusOneSeconds(argArray) {

  const deepCopiedArgArray = JSON.parse(JSON.stringify(argArray));

  for (let i = 0; i < deepCopiedArgArray.length; i ++) {
    if (deepCopiedArgArray[i]['plusOneSecondsFlagObject']['addOneSecondsFlag'] === true) {
      Object.keys(deepCopiedArgArray[i]['plusOneSecondsFlagObject']['evaluationResultsObject']).forEach((key) => {
        if (deepCopiedArgArray[i]['plusOneSecondsFlagObject']['evaluationResultsObject'][key] === true) {

          // keyの値、つまりはどの条件を満たしてプラス1秒したかで条件分岐します。
          // 'overlapButWithinRange'の場合は「今のインデックス行」と「次のインデックス行」の2つにタイムスタンプを格納するがあるためです。
          // 'lastLine'と'notOverlapNextHead'の処理内容は同じですが、将来の拡張性のため別で記述しておきます。
          // 各分岐を「{}」で囲み、ブロックスコープにしています。同じ名前の定数を定義できるようにするためです。
          // 各文字列はdeepCopiedArgArrayに格納していきます。ディープコピー済みのため、第1引数argArrayに影響を与えることはありません。
          switch (key) {
            case 'lastLine': 
              {
                const addedPlusOneSecondsTime = convertSecondsToTimeObject(deepCopiedArgArray[i]['timeStampSecondsValueObject']['hip']);
                const addedPlusOneTimeStampString = makeAddedPlusOneTimeStampString(addedPlusOneSecondsTime);
                deepCopiedArgArray[i]['pulsOneSecondsTimeStampObject']['justNowIndexHipTimeStamp'] = addedPlusOneTimeStampString;
              }
              break;

            case 'notOverlapNextHead': 
              {
                const addedPlusOneSecondsTime = convertSecondsToTimeObject(deepCopiedArgArray[i]['timeStampSecondsValueObject']['hip']);
                const addedPlusOneTimeStampString = makeAddedPlusOneTimeStampString(addedPlusOneSecondsTime);
                deepCopiedArgArray[i]['pulsOneSecondsTimeStampObject']['justNowIndexHipTimeStamp'] = addedPlusOneTimeStampString;
              }
              break;

            case 'overlapButWithinRange': 
              {
                const addedPlusOneSecondsTime = convertSecondsToTimeObject(deepCopiedArgArray[i]['timeStampSecondsValueObject']['hip']);
                const addedPlusOneTimeStampString = makeAddedPlusOneTimeStampString(addedPlusOneSecondsTime);
                deepCopiedArgArray[i]['pulsOneSecondsTimeStampObject']['justNowIndexHipTimeStamp'] = addedPlusOneTimeStampString;

                const addedPlusOneSecondsTimeNextLine = convertSecondsToTimeObject(deepCopiedArgArray[i]['timeStampSecondsValueObject']['hip']);
                const addedPlusOneTimeStampStringNextLine = makeAddedPlusOneTimeStampString(addedPlusOneSecondsTimeNextLine);
                deepCopiedArgArray[i + 1]['pulsOneSecondsTimeStampObject']['headTimeStampByOverlap'] = addedPlusOneTimeStampStringNextLine;
              }
              break;

            default:
              console.error('想定外の分岐に到達しています。調査願います。');
              break;
          } // end of switch (key)

        } else {
          // 何もせず次の処理へ。
        }
      }); // end of Object.keys(deepCopiedArgArray[i]['plusOneSecondsFlagObject']['evaluationResultsObject']).forEach((key) =>

    } else {
      // 何もせず次の処理へ。
    } // end of if (deepCopiedArgArray[i]['plusOneSecondsFlagObject']['addOneSecondsFlag'] === true)
      
  } // end of for (let i = 0; i < deepCopiedArgArray.length; i ++)

  return deepCopiedArgArray;
}