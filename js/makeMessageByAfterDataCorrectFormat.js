function makeMessageByAfterDataCorrectFormat(argObject) {

  const deepCopiedArgObject = JSON.parse(JSON.stringify(argObject));

  const errorElementArray = [];


  // 頭のタイムスタンプからお尻のタイムスタンプまでの体裁にとタイムスタンプの秒数等に問題があるかチェックし、問題なければ空配列をreturnして処理を終えます。
  // 基本的には問題のある場合しかこの関数は呼び出されませんが、念のためです。
  if (
    deepCopiedArgObject['isCorrectFormatObject']['totalCorrectBool'] === true 
    && deepCopiedArgObject['isCorrectSecondsObject']['totalCorrectBool'] === true 
  ) {
    return errorElementArray;

  } else {
    // 何もせず次の処理へ。
  } // end of if (deepCopiedArgObject['isCorrectFormatObject']['totalCorrectBool'] === true)


  // タブ記号の数に誤りがある場合、その内容をerrorElementArrayに格納します。
  if (deepCopiedArgObject['isCorrectFormatObject']['linePartsCount']['bool'] === false) {

    // オブジェクト名が長いので定数に代入します。
    const linePartsCountObject = JSON.parse(JSON.stringify(deepCopiedArgObject['isCorrectFormatObject']['linePartsCount']));
    
    switch (linePartsCountObject['amountOfLength']) {
      case 'under':
        errorElementArray.push('タブ記号：少');
        break;

      case 'over':
        errorElementArray.push('タブ記号：多');
        break;

      default:
        console.error('想定外の分岐に到達しています。調査願います。');
        break;
    } // end of switch (linePartsCountObject['amountOfLength'])

    // linePartsCountObject['bool'] === falseである以上、detailsオブジェクトの内容もfalse満載になっています。
    // まずはタブ記号の数がおかしいことだけメッセージをreturnし、処理を終えます。
    return errorElementArray;
        
  } else {
    // 何もせず次の処理へ。

  } // end of if (deepCopiedArgObject['isCorrectFormatObject']['linePartsCount']['bool'] === false)


  // 本文の体裁をチェックします。
  // タブ記号で区切られた各要素をチェックし、誤りがある場合、その内容をerrorElementArrayに格納します。
  const detailsObject = JSON.parse(JSON.stringify(deepCopiedArgObject['isCorrectFormatObject']['details']));
  Object.keys(detailsObject).forEach((key) => {

    switch (key) {
      case 'detail_1': 
        if (detailsObject[key]['format'] === false) {
          errorElementArray.push('頭のタイムスタンプの形：誤り');
        } else {
          // 何もせず次の処理へ。
        }
        break;

      case 'detail_2': 
        if (detailsObject[key]['format'] === false) {
          errorElementArray.push('タブとタブの間：異物混入');
        } else {
          // 何もせず次の処理へ。
        }
        break;

      case 'detail_3': 
        if (detailsObject[key]['detail_3_correctBool'] === false) {
          // 本文の体裁チェック
          if (detailsObject[key]['format'] === false) {
            errorElementArray.push('本文の体裁：誤り（ ' + detailsObject[key]['stringCountValue'] + ' 文字）');
          } else {
            // 何もせず次の処理へ。
          }

          // 本文の文字数チェック
          if (detailsObject[key]['stringCountBool'] === false) {
            errorElementArray.push('本文の文字数：多（ ' + detailsObject[key]['stringCountValue'] + ' 文字）');
          } else {
            // 何もせず次の処理へ。
          }

          // 使用禁止文字が含まれているかチェック
          if (detailsObject[key]['prohibitionBool'] === false) {
            const prohibitionStrings = (function(baseLineStrings, argArray) {
              let temporaryStrings = '';
              for (let i = 0; i < argArray.length; i ++) {
                temporaryStrings += baseLineStrings.substring(argArray[i], argArray[i] + 1);
              }
              return temporaryStrings;
            }(deepCopiedArgObject['splitBaseLineStringArray'][2], detailsObject[key]['prohibitionIndexArray'])); // end of const prohibitionStrings
            
            errorElementArray.push('使用禁止文字：使用（ ' + prohibitionStrings + ' ）');
          } else {
            // 何もせず次の処理へ。
          }
        } else {
          // 何もせず次の処理へ。
        }
        break;

      case 'detail_4': 
        if (detailsObject[key]['format'] === false) {
          errorElementArray.push('お尻のタイムスタンプの形：誤り');
        } else {
          // 何もせず次の処理へ。
        }
        break;

      default:
        console.error('想定外の分岐に到達しています。調査願います。');
        break;
    } // end of switch (key)
    
  }); // end of Object.keys(detailsObject).forEach((key) =>
  
  
  // 本文の体裁をチェックした結果、何か問題があればこの時点でerrorElementArrayにメッセージが格納されています。
  // この時点で何か問題がある場合、次の時間数のチェックでも問題が発生する可能性が高いです。
  // メッセージが格納されているかどうかチェックし（空配列のままかどうか）、メッセージが格納されていればerrorElementArrayをreturnし、処理を終えます。
  if (errorElementArray.length !== 0 || errorElementArray[0] !== undefined) {
    return errorElementArray;
  } else {
    // 何もせず次の処理へ。
  }


  // タイムスタンプの時間数をチェックします。
  // 何か問題があれば、その内容をerrorElementArrayに格納します。
  if (deepCopiedArgObject['isCorrectSecondsObject']['totalCorrectBool'] === false) {
    const isCorrectSecondsObject = deepCopiedArgObject['isCorrectSecondsObject'];
    Object.keys(isCorrectSecondsObject).forEach((key) => {
      
      switch (key) {
        case 'headToHip':
          if (isCorrectSecondsObject[key]['withinRangeBool'] === false) {
            switch (isCorrectSecondsObject[key]['flowOfTime']) {
              case 'reverseRun':
                errorElementArray.push('頭からお尻：逆走（ ' +  isCorrectSecondsObject[key]['secondsValue'] + ' 秒）');
                break;

              case 'overRun':
                errorElementArray.push('頭からお尻：長（ ' +  isCorrectSecondsObject[key]['secondsValue'] + ' 秒）');
                break;

              default:
                // 何もせず次の処理へ。
                break;
            } // end of switch (isCorrectSecondsObject[key]['flowOfTime'])

          } else {
            // 何もせず次の処理へ。
          } // end of if (isCorrectSecondsObject[key]['withinRangeBool'] === false)
          break; // end of case 'headToHip':


        case 'headToNextHead':
          if (isCorrectSecondsObject[key]['withinRangeBool'] === false) {
            switch (isCorrectSecondsObject[key]['flowOfTime']) {
              case 'reverseRun':
                errorElementArray.push('頭から次の頭：逆走（ ' +  isCorrectSecondsObject[key]['secondsValue'] + ' 秒）');
                break;

              // 頭から次の頭までの秒数に関して（'overRun'）はエラー項目はありません。
              
              default:
                // 何もせず次の処理へ。
                break;
            } // end of switch (isCorrectSecondsObject[key]['flowOfTime'])

          } else {
            // 何もせず次の処理へ。
          } // end of if (isCorrectSecondsObject[key]['withinRangeBool'] === false)
          break; // end of case 'headToNextHead':


        case 'hipToNextHead':
          if (isCorrectSecondsObject[key]['withinRangeBool'] === false) {
            switch (isCorrectSecondsObject[key]['flowOfTime']) {
              case 'reverseRun':
                errorElementArray.push('お尻から次の頭：逆走（ ' +  isCorrectSecondsObject[key]['secondsValue'] + ' 秒）');
                break;

              // お尻から次の頭までの秒数に関して（'overRun'）はエラー項目はありません。
              
              default:
                // 何もせず次の処理へ。
                break;
            } // end of switch (isCorrectSecondsObject[key]['flowOfTime'])

          } else {
            // 何もせず次の処理へ。
          } // end of if (isCorrectSecondsObject[key]['withinRangeBool'] === false)
          break; // end of case 'hipToNextHead':


          /* 「'nextHeadToNextHead'」については「次の行」のことなのでエラー扱いにはしません。
          case 'nextHeadToNextHead':
            if (isCorrectSecondsObject[key]['withinRangeBool'] === false) {
              switch (isCorrectSecondsObject[key]['flowOfTime']) {
                case 'reverseRun':
                  errorElementArray.push('次の頭から次のお尻：怪しい');
                  break;
  
                case 'overRun':
                  errorElementArray.push('次の頭から次のお尻：怪しい');
                  break;
  
                default:
                  // 何もせず次の処理へ。
                  break;
              } // end of switch (isCorrectSecondsObject[key]['flowOfTime'])
  
            } else {
              // 何もせず次の処理へ。
            } // end of if (isCorrectSecondsObject[key]['withinRangeBool'] === false)
            break; // end of case 'nextHeadToNextHead':
          */
          
        default:
          // 何もせず次の処理へ。
          break;
      } // end of switch (key)
      
    }); // end of Object.keys(isCorrectSecondsObject).forEach((key) =>

  } else {
    // 何もせず次の処理へ。
  } // end of if (deepCopiedArgObject['isCorrectSecondsObject']['totalCorrectBool'] === false)

  
  return errorElementArray;
}