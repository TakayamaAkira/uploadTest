function makeTimeStampStringObject(argArray) {
  
  const pickupTimeStamp = (function(argArray) {
    const returnArray = [];
    const findPattern = /^☆（[０-９]{2,}：[０-５][０-９]：[０-５][０-９]）$/;
    for (let i = 0; i < argArray.length; i ++) {
      if (findPattern.test(argArray[i])) {
        returnArray.push(argArray[i]);
      } else {
        // 何もせず次の処理へ。
      }
    }
    return returnArray;
  }(argArray));


  const splitDigitTimeStampArray = (function(argArray) {
    const returnArray = [];
    for (let i = 0; i < argArray.length; i ++) {
      const replaceTimeStampString = argArray[i].replace(/[☆|（|）]/g, '');
      const splitTimeStampArray = replaceTimeStampString.split('：');
      returnArray.push(splitTimeStampArray);
    }
    return returnArray;
  }(pickupTimeStamp)); // const splitDigitTimeStampArray = (function


  const splitDigitTimeStampObject = (function(argArray) {
    const returnObject = {
      'head': '',
      'hip': '',
    };


    const makeHourMinuteSecondObject = function(argArray) {
      const returnObject = {
        'hour': '',
        'minute': '',
        'second': '',
      };

      for (let i = 0; i < argArray.length; i ++) {
        switch (i) {
          case 0:
            returnObject['hour'] = argArray[i];
            break;
          case 1:
            returnObject['minute'] = argArray[i];
            break;
          case 2:
            returnObject['second'] = argArray[i];
            break;
        }
      } // end of for (let i = 0; i < argArray.length; i ++)

      return returnObject;

    }; // end of const makeHourMinuteSecondObject = function


    for (let i = 0; i < argArray.length; i ++) {
      switch (i) {
        case 0:
          returnObject['head'] = makeHourMinuteSecondObject(argArray[i]);
          break;

        case 1:
          returnObject['hip'] = makeHourMinuteSecondObject(argArray[i]);
          break;
      }
    } // end of for (let i = 0; i < argArray.length; i ++)

    return returnObject;

  }(splitDigitTimeStampArray)); // end of const splitDigitTimeStampObject
  
  return splitDigitTimeStampObject;

}