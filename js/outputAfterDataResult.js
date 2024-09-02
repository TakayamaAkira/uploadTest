function outputAfterDataResult(argArray = null, outputTargetString) {

  try {
    if (Array.isArray(argArray) !== true && argArray !== null) {
      alert('outputAfterDataResultに想定外の引数（配列またはnull以外）が渡されています。\n\n' + argArray + '\n\nページ管理者に御連絡願います。')
      throw new Error('第1引数は編集後データを解析した結果を渡してください。配列またはnullです。');
    } else {
      // 何もせず次の処理へ。
    }
  } catch (e) {
    console.error(e);
  }

  try {
    if (typeof outputTargetString !== 'string') {
      alert('outputAfterDataResultの第2引数が文字列型で渡されていません。\n\n' + outputTargetString + '\n\nページ管理者に御連絡願います。');
      throw new Error('第2引数は結果を出力したいHTML要素のid属性値を文字列型で渡す必要があります。');
    } else {
      // 何もせず次の処理へ。
    }

    if (document.getElementById(outputTargetString) === null) {
      alert('outputAfterDataResultの第2引数に渡した文字列と同じ値を持つid属性値が見つかりませんでした。\n\n' + outputTargetString + '\n\nページ管理者に御連絡願います。');
      throw new Error('つづり間違いの可能性が高いです。御確認願います。');
    } else {
      // 何もせず次の処理へ。
    }

  } catch (e) {
    console.error(e);
  }


  const deepCopiedArgArray = JSON.parse(JSON.stringify(argArray));

  const outputTarget = document.getElementById(outputTargetString);

  // 結果出力欄を初期化（空文字）します。初期化しないとこの関数を呼び出すたびに結果出力欄が加算されてしまいます。
  outputTarget.innerHTML = '';

  
  for (let i = 0; i < deepCopiedArgArray.length; i ++) {
    if (deepCopiedArgArray[i]['allCorrectBool'] === true) {
      outputTarget.innerHTML += 
        '<div class="display-flex padding-all-1rem">' +
          '<div class="margin-right-2rem width-18rem">' + 
            '<label for="after_data_is_correct_format_line[]_' + i + '"><ul><li>問題なし</li></ul></label>' + 
          '</div>' + 
          '<div class="output-textarea">' + 
            // 幅、高さは、実際に編集する際のエディタと同じような感じにしています。
            '<textarea id="after_data_is_correct_format_line[]_' + i + '" name="after_data_is_correct_format_line[]" cols="80" rows="4" onkeydown="possibleInputTabKey(event, this);">' + 
              deepCopiedArgArray[i]['baseLineString'] + 
            '</textarea>' +
          '</div>' +
        '</div>';
    } else {

      // エラーメッセージを作成します。
      const errorMessages = (function(argObject) {
        let temporaryStrings = '';

        const resultMessageArray = makeMessageByAfterDataCorrectFormat(deepCopiedArgArray[i]);
        for (let me = 0; me < resultMessageArray.length; me ++) {
          temporaryStrings += '<li>' + resultMessageArray[me] + '</li>';
        }
        return temporaryStrings;
      }(deepCopiedArgArray[i])); // end of const errorMessages

      outputTarget.innerHTML += 
        '<div class="display-flex padding-all-1rem">' +
          '<div class="margin-right-2rem width-18rem">' + 
            '<label for="after_data_is_correct_format_line[]_' + i + '"><span class="span-alert"><ul">' + errorMessages + '</span></label>' + 
          '</div>' + 
          '<div class="output-textarea">' + 
            // 幅、高さは、実際に編集する際のエディタと同じような感じにしています。
            '<textarea id="after_data_is_correct_format_line[]_' + i + '" name="after_data_is_correct_format_line[]" cols="80" rows="4" onkeydown="possibleInputTabKey(event, this);">' + 
              deepCopiedArgArray[i]['baseLineString'] + 
            '</textarea>' +
          '</div>' +
        '</div>';
    }
  }

  return;
}