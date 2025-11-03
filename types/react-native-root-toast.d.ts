declare module 'react-native-root-toast' {
  type ToastOptions = Record<string, any>;
  interface ToastApi {
    show(message: string, options?: ToastOptions): any;
    hide(toast: any): void;
    durations: Record<string, number>;
    positions: Record<string, number>;
  }
  const Toast: ToastApi;
  export default Toast;
}


