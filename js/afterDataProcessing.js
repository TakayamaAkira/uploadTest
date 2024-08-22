function afterDataProcessing(thisForm, buttonIdString, nameString, outputTargetString) {

  const arrangedFormAfterDataString = arrangeFormData(thisForm, buttonIdString, nameString['extractionAttributeName']);
  
  const checkedAfterData = setAndCheckAfterData(arrangedFormAfterDataString, nameString['setItemName']);
  
  outputAfterDataResult(checkedAfterData, outputTargetString);

  return;
}