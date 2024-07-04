/**插入排序 */

import { checkSort } from './check.js'

/**
 * 第一个元素只有一个值，则是已经排好序的
 * 从第二个元素开始
 * 第二个元素和第一个比较，大小按从大小排序，如果不符合大小排序，互换位置
 * 第三个元素，与第二个元素比较，小于第二个元素，则第二个元素往后移
 * 直到找到一个不大于第三个元素的位置，在该位置后面赋值
 */
function insertSort(arr) {
    // 只有第一位时，第一位自有序，跳过
    for (let i = 1; i < arr.length; i++) {

        // 取出i位置上的值，因为在对有序的序列比较时，如果i值不是最大的值，则前面的值需要往后移
        let current = arr[i]

        // 与当前值（i）前面的（i-1,i-2...)比较
        // 如果current小于前面的值，则前面的值往后移动一位
        // 直到找到小于等于current的位置后面一个位置，停下来将current填进去
        let j;
        for (j = i - 1; j > -1 && current < arr[j]; j--) {
            // 因为i的位置的值已经用current缓存，i前面的值都可以放心往后移一位
            arr[j + 1] = arr[j]
        }

        // 跳出循环的后一位，赋值current
        arr[j + 1] = current
    }

    return arr
}


checkSort(insertSort)
