function makePlusOneSecondsFlagObject(argObject) {
  console.log('---makePlusOneSecondsFlagObject---');

  // お尻のタイムスタンプにプラス1秒するのは下記の要件のいずれかに当てはまるものです。
  // ・最終行　※次の行がないためプラス1秒しても影響なし
  // ・今の行のお尻から次の行の頭まで1秒以上の間隔がある
  // ・今の行の頭からお尻が2秒以下、かつ、次の行の頭からお尻が5秒以上

  // お尻のタイムスタンプにプラス1秒してはならないのは下記の要件のいずれかに当てはまるものです。
  // ・今の行のお尻から次の行の頭までの間隔が1秒に満たないもので、今の行の頭からお尻が3秒以上、かつ、次の行の頭からお尻が4秒以下のもの

  const deepCopiedArgObject = JSON.parse(JSON.stringify(argObject));
  outputConsole({ deepCopiedArgObject });

  /*
  for (let i = 0; i < deepCopiedArgObject.length; i ++) {
    console.log(deepCopiedArgObject[i]);
  }
  */

  return deepCopiedArgObject;
}