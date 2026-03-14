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

    if (root === null) return new Node(value);

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    } else {
      return root;
    }
    return root;
  }


  delete(value, root = this.root) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      //value match with root.data here;
      //Node with 0 or 1 child;
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      //Node with 2 children;
      const succ = getScucessor(root);
      root.data = succ.data;
      root.right = this.delete(succ.data, root.right);
    }
    return root;
  }

  levelOrderForEach(callback, root = this.root) {
    if (!callback) throw new Error('Callback is required.');
    if (root === null) return;

    let que = [];
    que.push(root);
    while (que.length !== 0) {
      let curr = que.shift();

      callback(curr.data);
      // console.log(curr.data);

      if (curr.left !== null) que.push(curr.left);
      if (curr.right !== null) que.push(curr.right);
    }
  }

  inOrderForEach(callback, root = this.root) {
    if (!callback) throw new Error('Callback required');
    if (root === null) return;

    this.inOrderForEach(callback, root.left);
    callback(root.data);
    this.inOrderForEach(callback, root.right);
  }

  preOrderForEach(callback, root = this.root) {
    if (!callback) throw new Error('Callback required');
    if (root === null) return;

    callback(root.data);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root = this.root) {
    if (!callback) throw new Error('Callback required');
    if (root === null) return;

    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root.data);
  }

  getRoot(val, root = this.root) {
    if (root === null) return;
    if (root.data === val) return root;

    if (val < root.data) {
      return this.getRoot(val, root.left);
    } else {
      return this.getRoot(val, root.right);
    }
  }

  height(value, root = this.getRoot(value)) {
    if (root === null) return 0;
    if (root === undefined) return;

    let left = this.height(value, root.left);
    let right = this.height(value, root.right);

    return Math.max(left, right) + 1;
  }

  depth(value, root = this.root, count = -1) {
    if (!this.includes(value)) return;
    if (root === null) return count;

    count += 1;

    if (value < root.data) {
      return this.depth(value, root.left, count);
    } else if (value > root.data) {
      return this.depth(value, root.right, count);
    } else {
      return count;
    }
  }

};


function getScucessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

function buildTree(array, start = 0, end = array.length - 1) {

  if (start > end) return null;
  let mid = Math.floor((start + end) / 2);

  let root = new Node(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.includes(9));
tree.insert(356);
console.log(tree.height(0));
// tree.inOrderForEach(item => console.log(item));
prettyPrint(tree.root);

