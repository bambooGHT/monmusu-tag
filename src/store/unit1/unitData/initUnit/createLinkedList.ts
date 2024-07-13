import { DoublyCircularLinkedList } from "@/utils/linkedList";

const createLinkedList = (min: number, max: number) => {
  const link = new DoublyCircularLinkedList<number>();
  for (let i = min; i <= max; i++) {
    link.add(i);
  }
  return link;
};

export default createLinkedList;