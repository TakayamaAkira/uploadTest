function setAndCheckAfterData(argObject, nameString) {

  // 想定ではargObjectの中身はform要素です。
  // form要素でない場合、通常の処理を行うことができないためnullをreturnして処理を終えます。
  // nullはtypeof演算子で「'object'」が返ってきてしまうため、同時にnullチェックも行います。
  if (typeof argObject !== 'object' || argObject === null) {
    return null;
  } else {
    // 何もせず次の処理へ。
  }

  const formStrings = (function(argObject, nameString) {
    let allStrings = '';
    for (let i = 0; i < argObject.length; i ++) {
      if (argObject[i].name === nameString) {
        allStrings += argObject[i].value + '\n';
      }
    }
    // 文字列の最後にある「\n」を削除します。
    const replaceLastLineBreakStrings = allStrings.replace(/\n$/, '');
    return replaceLastLineBreakStrings;
  }(argObject, nameString));


  if (formStrings !== '') {
    // テスト環境ではformにテキストを打ち込んだ状態のため半角スペースを削除する処理を行っています。
    // 本番環境では、本文中の半角スペースまで削除してしまうため、絶対に行わないこと！
    // 下記「本番環境ではこっちを使用」を必ず使用すること。
    const replaceAfterData = formStrings.replace(/ /g, '');
    const splitNewLineAfterData = replaceAfterData.split('\n');
    const afterDataMenuArray = makeAfterDataMenuObject(splitNewLineAfterData);
    const lastLengthMinus_1_value = afterDataMenuArray.length - 1;
      

    for (let i = 0; i < afterDataMenuArray.length; i ++) {
      // 行ごとにタブ記号で分割した配列にし、afterDataMenuArray[i]['splitBaseLineStringArray']に格納します。
      afterDataMenuArray[i]['splitBaseLineStringArray'] = makeArraySplitTabKey(afterDataMenuArray[i]['baseLineString']);

      // タイムスタンプから「時」「分」「秒」の桁ごとに文字列を取得し、afterDataMenuArray[i]['timeStampStringObject']に格納します。
      const timeStampStringObject = makeTimeStampStringObject(afterDataMenuArray[i]['splitBaseLineStringArray']);
      afterDataMenuArray[i]['timeStampStringObject'] = timeStampStringObject;
        
      // 各行の「頭」と「お尻」のタイムスタンプから「時」「分」「秒」の「秒数」を取得し、その合計値をafterDataMenuArray[i]['timeStampSecond']に格納します。
      const timeStampTotalSecondsValueObject = convertSecondsFromTimeStamp(afterDataMenuArray[i]['timeStampStringObject']);
      afterDataMenuArray[i]['timeStampSecondsValueObject'] = timeStampTotalSecondsValueObject;

      // タブ記号で分割した行を分析し、形式や文字数をチェックしたオブジェクトを作成します。作成したオブジェクトはafterDataMenuArray[i]['isCorrectFormatObject']に格納します。
      const isCorrectFormatObject = makeIsCorrectFormatObject(afterDataMenuArray[i]['splitBaseLineStringArray']);
      afterDataMenuArray[i]['isCorrectFormatObject'] = isCorrectFormatObject;

    } // end of for (let i = 0; i < afterDataMenuArray.length; i ++)


    // タイムスタンプの時間計算に関しては「基準となる行」と「次の行」の情報が必要になります。
    // そのため、「for i」ループを回し終えた後、改めてループを行います。
    // カウンタ変数は見やすさのため「me」とします。
    for (let me = 0; me < afterDataMenuArray.length; me ++) {

      // タイムスタンプの時間数を計算し、規定の時間内となっているかチェックしたオブジェクトを作成します。
      // 複数の定数、変数を用いるため、即時関数内で作成します。
      const isCorrectSecondsObject = (function(argArray, meCount, lastLengthMinus_1_value) {

        const deepCopiedArray = JSON.parse(JSON.stringify(argArray));
          
        switch (meCount) {
          case 0:
            return makeIsCorrectSecondsObject(
              {
                'current': deepCopiedArray[meCount]['timeStampSecondsValueObject'],
                'next': deepCopiedArray[meCount + 1]['timeStampSecondsValueObject'],
              },
              'first'
            );
  
          case lastLengthMinus_1_value:
            return makeIsCorrectSecondsObject(
              {
                'current': deepCopiedArray[meCount]['timeStampSecondsValueObject'],
              },
              'last'
            );
  
          default:
            return makeIsCorrectSecondsObject(
              {
                'current': deepCopiedArray[meCount]['timeStampSecondsValueObject'],
                'next': deepCopiedArray[meCount + 1]['timeStampSecondsValueObject'],
              },
              'halfway'
            );
        }
          
      }(afterDataMenuArray, me, lastLengthMinus_1_value)); // end of const isCorrectSecondsObject

      // 作成したオブジェクトをafterDataMenuArray[i]['isCorrectSecondsObject']に格納します。
      afterDataMenuArray[me]['isCorrectSecondsObject'] = isCorrectSecondsObject;

      // 体裁と秒数のチェックが終わったため、総合判定をafterDataMenuArray[me]['allCorrectBool']に格納します。
      if (afterDataMenuArray[me]['isCorrectFormatObject']['totalCorrectBool'] === true && afterDataMenuArray[me]['isCorrectSecondsObject']['totalCorrectBool'] === true) {
        afterDataMenuArray[me]['allCorrectBool'] = true;
      } else {
        afterDataMenuArray[me]['allCorrectBool'] = false;
      }

    } // end of for (let me = 0; me < afterDataMenuArray.length; me ++)


    const useBySetObject = JSON.stringify(afterDataMenuArray);
    setItemToSessionStorage(nameString, useBySetObject);

    
    /* 本番環境ではこっちを使用
      
    */


    // 各チェック結果を格納した配列をreturnして処理を終えます。
    return afterDataMenuArray;

  } else {
    // 何もせず次の処理へ。
  } // end of if (formStrings !== '')
  
  // nameStringと同じ値を持つname属性値がない場合、ここまで来ます。
  // alertを出力して注意喚起するとともに、nullをreturnして処理を終えます。
  alert('「' + nameString + '」と同じ値を持つname属性値が見つかりませんでした。\nページ管理者に御連絡願います。');
  return null;

}