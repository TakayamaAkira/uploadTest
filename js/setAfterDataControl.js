function setAfterDataControl(thisForm, itemName) {
  
  for (let i = 0; i < thisForm.length; i ++) {

    if (thisForm[i].name === itemName) {
      // テスト環境ではformにテキストを打ち込んだ状態のため半角スペースを削除する処理を行っています。
      // 本番環境では、本文中の半角スペースまで削除してしまうため、絶対に行わないこと！
      // 下記「本番環境ではこっちを使用」を必ず使用すること。
      const replaceAfterData = thisForm[i].value.replace(/ /g, '');
      const splitNewLineAfterData = replaceAfterData.split('\n');
      const afterDataMenuArray = makeAfterDataMenuObject(splitNewLineAfterData);


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
        console.log('me : ' + me);

        const isCorrectSecondsObject = (function(argArray, meCount) {

          const deepCopiedArray = JSON.parse(JSON.stringify(argArray));
          const lastLineLengthValue = deepCopiedArray.length - 1;
          
          switch (meCount) {
            case 0:
              return makeIsCorrectSecondsObject(
                {
                  'current': deepCopiedArray[meCount]['timeStampSecondsValueObject'],
                  'next': deepCopiedArray[meCount + 1]['timeStampSecondsValueObject'],
                },
                'first'
              );
  
            case lastLineLengthValue:
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
          
        }(afterDataMenuArray, me)); // end of const isCorrectSecondsObject

        outputConsole({ isCorrectSecondsObject });
      
        // タイムスタンプの時間数を計算し、規定の時間内となっているかチェックしたオブジェクトを作成します。作成したオブジェクトはafterDataMenuArray[i]['isCorrectSecondsObject']に格納します。
        afterDataMenuArray[i]['isCorrectSecondsObject'] = isCorrectSecondsObject;

      } // end of for (let me = 0; me < afterDataMenuArray.length; me ++)

      // outputConsole({ afterDataMenuArray });

      const itemObject = JSON.stringify(afterDataMenuArray);
      setItemToSessionStorage(itemName, itemObject);

      /* 本番環境ではこっちを使用
      const splitNewLineAfterData = thisForm[i].value.split('\n');
      const afterDataMenuArray = makeAfterDataMenuObject(splitNewLineAfterData);


      for (let i = 0; i < afterDataMenuArray.length; i ++){
        // 行ごとにタブ記号で分割した配列にし、afterDataMenuArray[i]['splitBaseLineStringArray']に格納します。
        afterDataMenuArray[i]['splitBaseLineStringArray'] = makeArraySplitTabKey(afterDataMenuArray[i]['baseLineString']);

        // タイムスタンプから「時」「分」「秒」の桁ごとに文字列を取得し、afterDataMenuArray[i]['timeStampStringObject']に格納します。
        const timeStampStringObject = makeTimeStampStringObject(afterDataMenuArray[i]['splitBaseLineStringArray']);
        afterDataMenuArray[i]['timeStampStringObject'] = timeStampStringObject;
        
        // 各行の「頭」と「お尻」のタイムスタンプから「時」「分」「秒」の「秒数」を取得し、その合計値をafterDataMenuArray[i]['timeStampSecond']に格納します。
        const timeStampTotalSecondsValueObject = convertSecondsFromTimeStamp(afterDataMenuArray[i]['timeStampStringObject']);
        afterDataMenuArray[i]['timeStampSecondsValueObject'] = timeStampTotalSecondsValueObject;
      }

      const itemObject = JSON.stringify(afterDataMenuArray);
      setItemToSessionStorage(itemName, itemObject);
      */

    } else {
      // 何もせず次の処理へ。
    }
  }

  // 戻り値はないため、returnして処理を終えます。
  return;

}