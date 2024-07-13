const tw = async () => {
  return new Promise((res, rej) => {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = "https://platform.twitter.com/widgets.js";
    script.onload = () => {
      res('ok');
    };
    script.onerror = () => {
      throw new Error("加載失敗");

    };
    document.documentElement.appendChild(script);
  });
};

export default tw;