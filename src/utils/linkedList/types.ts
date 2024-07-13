export type DCLLNode<T> = {
  data: T;
  next: DCLLNode<T>;
  prev: DCLLNode<T>;
};

export type LinkedList<T> = {
  data: T;
  next: LinkedList<T>;
};