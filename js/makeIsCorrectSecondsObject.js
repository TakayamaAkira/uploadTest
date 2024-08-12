function makeIsCorrectSecondsObject(argObject, currentLengthString) {
  
  const deepCopiedObject = JSON.parse(JSON.stringify(argObject));

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
    };


    // 各オブジェクトの「'flowOfTime'」と「'withinRangeBool'」、それに基づく「falseCount」を計算するための関数式です。
    // 各オブジェクトの「'secondsValue'」の計算が終了した後に使用します。
    const addFlowAndWithin = function(argObject, targetString) {

      // 各条件での秒数のリミット値を定義しておきます。
      const headToHipMinimumLimitSeconds = 0;
      const headToHipOverLimitSeconds = 45;
      const headToNextHeadMinimumLimitSeconds = 0;
      const hipToNextHeadLimitSecond = -4;

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

        default :
          falseCount ++;
          break;
      }
      return falseCount;
    };


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
        break;

      case 'halfway':
        // headToHip
        checkedObject['headToHip']['secondsValue'] = argObject['current']['hip'] - argObject['current']['head'];

        // headToNextHead
        checkedObject['headToNextHead']['secondsValue'] = argObject['next']['head'] - argObject['current']['head'];

        // hipToNextHead
        checkedObject['hipToNextHead']['secondsValue'] = argObject['next']['head'] - argObject['current']['hip'];
        break;

      case 'last':
        // headToHip
        checkedObject['headToHip']['secondsValue'] = argObject['current']['hip'] - argObject['current']['head'];
        break;

    } // end of switch (currentLengthString)

    Object.keys(checkedObject).forEach((floor_1_key) => {
      if (typeof checkedObject[floor_1_key] === 'object' && checkedObject[floor_1_key] !== null) {
        if (floor_1_key === 'headToHip' || floor_1_key === 'headToNextHead' || floor_1_key === 'hipToNextHead') {
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
  }(deepCopiedObject, currentLengthString));
  
  return resultObject;
}