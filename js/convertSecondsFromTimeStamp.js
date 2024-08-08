function convertSecondsFromTimeStamp(argObject) {
  
  const deepCopiedArgObject = JSON.parse(JSON.stringify(argObject));

  // 「時」「分」「秒」を「秒数」にするため、まずは全角文字列から半角文字列に変換します。
  Object.keys(deepCopiedArgObject).forEach((parentKey) => {
    Object.keys(deepCopiedArgObject[parentKey]).forEach((childKey) => {
      deepCopiedArgObject[parentKey][childKey] = convertNumberStringFullToHalf(deepCopiedArgObject[parentKey][childKey]);
    });
  });

  const secondsValueObject = makeSecondsValueObject(deepCopiedArgObject);

  const totalSecondsObject = makeTotalSecondsValueObject(secondsValueObject);

  return totalSecondsObject;

}