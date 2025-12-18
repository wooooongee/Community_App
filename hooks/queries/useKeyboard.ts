import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

function useKeyboard() {
  const [isKeyboardVisble, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const onShow = () => {
      setIsKeyboardVisible(true);
    };

    const onHide = () => {
      setIsKeyboardVisible(false);
    };

    const showListener = Keyboard.addListener("keyboardDidShow", onShow);
    const hideListener = Keyboard.addListener("keyboardDidHide", onHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return { isKeyboardVisble };
}

export default useKeyboard;
