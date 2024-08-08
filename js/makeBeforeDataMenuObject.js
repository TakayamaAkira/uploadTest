function makeBeforeDataMenuObject(argArray) {
  
  const deepCopiedArray = JSON.parse(JSON.stringify(argArray));


  const totalBaseLineString = (function(argArray) {

    let resultString = '';

    for (let i = 0; i < argArray.length; i ++) {
      Object.keys(argArray[i]).forEach((key) => {
        resultString += argArray[i][key];   
      });
    }

    return resultString;

  }(deepCopiedArray));


  const replaceTotalBaseLineString = totalBaseLineString.replace(/。/g, '。\t');


  const splitPeriodArray = (function(argString) {

    const resultArray = makeArraySplitTabKey(argString);

    for (let i = 0; i < resultArray.length; i ++) {

      if (resultArray[i] === '') {
        resultArray.splice(i, 1);
      } else {
        // 何もせず次の処理へ。
      }
    }

    return resultArray;

  }(replaceTotalBaseLineString));


  const beforeDataMeneObject = {
    'baseLineStringArray': deepCopiedArray,
    'splitPeriodBeforeData': splitPeriodArray,
  };

  return beforeDataMeneObject;

}