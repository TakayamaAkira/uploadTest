function makeAfterDataMenuObject(argArray) {
  
  const deepCopiedArray = JSON.parse(JSON.stringify(argArray));
  
  for (let i = 0; i < deepCopiedArray.length; i ++) {

    deepCopiedArray[i] = {      
      'baseLineString': deepCopiedArray[i],
      'splitBaseLineStringArray': '',
      'timeStampStringObject': '',
      'timeStampSecondsValueObject': '',
      'isCorrectFormatObject': '',
      'isCorrectSecondsObject': '',
    };      
  }

  return deepCopiedArray;

}