import { ref } from "vue";
import { updatePopupMask } from "../popupMask";
import { throttle } from "@/utils/throttle";

export const top = () => {
  const theme = ref((localStorage.getItem("theme") || "light"));
  const updateShowNav = () => {
    updatePopupMask("#hander", {
      classNames: ["show-nav"],
      mask: false,
      zIndexTransition: false
    });
  };
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    setTheme(theme.value);
  };
  const setTheme = throttle((value: string) => {
    const html = document.querySelector('html')!;
    html.setAttribute('data-theme', theme.value);
    document.body.classList.add("theme");
    localStorage.setItem("theme", theme.value);
    setTimeout(() => {
      document.body.classList.remove("theme");
    }, 300);
  }, 350);

  setTheme(theme.value);

  return { updateShowNav, toggleTheme, theme };
};

export default top;