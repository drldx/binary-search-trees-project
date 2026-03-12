class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = array.sort((a, b) => a - b).filter((item, index) => item !== array[index - 1]);
    this.root = buildTree(this.array);
  }

  includes(value, root = this.root) {
    if (root === null) return false;
    if (root.data === value) return true;

    if (value < root.data) {
      return this.includes(value, root.left);
    } else {
      return this.includes(value, root.right);
    }
  }

  insert(value, root = this.root) {
    if (this.includes(value)) return;

    if (root === null) return new Node(value);

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

};

function buildTree(array, start = 0, end = array.length - 1) {

  if (start > end) return null;
  let mid = Math.floor((start + end) / 2);

  let root = new Node(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}

//prettyPrint function for visualising;
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
console.log(tree.includes(9));
tree.insert(2);
prettyPrint(tree.root);

