import { ref } from "vue";

interface MessageType {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  key?: number;
};
class Message {
  readonly messageArray = ref<MessageType[]>([]);
  private timeout: number = 0;

  add(data: Unfold<MessageType>): void {
    const time = new Date().getTime();
    data['key'] = time;
    if (this.messageArray.value.length > 6) {
      this.messageArray.value.pop();
    }
    this.messageArray.value.unshift(data);
    this.remove(data.duration);
  }

  removeIndex(index: number) {
    this.remove(1000);
    this.messageArray.value.splice(index, 1);
  }

  private remove(duration: number = 2500) {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.messageArray.value.pop();
      if (this.messageArray.value.length) this.remove(1000);
    }, duration);
  }
}
const message = new Message();
export { message };