import type { DCLLNode } from '@/utils/linkedList/types';
import { DoublyCircularLinkedList } from '@/utils/linkedList';
import { onActivated, onDeactivated, onMounted, ref } from "vue";
import { unitSearch } from '@/store/unit1/unitsearch';
import router from '@/router';

const searchInput = () => {
  const inputDOM = ref<HTMLInputElement[]>([]);
  const searchText = (() => {
    const isFirstSearch = localStorage.getItem("isSearch");
    if (!isFirstSearch) {
      localStorage.setItem("isSearch", "true");
      return {
        skill: '範囲,攻撃力|防御',
        raceFeature: '|味方'
      };
    }

    const value = router.getCurrentQuery("search");
    return {
      skill: value.skill || "",
      raceFeature: value.raceFeature || ""
    };
  })();

  const toSearch = () => {
    router.replace("search", searchText);
    unitSearch.toSearch(searchText);
  };
  const key: ObjIndex<"prev" | "next"> = {
    ArrowUp: "prev",
    ArrowDown: "next"
  };
  let currentInput: DCLLNode<HTMLInputElement>;
  const toggleInput = (e: KeyboardEvent) => {
    if (!key[e.key]) return;
    currentInput = currentInput[key[e.key]];
    if (currentInput.data === document.activeElement) {
      toggleInput(e);
      return;
    };
    currentInput.data.focus();
  };
  onActivated(() => {
    document.addEventListener("keydown", toggleInput);
  });

  onDeactivated(() => {
    document.removeEventListener("keydown", toggleInput);
  });

  onMounted(() => {
    const linkList = new DoublyCircularLinkedList<HTMLInputElement>();

    inputDOM.value.forEach((p) => {
      linkList.add(p);
    });
    currentInput = linkList.get(0)!;
  });

  return { searchText, inputDOM, toSearch };
};

export default searchInput;