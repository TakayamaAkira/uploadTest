function makeAfterDataMenuObject(argArray) {
  
  const deepCopiedArray = JSON.parse(JSON.stringify(argArray));
  
  for (let i = 0; i < deepCopiedArray.length; i ++) {

    deepCopiedArray[i] = {      
      'baseLineString': deepCopiedArray[i],
      'splitBaseLineStringArray': '',
      'mainDataObject': '',
      'timeStampStringObject': '',
      'timeStampSecondsValueObject': '',
      'isCorrectFormatObject': '',
      'isCorrectSecondsObject': '',
      'allCorrectBool': false,
      // プラス1秒した際の「☆」から始まるタイムスタンプ文字列を格納するためのオブジェクト
      // プラス1秒する際、「次のインデックス行の頭」にもプラスする必要がある場合があります。
      // 加工したタイムスタンプを受け取ることができるよう、全てのインデックスに空オブジェクトを定義しておく必要があります。
      'pulsOneSecondsTimeStampObject': {
        // 「今のインデックス行」のお尻のタイムスタンプを格納するための要素です。デフォルト値は空文字「''」です。
        'justNowIndexHipTimeStamp': '',
        // 「次のインデックス行」の頭のタイムスタンプが渡された際に受け取るための要素です。デフォルト値は空文字「''」です。
        'headTimeStampByOverlap': '',
      },
    };      
  }

  return deepCopiedArray;

}