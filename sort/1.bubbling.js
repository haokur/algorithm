/**冒泡排序 */

import { checkSort } from './check.js';

/**
 * 核心:
 * 从左到右,两两比较,大小互换,一轮下来,确定一位数,冒一个最大值出来,为一次遍历
 * 那么n个数,就要n次遍历
 * 其总次数为 n*n-1
 */
function bubblingSort(arr) {
  for (var j = 0; j < arr.length; j++) {
    for (var i = 0; i < arr.length - j; i++) {
      if (arr[i] > arr[i + 1]) {
        let _temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = _temp;
      }
    }
  }
  return arr;
}

checkSort(bubblingSort);
