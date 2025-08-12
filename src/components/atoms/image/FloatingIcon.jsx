import { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import Icon from '@atoms/image/Icon'

const FloatingIcon = ({icon, style, width = 200, height = 200, toValue=-20, duration=1000}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (!isMounted) return;
    
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: toValue,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    );
    
    loop.start();
    
    return () => {
      setIsMounted(false);
      loop.stop();
      floatAnim.stopAnimation();
    };
  }, [floatAnim, isMounted]);

  // 안전장치: icon이 없으면 렌더링하지 않음
  if (!icon || !isMounted) {
    return (
      <View style={[{alignItems:'center', height: 200, justifyContent: 'center'}]}>
        {/* 빈 공간 유지 */}
      </View>
    );
  }

  return (
    <Animated.View style={[{ transform: [{ translateY: floatAnim }], alignItems:'center' }]}>
      <Icon icon={icon} size={{width, height}} style={[{marginTop: 50}, style]} />
    </Animated.View>
  );
};
export default FloatingIcon;