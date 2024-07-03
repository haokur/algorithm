/**快速排序 */

import { checkSort } from './check.js';

/**
 * 将一个数组从low到high的位置
 * 按第一个元素拆分,
 * 左边为小于这个元素的数组
 * 右边为大于这个元素的数组
 *  */
function partial(arr, low, high) {
  // 取第一个数(优化的版本可以取之间的随机数,
  // 避免极端情况如每次第一个元素就是最小或最大的数,没有把数组均匀拆开)
  let current = arr[low];

  // high指针先往右,当指向的值小于current时,low位置赋值high指向的值,low指针位置被占,low指针往右移动一步
  // low指针往右移时,当指向的值大于current时,high位置赋值low指向的值,high指针位置被占,high开始往左移
  // 当low指针和high指针指向同一个位置时,停止指针移动,指针的位置赋值为current的值

  // 因为指针移动的过程,都是在条件不成立时,一直执行移动,所以可以用while条件语句
  // 因为在low和high不相同时,这个要一直进行移动过程和赋值过程,所以也可以用while条件语句

  // 停止指针移动while语句,当high大于low的位置时,就不要停
  while (high > low) {
    // 右指针判断和移动,当high指向的值大于等于current时,只做high指针的移动
    /**
     * 这里要添加high > low条件一起判断,是因为虽然外层while有判断high > low
     * 但是这里每次high--,不加控制则可能出现high<low的情况,会影响到后面的赋值操作
     * 因为每次while每次条件满足,是需要while内部所有代表执行完毕才能跳出,
     * 而不是这里high--后外层while就立马判断是否high > low跳出while循环了
     * 所以只能内层的while添加一条限制,保证内部high是永远大于等于low的
     */
    while (high > low && arr[high] >= current) high--;
    // 当high指向的值小于current时,将low指向的地方赋值arr[high]
    // (因为current已经存储了arr[low]的值了,所以arr[low]的位置可以看做一个空位置,等待比current的值来填充)
    arr[low] = arr[high]; // 可以理解为low位置有值了,high位置的值可以清空,等下一个比current值大的值来填充了

    // 开始左指针的移动,若左指针指向的值小于等于current的值,只做low指针的移动
    // 这里加high > low,也是避免出现low>high的情况
    while (high > low && arr[low] <= current) low++;
    // 当low指向的值大于current,那要把这个值指向上面空出来的arr[high]
    arr[high] = arr[low];
  }

  // 当跳出while (high > low)循环,则代表此时high===low了,就将当前位置填充current的值
  arr[low] = current; // 或arr[high] = current

  return low; // 返回相遇的位置,作为下一次拆分为两个数组的分界点
}

function quickSort(arr, low, high) {
  low ??= 0;
  high ??= arr.length - 1; // 这里注意为arr.length - 1,代表数组最后一个元素位置的指针

  // 当high<=low,即只有一个元素时,跳出递归
  if (high > low) {
    // 将数组的从low到high拆开两个部分
    let partialIndex = partial(arr, low, high);
    // 然后再将拆好的两部分,再把每部分按当前数组处理的方式,再拆
    quickSort(arr, low, partialIndex - 1); // 左半边数组
    quickSort(arr, partialIndex + 1, high); // 右半边数组
  }
  return arr;
}

checkSort(quickSort);

