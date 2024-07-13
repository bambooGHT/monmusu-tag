export type SortId = "rarityId" | "id";

class ListSort {
  static sort(field: SortId, list: ObjIndex[], reverse: boolean) {
    if (reverse) {
      list.sort((a, b) => b[field] - a[field]);
    } else {
      list.sort((a, b) => a[field] - b[field]);
    }
  }

  static reverse(list: ObjIndex[]) {
    for (let i = 0, j = list.length - 1; i < j; i++, j--) {
      [list[i], list[j]] = [list[j], list[i]];
    }
  }
}

export default ListSort;