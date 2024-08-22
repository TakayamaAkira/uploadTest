function arrangeFormData(dataMaterial, buttonIdString, nameString) {

  const arrangedData = (function(dataMaterial, buttonIdString, nameString) {

    let allStrings = '';

    if (buttonIdString === 'pasting_area_button' || buttonIdString === 'output_after_data_result_button') {
      for (let i = 0; i < dataMaterial.length; i ++) {
        if (dataMaterial[i].name === nameString) {
          allStrings += dataMaterial[i].value + '\n';
        }
      }
      // 文字列の最後にある「\n」を削除します。
      const replaceLastLineBreakStrings = allStrings.replace(/\n$/, '');
      return replaceLastLineBreakStrings;
    } else {
      // 何もせず次の処理へ。
    } // end of if (nameString === 'pasting_area_button')


    if (buttonIdString === 'check_text_after_vs_before') {
      for (let i = 0; i < dataMaterial.length; i ++) {
        if (dataMaterial[i].name === nameString) {
          allStrings += dataMaterial[i].value + '\n';
        }
      }
      // 文字列の最後にある「\n」を削除します。
      const replaceLastLineBreakStrings = allStrings.replace(/\n$/, '');
      return replaceLastLineBreakStrings;
    } else {

    } // end of if (buttonIdString === 'check_text_after_vs_before')
    
    
    if (buttonIdString === 'again_check_text_after_vs_before') {
      allStrings = (function(dataMaterial, nameString) {
        let temporaryString = '';
        let timeStampCount = 0;
        const findPattern = /^☆（[０-９]{2,}：[０-５][０-９]：[０-５][０-９]）$/;

        for (let i = 0; i < dataMaterial.length; i ++) {
          if (nameString === dataMaterial[i].name) {
            if (findPattern.test(dataMaterial[i].value) === true && timeStampCount === 0) {
              temporaryString += dataMaterial[i].value + '\t';
              timeStampCount ++;          
            } else if (findPattern.test(dataMaterial[i].value) === false && dataMaterial[i].value === '') {
              temporaryString += dataMaterial[i].value + '\t';
            } else if (findPattern.test(dataMaterial[i].value) === false && dataMaterial[i].value !== '') {
              temporaryString += dataMaterial[i].value;
            } else if (findPattern.test(dataMaterial[i].value) === true && timeStampCount === 1) {
              temporaryString += '\t' + dataMaterial[i].value + '\n';
              timeStampCount = 0;
            } else {
              // 何もせず次の処理へ。
            }
          } else {
            // 何もせず次の処理へ。
          }
        }
        return temporaryString;
      }(dataMaterial, nameString));
      // 文字列の最後にある「\n」を削除します。
      const replaceLastLineBreakStrings = allStrings.replace(/\n$/, '');
      return replaceLastLineBreakStrings;

    } else {
      // 何もせず次の処理へ。
    } // end of if (buttonIdString === 'again_check_text_after_vs_before')


    /* コピー用です。
    if (buttonIdString === '') {
      allStrings = arg;
      // 文字列の最後にある「\n」を削除します。
      const replaceLastLineBreakStrings = allStrings.replace(/\n$/, '');
      return replaceLastLineBreakStrings;
    } else {
      // 何もせず次の処理へ。
    } // end of
    */


  }(dataMaterial, buttonIdString, nameString)); // end of const arrangedData  

  return arrangedData;
}