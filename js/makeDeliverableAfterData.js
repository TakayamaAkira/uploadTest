function makeDeliverableAfterData(itemName, outputTargetString, downloadTargetIdString) {
  
  const afterData = JSON.parse(sessionStorage.getItem(itemName));


  const deliverableAfterData = (function(argArray) {

    const deepCopiedArgArray = JSON.parse(JSON.stringify(argArray));

    const allHeadToHipText = (function(copiedArgArray) {
      let temporaryStrings = '';
      for (let i = 0; i < copiedArgArray.length; i ++) {
        temporaryStrings += copiedArgArray[i]['baseLineString'] + '\n';
      }
      return temporaryStrings;
    }(deepCopiedArgArray)); // end of const allHeadToHipText

    return allHeadToHipText;
  }(afterData)); // end of const deliverableAfterData


  // 本当はダウンロード用データの中身に応じてtextareaのサイズを自動で100%にしたいところですが、大変なので後回しにしています。
  const calculateTextAreaRange = (function(argString) {
    const argStringLengthValue = argString.length;
    const colsNumber = 80;

    const rowsNumber = (function(argNumber) {
      const temporaryNumber =  argNumber / 20;
      const roundUpNumber = Math.ceil(temporaryNumber)
      return roundUpNumber;
    }(argStringLengthValue)); // end of const rowsNumber

    return { 'cols': colsNumber, 'rows': rowsNumber };
  }(deliverableAfterData));


  const outputTarget = document.getElementById(outputTargetString);
  outputTarget.innerHTML = 
  '<div>' +
    '<label for="deliverableAfterData"></label>' +
    '<textarea id="deliverableAfterData" name="deliverableAfterData" class="output-textarea" cols="' + calculateTextAreaRange['cols'] + '" rows="' + calculateTextAreaRange['rows'] + '">' + deliverableAfterData + '</textarea>' +
  '</div>';

  setItemToSessionStorage('deliverableAfterData', deliverableAfterData);

  const downloadData = new Blob([deliverableAfterData], {type: 'text/plain'});
  
  const reader = new FileReader();

  /* ダウンロード用データの中身をコンソールに出力するには、ここのコメントアウトを解除してください。
  reader.onload = function(){
    console.log(reader.result);
  };

  console.log('ダウンロード用データの中身をコンソールに出力');
  reader.readAsText(downloadData);
  */

  const downloadTarget = document.getElementById(downloadTargetIdString);
  downloadTarget.setAttribute('class', 'download-anchor-tag');
  downloadTarget.href = window.URL.createObjectURL(downloadData);
  const nowTime = makeNowTimeString(new Date());  
  downloadTarget.download = 'jimakuData_' + nowTime + '_checked';
  

  return;
}