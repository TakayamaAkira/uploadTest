function makeIsCorrectFormatObject(argObject) {

  const deepCopiedObject = JSON.parse(JSON.stringify(argObject));


  const resultObject = (function(argObject) {
    const checkedObject = {
      'resultBool': false,
      'linePartsCount': {
        'bool': false,
        'amountOfLength': '',
        'loopLengthValue': 0,
      },
      'details': {
        'detail_1': {
          'format': false,
        },
        'detail_2': {
          'format': false,
        },
        'detail_3': {
          'format': false,
          'stringCountBool': false,
          'stringCountValue': 0,
        },
        'detail_4': {
          'format': false,
        },
      },
      'falseCount': 0,      
    }; // end of const checkedObject
    

    const detail_1And4_CorrectPattern = /^☆（[０-９]{2,}：[０-５][０-９]：[０-５][０-９]）$/;
    const detail_2_CorrectPattern = '';
    const detail_3_CorrectPattern = /.+/;
    const detail_3_stringCountLimit = 150;

    let falseCount = 0;


    checkedObject['linePartsCount']['loopLengthValue'] = argObject.length;

    if (argObject.length === 4) {
      checkedObject['linePartsCount']['bool'] = true;
      checkedObject['linePartsCount']['amountOfLength'] = 'match';

    } else {
      falseCount ++;
      checkedObject['falseCount'] = falseCount;

      if (argObject.length < 4) {
        checkedObject['linePartsCount']['amountOfLength'] = 'under';
      } else if (argObject.length > 4) {
        checkedObject['linePartsCount']['amountOfLength'] = 'over';
      } else {
        // 何もせず次の処理へ。
      }
      return checkedObject;

    } // end of if (argObject.length === 4)


    for (let i = 0; i < argObject.length; i ++) {

      switch (i) {
        case 0:
          if (detail_1And4_CorrectPattern.test(argObject[i])) {
            checkedObject['details']['detail_1']['format'] = true;
          } else {
            falseCount ++;
          }
          break;

        case 1:
          if (detail_2_CorrectPattern === argObject[i]) {
            checkedObject['details']['detail_2']['format'] = true;
          } else {
            falseCount ++;
          }
          break;

        case 2:
          checkedObject['details']['detail_3']['stringCountValue'] = argObject[i].length;
          if (detail_3_CorrectPattern.test(argObject[i])) {
            checkedObject['details']['detail_3']['format'] = true;
            if (argObject[i].length <= detail_3_stringCountLimit) {
              checkedObject['details']['detail_3']['stringCountBool'] = true;

              if (argObject[i].match(/☆（[０-９]{2,}：[０-５][０-９]：[０-５][０-９]）/)) {
                alert('タイムスタンプが本文中に含まれています。問題ないか御確認願います。\n\n該当箇所↓\n\n' + argObject[i]);
              } else {
                // 何もせず次の処理へ。
              }

            } else {
              falseCount ++;
            }
          } else {
            falseCount ++;
          }
          break;

        case 3:
          if (detail_1And4_CorrectPattern.test(argObject[i])) {
            checkedObject['details']['detail_4']['format'] = true;
          } else {
            falseCount ++;
          }
          break;
      }
    }

    checkedObject['falseCount'] = falseCount;

    if (checkedObject['falseCount'] === 0) {
      checkedObject['resultBool'] = true;
    } else {
      // 何もせず次の処理へ。
    }

    return checkedObject;

  }(deepCopiedObject)); // end of const resultObject

  return resultObject;

}