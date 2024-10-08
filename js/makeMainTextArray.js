function makeMainTextArray(arg, targetName = null) {

  // 第1引数argは想定では下記のとおり渡されます。
  // 第2引数が「'after'」の場合：文字列型の文字列
  // 第2引数が「'before'」の場合：文字列型の文字列を格納した配列

  const deepCopiedArg = JSON.parse(JSON.stringify(arg));
  let extractText = '';

  try {
    switch (targetName) {
      case 'after':
        extractText = deepCopiedArg;
        break;
  
      case 'before':
        for (let i = 0; i < deepCopiedArg['baseLineStringArray'].length; i ++) {
          extractText += deepCopiedArg['baseLineStringArray'][i];
        }
        break;
  
      default:
        throw new Error('第2引数は「after」または「before」のいずれかを文字列で渡してください。');
    }
  } catch (e) {
    alert('makeMainTextArray関数の第2引数に不備があります。\n\n' + targetName + '\n\nページ管理者に御連絡願います。');
    console.error(e);

    // これ以上処理を進めることができないためreturnして処理を終えます。
    return;

  } // end of try
    

  const periodSplitTextArray = extractText.split('。');

  for (let i = 0; i < periodSplitTextArray.length; i ++) {
    if (i !== periodSplitTextArray.length - 1) { // 最終インデックス以外の場合。
      periodSplitTextArray[i] = periodSplitTextArray[i] + '。';

    } else { // 最終インデックスの場合。
      // 何もせず次の処理へ。

      // 何もせず次の処理へ移行する理由は下記のとおりです。
      // 編集前の本文が「。」で終わっている場合、このインデックスには空文字「''」が入っています。
      // 編集前の本文が「。」以外で終わっている場合、このインデックスには何らかの文字列が入っています。
      // 将来的に「○○時○○分閉会」等で終わることも考えられます。
      // どちらにせよ、「。」を追加する必要はないため、何もせず次の処理へ移行します。
    }
  } // end of for (let i = 0; i < periodSplitTextArray.length; i ++)

  if (periodSplitTextArray[ periodSplitTextArray.length - 1 ] === '') {
    periodSplitTextArray.splice( periodSplitTextArray.length - 1, 1 );
  } else {
    // 何もせず次の処理へ。
  } // end of if (periodSplitTextArray[ periodSplitTextArray.length - 1 ] === '')
    
  return periodSplitTextArray;

}