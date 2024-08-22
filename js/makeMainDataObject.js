function makeMainDataObject(argArray) {

  const deepCopiedArgArray = JSON.parse(JSON.stringify(argArray));

  const returnObject = (function(argArray) {

    const temporaryObject = {
      'object_0_headTimeStamp': '',
      'object_1_betweenTabKey': '',
      'object_2_mainTextArray': '',
      'object_3_hipTimeStamp': '',
    };

    for (let i = 0; i < argArray.length; i ++) {
      switch (i) {
        case 0:
          temporaryObject['object_0_headTimeStamp'] = argArray[i];
          break;

        case 1:
          temporaryObject['object_1_betweenTabKey'] = argArray[i];
          break;

        case 2:
          temporaryObject['object_2_mainTextArray'] = makeMainTextArray(argArray[i], 'after');
          break;

        case 3:
          temporaryObject['object_3_hipTimeStamp'] = argArray[i];
          break;

        default:

          break;
      }
    }

    return temporaryObject;

  }(deepCopiedArgArray));

  return returnObject;

}