function outputConsole(argObject = null) {

  try {
    if (typeof argObject !== 'object' || Array.isArray(argObject) === true || argObject === null) {
      throw new Error('outputConsole関数の引数はオブジェクト（配列とnullは除く）で渡してください');
    } else {
      Object.keys(argObject).forEach((key) => {
        console.log('---' + key + '---');
        console.log(argObject[key]);
      });
    }
  } catch(e) {
    console.warn(e);
    return;
  }
  return;
}