function makeSecondsValueObject(argObject) {

  const deepCopiedObject = JSON.parse(JSON.stringify(argObject));

  Object.keys(deepCopiedObject).forEach((parentKey) => {
    Object.keys(argObject[parentKey]).forEach((childKey) => {
      switch (childKey) {
        case 'hour':
          deepCopiedObject[parentKey][childKey] = Number(deepCopiedObject[parentKey][childKey]) * 60 * 60;
          break;

        case 'minute':
          deepCopiedObject[parentKey][childKey] = Number(deepCopiedObject[parentKey][childKey]) * 60;
          break;

        case 'second':
          deepCopiedObject[parentKey][childKey] = Number(deepCopiedObject[parentKey][childKey]);
          break;
      }
    });
  });

  return deepCopiedObject;

}