import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from "react-native";
import Text from "@atoms/text/Text";
import Icon from "@atoms/image/Icon";
import { VStack } from '@ui/Stack'; // ✅ gap 대체

const Loading = ({ textType = "subtitle", ...props }) => {
  const getIconSource = (idx) => {
    switch (idx) {
      case 0: return require('@assets/img/loadingAnimation/loading0.png');
      case 1: return require('@assets/img/loadingAnimation/loading1.png');
      case 2: return require('@assets/img/loadingAnimation/loading2.png');
      case 3: return require('@assets/img/loadingAnimation/loading3.png');
      case 4: return require('@assets/img/loadingAnimation/loading4.png');
      case 5: return require('@assets/img/loadingAnimation/loading5.png');
    }
  };

  const [icon, setIcon] = useState(getIconSource(0));
  const [iconIdx, setIconIdx] = useState(0);
  const intervalRef = useRef(null);

  const loadingStart = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIconIdx((prev) => (prev >= 5 ? 0 : prev + 1));
    }, 200);
  };

  useEffect(() => {
    setIcon(getIconSource(iconIdx));
  }, [iconIdx]);

  useEffect(() => {
    loadingStart();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
      <View style={[StyleSheet.absoluteFillObject, styles.container, props.style]}>
        {/* ✅ gap: '5%' → VStack gap="5%" */}
        <VStack gap="5%" align="center" justify="center">
          <Icon icon={icon} style={[styles.icon, props.iconStyle]} />
          <Text style={styles.text} type={textType}>  Loading...</Text>
        </VStack>
      </View>
  );
};
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center', // (선택) 세로/가로 정중앙을 정확히 원하면 alignItems:'center'로 바꿔도 됨
    zIndex: 10,
    backgroundColor: '#FFFEEB',
    // gap: '5%', // ❌ VStack이 처리
  },
  icon: {
    width: '60%',
    height: 'auto',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    color: '#91B7AB',
  },
});
