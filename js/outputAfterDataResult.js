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
  outputConsole({ deepCopiedArgArray });

  const outputTarget = document.getElementById(outputTargetString);

  // 結果出力欄を初期化（空文字）します。初期化しないとこの関数を呼び出すたびに結果出力欄が加算されてしまいます。
  outputTarget.innerHTML = '';

  
  for (let i = 0; i < deepCopiedArgArray.length; i ++) {
    if (deepCopiedArgArray[i]['allCorrectBool'] === true) {
      outputTarget.innerHTML += 
        '<div class="display-flex padding-all-1rem">' +
          '<div class="margin-right-2rem">' + 
            '<label for="after_data_is_correct_format_line[]_' + i + '"><span>問題なし</span></label>' + 
          '</div>' + 
          '<div class="output-textarea">' + 
            // 幅、高さは、実際に編集する際のエディタと同じような感じにしています。
            '<textarea id="after_data_is_correct_format_line[]_' + i + '" name="after_data_is_correct_format_line[]" cols="80" rows="4" onkeydown="possibleInputTabKey(event, this);">' + 
              deepCopiedArgArray[i]['baseLineString'] + 
            '</textarea>' +
          '</div>' +
        '</div>';
    } else {
      outputTarget.innerHTML += 
        '<div class="display-flex padding-all-1rem">' +
          '<div class="margin-right-2rem">' + 
            // ここの出力要素は関数で作成予定です。
            // deepCopiedArgArrayを関数に渡し、エラー項目を抽出、エラー箇所に応じて出力要素を格納したオブジェクトを作成し、returnすればよさそう。
            '<label for="after_data_is_correct_format_line[]_' + i + '"><span class="span-alert">問題あり</span></label>' + 
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