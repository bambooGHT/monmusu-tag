import type { DCLLNode } from "./types";

const Node = <T>(data: T) => {
  return <DCLLNode<T>>{
    data
  };
};
export class DoublyCircularLinkedList<T> {
  /** 頭 */
  #head!: DCLLNode<T>;
  /** 尾 */
  #tail!: DCLLNode<T>;
  /** 數量 */
  #length = 0;

  add(data: T) {
    const node = Node<T>(data);
    if (!this.#length) {
      this.#head = node;
      this.#tail = node;
      node.prev = node;
      node.next = node;
    }
    else {
      this.#tail.next = node;
      this.#head.prev = node;
      node.prev = this.#tail;
      node.next = this.#head;
      this.#tail = node;
    }
    this.#length += 1;
    return this;
  }
  /** 指定位置添加 */
  insert(data: T, num: number) {
    if (num < 0) throw new Error("num cannot be negative");
    if (num >= this.#length) this.add(data);
    else {
      const node = Node<T>(data);
      if (num === 0) {
        if (!this.#length) {
          this.#head = node;
          this.#tail = node;
          node.prev = node;
          node.next = node;
        } else {
          node.next = this.#head;
          node.prev = this.#tail;
          this.#head.prev = node;
          this.#head = node;
        }
      } else {
        const current: any = this.get(num);
        const previous = current.prev;
        node.next = current;
        node.prev = previous;
        previous.next = node;
        current.prev = node;
      }
      this.#length += 1;
    }
    return this;
  }
  remove(data: T) {
    const num = this.indexOf(data);
    if (!num) return null;
    return this.removeAt(num);
  }
  /** 指定位置刪除 */
  removeAt(num: number) {
    if (num < 0 || num >= this.#length) return null;
    let node;
    if (num === 0) {
      node = this.#head;
      if (this.#length === 1) {
        this.clear();
        return node;
      };
      this.#head = node.next;
      this.#head.prev = this.#tail;
    }
    else if (num === this.#length - 1) {
      node = this.#tail;
      this.#tail = this.#tail.prev;
      this.#tail.next = this.#head.prev;
    } else {
      node = this.get(num)!;
      const previous = node.prev;
      previous.next = node.next;
      node.next.prev = previous;
    }
    this.#length -= 1;
    return node;
  }

  get(num: number) {
    if (num < 0 || num >= this.#length) return null;
    const len = ~~(this.#length / 2);
    let currentNode = num >= len ? this.#tail : this.#head;
    const number = num >= len ? this.#length - 1 - num : num;
    const ts: "prev" | "next" = num >= len ? "prev" : "next";
    let index = 0;
    while (index++ < number) {
      currentNode = currentNode[ts];
    }
    return currentNode;
  }

  indexOf(data: T) {
    if (!this.#length) return -1;
    let index = 0;
    let currentNode = this.#head;
    while (index < this.#length) {
      if (currentNode.data === data) return index;
      currentNode = currentNode.next;
      index += 1;
    }
    return -1;
  }

  clear() {
    this.#head = null as any;
    this.#tail = null as any;
    this.#length = 0;
  }
  /** 总数 */
  size() {
    return this.#length;
  }

  getHead() {
    return this.#head?.data;
  }
  
  getTail() {
    return this.#tail?.data;
  }

  toString() {
    let node = this.#head;
    let value = '';
    let index = 0;
    while (index++ < this.#length) {
      value += node.data + "-";
      node = node.next;
    }
    return value.slice(0, -1);
  }

  *[Symbol.iterator]() {
    const head = this.#head;
    let current = head;
    do {
      yield current;
      current = current.next;
    } while (current !== head);
  }
}