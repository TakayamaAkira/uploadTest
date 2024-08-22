function makeAfterDataMenuObject(argArray) {
  
  const deepCopiedArray = JSON.parse(JSON.stringify(argArray));
  
  for (let i = 0; i < deepCopiedArray.length; i ++) {

    deepCopiedArray[i] = {      
      'baseLineString': deepCopiedArray[i],
      'splitBaseLineStringArray': '',
      'mainDataObject': '',
      'timeStampStringObject': '',
      'timeStampSecondsValueObject': '',
      'isCorrectFormatObject': '',
      'isCorrectSecondsObject': '',
      'allCorrectBool': false,
    };      
  }

  return deepCopiedArray;

}