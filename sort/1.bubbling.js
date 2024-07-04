/**冒泡排序 */

import { checkSort } from './check.js';

/**
 * 空间复杂度:O(1)
 * 时间复杂度:O(n^2)
 * 稳定性:稳定
 * (稳定性指的是对于相同的元素，在排序前后它们的相对位置保持不变)
 * 
 * 核心:
 * 从左到右,两两比较,大小互换,一轮下来,确定一位数,冒一个最大值出来,为一次遍历
 * 那么n个数,就要n次遍历
 */
function bubblingSort(arr) {
  for (var j = 0; j < arr.length; j++) {
    // 这里要减arr.length - j - 1
    // 减j是因为每次j循环,都能冒一个出来,确定位置,所以后面已经正确冒出来的需要排除掉
    // 再减一是因为,再i循环里,取了arr[i+1],j=0时,会越界,j>1时,则多此一举
    for (var i = 0; i < arr.length - j - 1; i++) {
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
