function convertSecondsToTimeObject(argNumber) {
  
  const timeObject = (function(argNumber) {

    const temporaryObject = {
      'hours': '0',
      'minutes': '0',
      'seconds': '0',
    }; // end of const temporaryObject

    // プラス1秒します。
    const addedOneSecondsNumber = argNumber + 1;

    // プラス1秒した合計の秒数を60で割り、余りの秒数を取得します。これがプラス1秒した後の秒数の値になります。
    const extractionSecondsNumber = addedOneSecondsNumber % 60;
    // 取得した余りの秒数をオブジェクトに格納します。
    temporaryObject['seconds'] = extractionSecondsNumber;

    // プラス1秒した合計の秒数を60で割り、合計の分数を取得します。
    // 純粋に「分数」だけ取得するため、小数点以下は切り捨てます。
    const totalMinutesNumber = Math.floor(addedOneSecondsNumber / 60);
    // 取得した合計の分数を60で割り、余りの分数を取得します。これがプラス1秒した後の分数の値になります。
    const extractionMinutesNumber = totalMinutesNumber % 60;
    // 取得した余りの分数をオブジェクトに格納します。
    temporaryObject['minutes'] = extractionMinutesNumber;

    // 取得した合計の分数を60で割り、合計の時数を取得します。
    // 純粋に「時数」だけ取得するため、小数点以下は切り捨てます。
    // 時数はこれで取得が完了するため、この値がプラス1秒した後の時数の値になります。
    const extractionHoursNumber = Math.floor(totalMinutesNumber / 60);
    // 取得した時数をオブジェクトに格納します。
    temporaryObject['hours'] = extractionHoursNumber;

    // オブジェクトをreturnし、処理を終えます。
    return temporaryObject;
  }(argNumber)); // end of const timeObject

  // 即時関数で定義したオブジェクトをreturnし、処理を終えます。
  return timeObject;
}