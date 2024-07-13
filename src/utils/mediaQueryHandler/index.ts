type Callback = (e: MediaQueryList) => void;

export default class MediaQueryHandler  {
  matchMedia: MediaQueryList;
  callback!: Callback;
  constructor(query: string, callback: Callback) {
    const match = matchMedia(query);
    callback(match);
    match.addEventListener("change", callback as any);
    this.matchMedia = match;
    this.callback = callback;
  }
  remove() {
    this.matchMedia.removeEventListener("change", this.callback as any);
  }
}