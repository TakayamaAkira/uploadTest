function makeIsCorrectSecondsObject(argObject, positionString) {
  
  const deepCopiedObject = JSON.parse(JSON.stringify(argObject));

  const resultObject = (function(argObject, positionString) {

    const checkedObject = {
      'totalResultBool': '',

      'headToHip': { 
        'length': 0,
        'amountOfLength': '',
        'withinRangeBool': true,
      },
  
      'headToNextHead': {
        'length': 0,
        'amountOfLength': '',
        'withinRangeBool': true
      },
  
      'hipToNextHead': {
        'length': 0,
        'amountOfLength': '',
        'withinRangeBool': true,
      },
    };


    switch (positionString) {
      case 'first':

        break;

      case 'halfway':

        break;

      case 'last':

        break;
    }

    // outputConsole({ checkedObject });

    return;

    // return checkedObject;

  }(deepCopiedObject, positionString));
  
  return '★';

  // return resultObject;
}