import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Icon from './Icon';

const FloatingIcon = ({icon, style, width = 200, height = 200, toValue=-20, duration=1000}) => {
  console.log('🎆 FloatingIcon 렌더링 시작...');
  
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('🎆 FloatingIcon 애니메이션 시작...');
    
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
      loop.stop();
    };
  }, [floatAnim]);

  return (
    <Animated.View style={[{ transform: [{ translateY: floatAnim }] }]}>
      <Icon source={icon} size={{width, height}} style={[{marginTop: 50}, style]} />
    </Animated.View>
  );
};

export default FloatingIcon;
