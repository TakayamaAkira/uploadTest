function plusOneSecondsProcessing(itemName) {
  console.log('---plusOneSecondsProcessing---');

  const afterData = JSON.parse(sessionStorage.getItem(itemName));
  outputConsole({ afterData });

  const plusOneFlagStoredAfterData = makePlusOneSecondsFlagObject(afterData);
  outputConsole({ plusOneFlagStoredAfterData });
  
}