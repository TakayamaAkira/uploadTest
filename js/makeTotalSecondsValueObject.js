function makeTotalSecondsValueObject(argObject) {
  
  const returnObject = {
    'head': 0,
    'hip': 0,
  };

  const deepCopiedObject = JSON.parse(JSON.stringify(argObject));

  Object.keys(deepCopiedObject).forEach((parentKey) => {
    Object.keys(deepCopiedObject[parentKey]).forEach((childKey) => {
      switch (parentKey) {
        case 'head':
          returnObject['head'] += deepCopiedObject[parentKey][childKey];
          break;
        case 'hip':
          returnObject['hip'] += deepCopiedObject[parentKey][childKey];
          break;
      }
    });
  });

  return returnObject;

}