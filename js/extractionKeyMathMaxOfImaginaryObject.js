function extractionKeyMathMaxOfImaginaryObject(argObject) {

  // 引数argObjectのディープコピーを定義します。
  const deepCopiedArgObject = JSON.parse(JSON.stringify(argObject));
  
  // ディープコピーした引数の中の「最大の数値」、「キー名」、「キー名の数」を格納したオブジェクトを即時関数で定義します。
  const extractionKeyAndValue = (function(deepCopiedArgObject) {

    // 各値を格納する空オブジェクトを定義します。
    const temporaryObject = {
      'key': '',
      'keyQuantity': '',
      'maxValue': '',
    }; // end of const temporaryObject

    // ディープコピーしておいた引数をスプレッド構文で展開し、「最大の値」を定数に代入します。
    const maxValue = Math.max(...Object.values(deepCopiedArgObject));


    // 最大の値を持つ「キー名」を格納した配列を即時関数で定義します。
    const maxValueKeyArray = (function(deepCopiedArgObject, maxValue) {

      // 「キー名」を格納する空配列を定義しておきます。
      const temporaryArray = [];

      // ディープコピーしておいた引数の要素を1つずつ検証し、「最大の値」と同じ値を持つ「キー名」を空配列に格納していきます。
      Object.keys(deepCopiedArgObject).forEach((key) => {
        if (deepCopiedArgObject[key] === maxValue) {
          temporaryArray.push(key);
        }
      }); // end of Object.keys(deepCopiedArgObject).forEach((key) =>

      // 「キー名」を格納した配列をreturnし、定数maxValueKeyArrayの定義を終えます。
      return temporaryArray;
    }(deepCopiedArgObject, maxValue)); // end of const maxValueKeyArray


    // 空オブジェクトの['key']に値を格納します。
    // 「最大の値」を持つ「キー名」が複数存在することも考慮し、配列要素数で条件分岐します。
    if (maxValueKeyArray.length === 1) {
      // 「キー名」を持つ配列要素数が「1」だったため、その値をインデックス「0」で取得し格納します。
      temporaryObject['key'] = maxValueKeyArray[0];

    } else if (maxValueKeyArray.length >= 2){
      // 「キー名」を持つ配列要素数が「2」以上だったため、両方を意味する「'both'」を格納します。
      temporaryObject['key'] = 'both';
    } else {

      // 想定外の分岐に到達してしまったため、コンソールにエラーを出力します。
      console.error('想定外の分岐に到達しています。調査願います。');
    }

    // 「最大の値」を持つ「キー名の数」を空オブジェクトに格納します。
    // 「キー名の数」は配列要素数と等しいため、length数を「キー名の数」とします。
    temporaryObject['keyQuantity'] = maxValueKeyArray.length;

    // 「最大の値」を空オブジェクトに格納します。
    temporaryObject['maxValue'] = maxValue;


    // 空オブジェクトをreturnし、定数extractionKeyAndValueの定義を終えます。
    return temporaryObject;
  }(deepCopiedArgObject)); // end of const extractionKeyAndValue
  

  // extractionKeyAndValueをreturnし、処理を終えます。
  return extractionKeyAndValue;
}