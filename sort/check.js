async function asyncForEach(arr, callback) {
  const length = arr.length;
  const O = Object(arr);
  let k = 0;
  while (k < length) {
    if (k in O) {
      const kValue = O[k];
      await callback(kValue, k, O);
    }
    k++;
  }
}

async function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

class SortDisplay {
  data = [];
  proxyArr = [];
  tickQueen = [];

  constructor(arr) {
    this.data = arr;
    this.proxyData();
  }

  proxyData() {
    let self = this;
    // 代理数组,实时展示数组变化
    this.proxyArr = new Proxy(this.data, {
      set(target, key, value, receiver) {
        let prevState = [...target];
        let result = Reflect.set(target, key, value, receiver);
        // console.log('设置元素:', self.data);
        self.tickQueen.push({
          type: 'set',
          index: key,
          value: target[key],
          data: [...target],
          prevState,
        });
        return result;
      },
      get(target, key, receiver) {
        if (key !== 'length') {
          // console.log('获取元素:', target[key], 'check.js::14行');
          self.tickQueen.push({
            type: 'get',
            index: key,
            value: target[key],
            data: [...target],
          });
        }
        return Reflect.get(target, key, receiver);
      },
    });
  }

  display() {
    let existEl = document.getElementById('sort-list');
    let el = existEl;
    if (!existEl) {
      el = document.createElement('ul');
    }
    let elChild = this.data
      .map(
        (item) => `<li class="sort-item">
          <div class="sort-item__block">${item}</div>
        </li>`,
      )
      .join('');
    el.className = 'sort-list';
    el.id = 'sort-list';
    el.innerHTML = elChild;
    if (!existEl) {
      document.body.appendChild(el);
    }
  }

  playTick(tick) {
    let { index, value, type, data, prevState } = tick;
    let ul = document.getElementById('sort-list');
    let elChild = '';

    if (type === 'set') {
      let diff = [];
      // 找出不同的值
      data.map((item, _i) => {
        if (prevState[_i] !== item) {
          // 找出原数组中对应的值
          let sourceIndex = null;
          if (Array.isArray(prevState)) {
            sourceIndex = prevState.indexOf(item);
          }
          diff.push({
            index: _i,
            value: item,
            sourceIndex: sourceIndex,
          });
        }
      });
      if (diff.length) {
        console.log(diff);
      }
      elChild = prevState
        .map((item, _index) => {
          let matchDiff = diff.find((_diffItem) => _diffItem.index === _index) || '';
          return `<li class="sort-item">
          <div class="${
            +index === _index ? 'sort-item__block active' : 'sort-item__block'
          }">${item}</div>
          ${matchDiff ? `<div class="diff-item">${matchDiff.value}</div>` : ''}
        </li>`;
        })
        .join('');
    } else {
      elChild = data
        .map((item, _index) => {
          return `<li class="sort-item">
          <div class="${
            +index === _index ? 'sort-item__block active' : 'sort-item__block'
          }">${item}</div>
        </li>`;
        })
        .join('');
    }

    // 找出不存在的值,则在备选区
    let selectedValues = this.data.filter((item) => !data.includes(item));
    let _html = selectedValues.map((item) => {
      return `<div class="sort-item__block">${item}</div>`;
    });
    elChild += `<li class="sort-item wait-select"> ${_html} </li>`;

    ul.innerHTML = elChild;
  }

  // 模拟过程
  async runSortAnimate() {
    let _duration = localStorage.getItem('animate_duration') || 1000;
    await asyncForEach(this.tickQueen, async (tick) => {
      this.playTick(tick);
      await wait(+_duration);
    });
    this.tickQueen = [];
    this.display();
    setTimeout(() => {
      alert('排序完成!');
    }, 0);
  }
}

export function checkSort(sortFn) {
  const arr = [49, 38, 65, 97, 76, 13, 27, 49, 10, 7, 99, 88];
  const sortedArr = [7, 10, 13, 27, 38, 49, 49, 65, 76, 88, 97, 99];

  // const arr = [10, 7, 13];
  // const sortedArr = [7, 10, 13];

  let sortedArr2Str = JSON.stringify(sortedArr);
  let sortFnName = sortFn.name;

  const sortDisplayInstance = new SortDisplay(arr);
  sortDisplayInstance.display();

  console.time(`${sortFnName}耗时`);
  let result = sortFn(sortDisplayInstance.proxyArr);
  console.timeEnd(`${sortFnName}耗时`);

  if (sortedArr2Str === JSON.stringify(result)) {
    console.log(`${sortFnName}校验通过~`);
  }

  sortDisplayInstance.runSortAnimate();
}
