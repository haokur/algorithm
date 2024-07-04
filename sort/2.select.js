/**选择排序 */
import { checkSort } from './check.js';

/**
 * 空间复杂度:O(1)
 * 时间复杂度:O(n^2)
 * 稳定性:不稳定
 * 
 * 核心:
 * j从0开始
 * i从j的后一位开始循环,不断的arr[i]与arr[j]比较,
 * 若小于,则互换位置,直到确定j的位置是整个数组中最小的,这样第j个位置就排序完成了
 * j++
 * 确定第二个位置(j=1)
 * 依此类推,直到最后一个位置确定,排序完成
 */
function selectSort(arr) {
  // 每一次j循环,确定一个相对最小值
  for (let j = 0; j < arr.length; j++) {
    // 这里j从j+1开始,是因为外层循环(j)每一次,都能确定一个相对最小值,是已经排好序的
    for (let i = j + 1; i < arr.length; i++) {
      // 当未排序序列的里面有小于未排序序列里第一个位置的,则替换两个的位置
      if (arr[i] < arr[j]) {
        let _temp = arr[i];
        arr[i] = arr[j];
        arr[j] = _temp;
      }
    }
  }
  return arr;
}

checkSort(selectSort);
