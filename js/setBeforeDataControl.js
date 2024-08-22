function setBeforeDataControl(thisForm, buttonIdString, itemNameObject) {

  const splitNewLineBeforeData = (function(thisForm, buttonIdString, itemNameObject) {

    const allStrings = (function(thisForm, itemNameObject) {
      let temporaryStrings = '';
      for (let i = 0; i < thisForm.length; i ++) {
        if (thisForm[i].name === itemNameObject['extractionAttributeName']) {
          temporaryStrings += thisForm[i].value;
        } else {
          // 何もせず次の処理へ。
        }
      } // end of for (let i = 0; i < thisForm.length; i ++)
      return temporaryStrings;
    }(thisForm, itemNameObject)); // end of const allStrings


    // allStringsを関数呼び出し時のid属性値に応じて加工します。

    // 各種データ貼り付け欄から編集前データを送信する場合です。
    if (buttonIdString === 'pasting_area_button') {
      
      // テスト環境ではformにテキストを打ち込んだ状態のため半角スペースを削除する処理を行っています。
      // 本番環境では、本文中の半角スペースまで削除してしまうため、絶対に行わないこと！
      // 下記「本番環境ではこっちを使用」を必ず使用すること。
      const replaceBeforeData = allStrings.replace(/ /g, '');

      // 文字列の最後にある「\n」を削除します。
      const replaceLastLineBreakStrings = replaceBeforeData.replace(/\n$/, '');
      const splitLineBreakBeforeData = replaceLastLineBreakStrings.split('\n');

      return splitLineBreakBeforeData;

      /* 本番環境ではこっちを使用
      return temporaryStrings;
      */

    } else {
      // 何もせず次の処理へ。
    } // end of if (buttonIdString === 'pasting_area_button')


    // 編集後データと編集前データの本文チェック結果出力欄から編集前データを送信する場合です。
    if (buttonIdString === 'again_check_text_after_vs_before') {

      const addPeriodBeforeData = (function(argString) {

        const splitPeriodBeforeData = argString.split('。');

        const deepCopiedArgArray = JSON.parse(JSON.stringify(splitPeriodBeforeData));

        for (let i = 0; i < deepCopiedArgArray.length; i ++) {
          if (i !== deepCopiedArgArray.length - 1) { // 最終インデックス以外の場合。
            deepCopiedArgArray[i] = deepCopiedArgArray[i] + '。';
      
          } else { // 最終インデックスの場合。
            // 何もせず次の処理へ。
      
            // 何もせず次の処理へ移行する理由は下記のとおりです。
            // 編集前の本文が「。」で終わっている場合、このインデックスには空文字「''」が入っています。
            // 編集前の本文が「。」以外で終わっている場合、このインデックスには何らかの文字列が入っています。
            // 将来的に「○○時○○分閉会」等で終わることも考えられます。
            // どちらにせよ、「。」を追加する必要はないため、何もせず次の処理へ移行します。
          }
        } // end of for (let i = 0; i < deepCopiedArgArray.length; i ++)
      
        if (deepCopiedArgArray[ deepCopiedArgArray.length - 1 ] === '') {
          deepCopiedArgArray.splice( deepCopiedArgArray.length - 1, 1 );
        } else {
          // 何もせず次の処理へ。
        } // end of if (deepCopiedArgArray[ deepCopiedArgArray.length - 1 ] === '')

        return deepCopiedArgArray;

      }(allStrings)); // end of const addPeriodBeforeData

      return addPeriodBeforeData;

    } else {
      // 何もせず次の処理へ。
    }

    return;

  }(thisForm, buttonIdString, itemNameObject)); // end of const splitNewLineBeforeData

  const beforeDataMenuArray = makeBeforeDataMenuObject(splitNewLineBeforeData);
  const itemObject = JSON.stringify(beforeDataMenuArray);
  setItemToSessionStorage(itemNameObject['setItemName'], itemObject);

  return;

}