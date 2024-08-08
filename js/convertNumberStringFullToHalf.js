function convertNumberStringFullToHalf(argString) {

  // 引数を文字列型の半角数字にします。
  // 大まかな手順は下記のとおりです。
  // ・replaceメソッドにコールバック関数を渡して処理します。
  // ・コールバック関数関数に渡す引数は正規表現「/[０-９]g/」で抽出します。
  // ・コールバック関数にはあらかじめ「{'０': 0, ～ '９': 9, }」まで格納した変換オブジェクトを用意しておきます。
  // ・変換オブジェクトをObject.keys().forEach～で回し、キーと引数が一致したら該当する値（数値型の数値）を引数に再代入します。
  // ・再代入された引数をreturnします。
  // ・上記戻り値がreplaceメソッドの戻り値となり、結果的に文字列型の半角数字に変換されたものを得ます。
  // 変換する際に文字列型の半角数字ではなく、数値型の数値にすれば一気に数値型の数値を得ることができますが、ここではあくまで文字列型の半角数字を得ることに注力することにしました。
  const halfCharacterNumberString = argString.replace(/[０-９]/g, function(match) {

    // 変換用のオブジェクトを定義しておきます。
    const FullToHalfFormatObject = {
      '０': '0',
      '１': '1',
      '２': '2',
      '３': '3',
      '４': '4',
      '５': '5',
      '６': '6',
      '７': '7',
      '８': '8',
      '９': '9',
    };

    Object.keys(FullToHalfFormatObject).forEach((key) => {
      if (match === key) {
        match = FullToHalfFormatObject[key];
      } else {
        // 何もせず次の処理へ。
      }
    });

    return match;

  }); // end of const halfCharacterNumberString

  return halfCharacterNumberString;
  
}