import type { LinkedList } from "./types";

const Node = <T>(data: T) => {
  return <LinkedList<T>>{
    data
  };
};

export class linkedList<T>{
  private head!: LinkedList<T>;
  private length = 0;
  //添加
  append(data: T) {
    const node = Node<T>(data);
    if (!this.length) this.head = node;
    else {
      const current = this.get(this.length - 1);
      if (current) current.next = node;
    }
    this.length += 1;
    return this;
  }
  //任意位置插入
  insert(data: T, position: number) {
    if (position < 0 || position >= this.length) return false;
    const node = { data, next: <any>null };
    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let provious = this.get(position - 1);
      if (provious) {
        node.next = provious.next;
        provious.next = node;
      }
    }
    this.length += 1;
    return true;
  }
  //读取
  get(position: number) {
    if (position < 0 || position >= this.length) return null;
    let index = 0;
    let current = this.head;
    while (index++ < position) {
      current = current.next;
    }
    return current;
  }
  indexOf(data: T) {
    let index = 0;
    let current = this.head;
    while (current) {
      if (current.data === data) return index;
      current = current.next;
      index++;
    }
    return -1;
  }
  update(position: number, newdata: T) {
    if (position < 0 || position >= this.length) return false;
    const current = this.get(position);
    current && (current.data = newdata);
    return true;
  }
  removeAt(position: number) {
    if (position < 0 || position >= this.length) return false;
    if (position === 0) this.head = this.head.next;
    else {
      const provious = this.get(position - 1);
      if (provious) {
        const current = provious.next;
        provious.next = current.next;
      }
    }
    this.length - 1;
    return true;
  }
  remove(data: T) {
    return this.removeAt(this.indexOf(data));
  }
  isEmpty() {
    return this.length === 0;
  }
  size() {
    return this.length;
  }
  getHead() {
    return this.head;
  }
  clear() {
    this.head = null as any;
    this.length = 0;
    return this;
  }
  //转换成字符串
  toString() {
    let value = '';
    let current = this.head;
    while (current) {
      value += current.data + ' - ';
      current = current.next;
    }
    return value;
  }
}