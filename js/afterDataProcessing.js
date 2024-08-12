function afterDataProcessing(thisForm, nameString, outputTargetString) {
  
  const checkedAfterData = setAndCheckAfterData(thisForm, nameString);
  
  outputAfterDataResult(checkedAfterData, outputTargetString);

  return;
}