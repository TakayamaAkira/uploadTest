function makePlusOneSecondsFlagObject(argArray) {

  // お尻のタイムスタンプにプラス1秒するのは下記の条件のいずれかに当てはまるものです。
  // ・最終行　※次の行がないためプラス1秒しても影響なし
  // ・今の行のお尻から次の行の頭まで1秒以上の間隔がある

  // お尻と次の行の頭にプラス1秒するのは下記の条件に当てはまるものです。
  // なお、次の行の頭にもプラス1秒するのは、今の行のお尻に対するプラス1秒をより確実にするためです。
  // ・今の行のお尻から次の行の頭までの間隔が1秒に満たないが、今の行の頭からお尻が2秒以下、かつ、次の行の頭からお尻が5秒以上のもの

  // 上記いずれの条件に満たない場合、プラス1秒はしません。

  const deepCopiedArgArray = JSON.parse(JSON.stringify(argArray));

  const lastLineIndexNumber = deepCopiedArgArray.length - 1;

  // 
  for (let i = 0; i < deepCopiedArgArray.length; i ++) {

    const plusOneSecondsFlagObject = (function(deepCopiedArgArray, i, lastLineIndexNumber) {

      const temporaryObject = {
        // 各論理値のデフォルト値はfalseとしておきます。
        // プラス1秒するかどうかの論理値
        // 'evaluationResultsObject'オブジェクトの各論理値のいずかがtrueであればtrueとなります。
        'addOneSecondsFlag': false,
        // どういった条件でプラス1秒するかの詳細
        'evaluationResultsObject': {
          // 最終行かどうかの論理値
          'lastLine': false,
          // お尻から次の行の頭までの間隔が1秒以上あるかどうかの論理値
          'notOverlapNextHead': false,
          // お尻から次の行の頭までの間隔が1秒に満たないが、今の行、次の行の秒数が基準を満たしているかどうか
          'overlapButWithinRange': false,
        },
      }; // end of const temporaryObject

      // 各基準値を定数で定義しておきます。
      const notOverlapNextHeadNumber = 1;
      const headToHipLowerLimitNumber = 2;
      const nextHeadToNextHipUpperLimit = 5;
      
  
      switch (i) {
        // 最終行の場合
        case lastLineIndexNumber:
          // 最終行はプラス1秒します。
          // これ以上調べても結果は変わらないため、これで処理を終えます。
          temporaryObject['evaluationResultsObject']['lastLine'] = true;
          break;

        // 最終行ではない場合
        default:
          // 今のお尻と次の頭までの間隔が基準値以上あるかどうかで条件分岐します。
          if (deepCopiedArgArray[i + 1]['timeStampSecondsValueObject']['head'] - deepCopiedArgArray[i]['timeStampSecondsValueObject']['hip'] >= notOverlapNextHeadNumber) {
            // 間隔が基準値以上あるためプラス1秒します。
            // これ以上調べても結果は変わらないため、これで処理を終えます。
            temporaryObject['evaluationResultsObject']['notOverlapNextHead'] = true;

          } else { // さらに条件分岐を続けます。

            // ここからは今のお尻から次の頭までの間隔が基準値に満たないことが前提条件となります。
            // 今の行と次の行の秒数が基準値以上あるかどうかで条件分岐します。
            if (
              deepCopiedArgArray[i]['timeStampSecondsValueObject']['hip'] - deepCopiedArgArray[i]['timeStampSecondsValueObject']['head'] <= headToHipLowerLimitNumber && 
              deepCopiedArgArray[i + 1]['timeStampSecondsValueObject']['hip'] - deepCopiedArgArray[i + 1]['timeStampSecondsValueObject']['head'] >= nextHeadToNextHipUpperLimit
            ) {

              temporaryObject['evaluationResultsObject']['overlapButWithinRange'] = true;

            } else {
              // これまでのいずれの条件も満たしませんでした。プラス1秒する要素が見つからなかったことになります。
              // 何もせず次の処理へ。
            }
          }
          break;
      } // end of switch (i)


      // キー「'evaluationResultsObject'」のオブジェクト内に1つでもtrueがある場合、プラス1秒する判定は「true」とします。
      Object.keys(temporaryObject['evaluationResultsObject']).forEach((key) => {
        if (temporaryObject['evaluationResultsObject'][key] === true) {
          // オブジェクト内に「true」がありました。プラス1秒判定は「true」とします。
          temporaryObject['addOneSecondsFlag'] = true;  

        } else {
          // オブジェクト内に「true」がありませんでした。
          // プラス1秒判定のデフォルト値は「false」のため、何もせず次の処理へ。
        }
      }); // end of Object.keys(temporaryObject['evaluationResultsObject']).forEach((key) =>

      // temporaryObjectをreturnし、定数plusOneSecondsFlagObjectの内容を確定させます。
      return temporaryObject;
    }(deepCopiedArgArray, i, lastLineIndexNumber)); // end of const plusOneSecondsFlagObject
    

    // deepCopiedArgArrayに新しく「'plusOneSecondsFlagObject'」をキーとするオブジェクトを作成し、即時関数で作成したplusOneSecondsFlagObjectを格納します。
    deepCopiedArgArray[i]['plusOneSecondsFlagObject'] = plusOneSecondsFlagObject;
  } // end of for (let i = 0; i < deepCopiedArgArray.length; i ++)

  // プラス1秒するかどうかの判定結果を格納したオブジェクトをreturnし、処理を終えます。
  return deepCopiedArgArray;
}