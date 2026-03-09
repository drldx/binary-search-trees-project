class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = buildTree(array);
  }
};

function buildTree(array, start = 0, end = array.length - 1) {
  let sortedArray = array.sort((a, b) => a - b).filter((item, index) => item !== array[index - 1]);
  return sortedArray;
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.root)

