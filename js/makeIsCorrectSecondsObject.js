function makeIsCorrectSecondsObject(argObject, currentLengthString) {
  
  const deepCopiedObject = JSON.parse(JSON.stringify(argObject));

  // 即時関数の戻り値を定数resultObjectに代入します。
  const resultObject = (function(argObject, currentLengthString) {
    
    const checkedObject = {
      'totalCorrectBool': false,
      'falseCount': 0,

      'headToHip': { 
        'secondsValue': 0,
        'flowOfTime': '',
        'withinRangeBool': false,
      },
  
      'headToNextHead': {
        'secondsValue': 0,
        'flowOfTime': '',
        'withinRangeBool': false,
      },
  
      'hipToNextHead': {
        'secondsValue': 0,
        'flowOfTime': '',
        'withinRangeBool': false,
      },

      // タイムスタンプの秒数が問題ないかどうかには全く影響しない項目です。
      // 後で処理するmakePlusOneSecondsFlagObject関数で使えるようにここで取得、格納しておきます。
      // 便宜上、次の行の頭からお尻の秒数に問題がないかを解析しますが、「'withinRangeBool'」は「true」で固定です。
      // 「今の行」で「次の行」のエラーを取得すると、「今の行」で問題がないのにエラー扱いになってしまうためです。
      // headToHipと調べることは同じです。
      'nextHeadToNextHip': {
        'secondsValue': 0,
        'flowOfTime': '',
        'withinRangeBool': true,
      },
    };


    // 各オブジェクトの「'flowOfTime'」と「'withinRangeBool'」、それに基づく「falseCount」を計算するための関数式です。
    // 各オブジェクトの「'secondsValue'」の計算が終了した後に使用します。
    const addFlowAndWithin = function(argObject, targetString) {

      // 各条件での秒数のリミット値を定義しておきます。
      const headToHipMinimumLimitSeconds = 0;
      const headToHipOverLimitSeconds = 45;
      const headToNextHeadMinimumLimitSeconds = 0;
      const hipToNextHeadLimitSecond = -4;
      const nextHeadToNextHipMinimumLimitSeconds = 0;
      const nextHeadToNextHipOverLimitSeconds = 45;

      let falseCount = 0;

      switch (targetString) {
        case 'headToHip':
          if (headToHipMinimumLimitSeconds <= argObject['secondsValue'] && argObject['secondsValue'] <= headToHipOverLimitSeconds) {
            argObject['flowOfTime'] = 'normal';
            argObject['withinRangeBool'] = true;
          } else {
            falseCount ++;
            if (argObject['secondsValue'] < headToHipMinimumLimitSeconds) {
              argObject['flowOfTime'] = 'reverseRun';
            } else if (headToHipOverLimitSeconds < argObject['secondsValue']){
              argObject['flowOfTime'] = 'overRun';
            } else {
              // 何もせず次の処理へ。
            }
          } 
          break;

        case 'headToNextHead':
          if (headToNextHeadMinimumLimitSeconds <= argObject['secondsValue']) {
            argObject['flowOfTime'] = 'normal';
            argObject['withinRangeBool'] = true;
          } else {
            falseCount ++;
            if (argObject['secondsValue'] < headToNextHeadMinimumLimitSeconds) {
              argObject['flowOfTime'] = 'reverseRun';
            } else {
              // 何もせず次の処理へ。
            }
          }
          break;

        case 'hipToNextHead':
          if (hipToNextHeadLimitSecond <= argObject['secondsValue']) {
            argObject['flowOfTime'] = 'normal';
            argObject['withinRangeBool'] = true;
          } else {
            falseCount ++;
            if (argObject['secondsValue'] < hipToNextHeadLimitSecond) {
              argObject['flowOfTime'] = 'reverseRun';
            } else {
              // 何もせず次の処理へ。
            }
          }
          break;

        case 'nextHeadToNextHip':
          if (nextHeadToNextHipMinimumLimitSeconds <= argObject['secondsValue'] && argObject['secondsValue'] <= nextHeadToNextHipOverLimitSeconds) {
            argObject['flowOfTime'] = 'normal';
            argObject['withinRangeBool'] = true;
          } else {
            // 次の行については次のカウンタで「今のカウンタの行」として処理します。
            // ここでfalseCountをインクリメントすると「今の行」で「次の行の秒数が規定値以内ではない」というエラーが発生してしまいます。
            // falseCount ++;
            if (argObject['secondsValue'] < nextHeadToNextHipMinimumLimitSeconds) {
              argObject['flowOfTime'] = 'reverseRun';
            } else if (nextHeadToNextHipOverLimitSeconds < argObject['secondsValue']) {
              argObject['flowOfTime'] = 'overRun';
            } else {
              // 何もせず次の処理へ。
            }
          } 
          break;

        default :
          falseCount ++;
          break;
      }
      return falseCount;
    }; // end of const addFlowAndWithin


    // switch文を使用して各条件の「秒数」をオブジェクトに格納します。
    // 最終行はタイムスタンプを持つ次の行がないため現在の行のみを使用します。
    // 「case: 'first'」と「case: 'halfWay'」の処理内容は同じですが、後の保守性、拡張性を考えて別caseにしています。
    // 現在処理しているオブジェクトが全体のどの位置にあるのかは「currentLengthString」で判断しています。
    switch (currentLengthString) {
      case 'first':
        // headToHip
        checkedObject['headToHip']['secondsValue'] = argObject['current']['hip'] - argObject['current']['head'];

        // headToNextHead
        checkedObject['headToNextHead']['secondsValue'] = argObject['next']['head'] - argObject['current']['head'];

        // hipToNextHead
        checkedObject['hipToNextHead']['secondsValue'] = argObject['next']['head'] - argObject['current']['hip'];

        // nextHeadToNextHip
        checkedObject['nextHeadToNextHip']['secondsValue'] = argObject['next']['hip'] - argObject['next']['head'];
        break;

      case 'halfway':
        // headToHip
        checkedObject['headToHip']['secondsValue'] = argObject['current']['hip'] - argObject['current']['head'];

        // headToNextHead
        checkedObject['headToNextHead']['secondsValue'] = argObject['next']['head'] - argObject['current']['head'];

        // hipToNextHead
        checkedObject['hipToNextHead']['secondsValue'] = argObject['next']['head'] - argObject['current']['hip'];

        // headToHip
        checkedObject['nextHeadToNextHip']['secondsValue'] = argObject['next']['hip'] - argObject['next']['head'];
        break;

      case 'last':
        // headToHip
        checkedObject['headToHip']['secondsValue'] = argObject['current']['hip'] - argObject['current']['head'];

        // 「'last'」の下記3つのオブジェクトの「'secondsValue'」は、次の行がないためデフォルト値の「0」のままにしておきます。
        // 「0」のままにしておけば、addFlowAndWithin関数を実行しても「'flowOfTime'」は「'normal'」、「'withinRangeBool'」は「true」が返ってくるので問題ありません。
        // ・「'headToNextHead'」
        // ・「'hipToNextHead'」
        // ・「'nextHeadToNextHip'」
        break;

    } // end of switch (currentLengthString)


    Object.keys(checkedObject).forEach((floor_1_key) => {
      if (typeof checkedObject[floor_1_key] === 'object' && checkedObject[floor_1_key] !== null) {
        if (floor_1_key === 'headToHip' || floor_1_key === 'headToNextHead' || floor_1_key === 'hipToNextHead' || floor_1_key === 'nextHeadToNextHip') {
          checkedObject['falseCount'] += addFlowAndWithin(checkedObject[floor_1_key], floor_1_key);
        } else {
          // 何もせず次の処理へ。
        }
      } else {
        // 何もせず次の処理へ。
      } 
    }); // end of Object.keys(checkedObject).forEach((floor_1_key) =>
      

    if (checkedObject['falseCount'] === 0) {
      checkedObject['totalCorrectBool'] = true;     
    } else {
      // 何もせず次の処理へ。
    }

    return checkedObject;
  }(deepCopiedObject, currentLengthString)); // end of resultObject
  
  return resultObject;
}