export function checkSort(sortFn) {
  const arr = [49, 38, 65, 97, 76, 13, 27, 49, 10, 7, 99, 88];
  const sortedArr = [7, 10, 13, 27, 38, 49, 49, 65, 76, 88, 97, 99];
  let sortedArr2Str = JSON.stringify(sortedArr);
  let sortFnName = sortFn.name;

  console.time(`${sortFnName}耗时`);
  let result = sortFn(arr);
  console.timeEnd(`${sortFnName}耗时`);

  if (sortedArr2Str === JSON.stringify(result)) {
    console.log(`${sortFnName}校验通过~`);
  }
}
