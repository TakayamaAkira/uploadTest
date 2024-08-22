function textCheckedAfterDataProcessing(thisForm, buttonIdString, itemNameObject, outputTargetObject) {
  console.log('---textCheckedAfterDataProcessing---');

  const arrangedFormAfterDataString = arrangeFormData(thisForm, buttonIdString, itemNameObject['after']);
  outputConsole({ arrangedFormAfterDataString });

  const againSetAndCheckedAfterData = setAndCheckAfterData(arrangedFormAfterDataString, itemNameObject['after']);
  outputConsole({ againSetAndCheckedAfterData });



  return;
}