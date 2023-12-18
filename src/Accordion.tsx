import React, {useEffect, useState, memo, ReactElement} from 'react';
import {
  Text,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ImageStyle,
  TextStyle,
  ViewStyle
} from 'react-native';
// import {AccordionProps} from './types';

interface ItemInfo<ItemT> {
  item: ReactElement<ItemT>;
  index: number;
}

type Item<ItemT> = (info: ItemInfo<ItemT>) => ReactElement | null;
type animationPreset = {
  SPRING: 'spring';
  EASEINEASEOUT: 'easeInEaseOut';
  LINEAR: 'linear';
};

/**
 * @param displayedIconArrowDown Show to display icons arrowDown, default false. Not obligatory
 * @param containerStyle General style for display, not obligatory
 * @param items Array of elements to display
 * @param itemStyle Style for an array element, not obligatory
 * @param titleStyle Style for an title array element, not obligatory
 * @param isOpenFirstItem Boolean value is opening first item, default true. Not obligatory
 * @param styleIconArrowDown Style for icon, not obligatory
 * @param activeOpacity Click opacity, default 0.7. Not obligatory
 * @param typeAnimation Animation type for open item, default easeInEaseOut. Not obligatory
 * @param animatedContainerStyle style for animation container. Not obligatory
 * @param titleStyle style for item title. Not obligatory
 */

interface AccordionProps {
  containerStyle?: ViewStyle;
  isOpenFirstItem?: boolean;
  items: Array<Item<ReactElement>>;
  itemStyle?: ViewStyle;
  displayedIconArrowDown?: boolean;
  styleIconArrowDown?: ImageStyle;
  activeOpacity?: number;
  typeAnimation?: string | animationPreset;
  animatedContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const keyExtractor = (index: number) => index;

const Accordion = ({
  displayedIconArrowDown,
  containerStyle,
  items,
  itemStyle,
  isOpenFirstItem,
  styleIconArrowDown,
  activeOpacity,
  typeAnimation,
  animatedContainerStyle,
  titleStyle,
}: AccordionProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const configAnimation = () => {
    return LayoutAnimation.configureNext(
      // @ts-ignore
      LayoutAnimation.Presets[typeAnimation],
    );
  };
  const iconArrow = require('./icons/arrowdown.png');
  const iconChangeValue = new Animated.Value(1);

  const spin = iconChangeValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const iconChange = () => {
    Animated.timing(iconChangeValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  const onItemPress = (key: number) => {
    iconChange();
    setCurrentIndex(key === currentIndex ? null : key);
    configAnimation();
  };

  useEffect(() => {
    if (isOpenFirstItem) {
      onItemPress(0);
    }
  }, [isOpenFirstItem]);

  const renderItem = (data: any) => {
    const {item, index} = data;
    const key = keyExtractor(index);
    return (
      <>
        <TouchableOpacity
          onPress={() => onItemPress(key)}
          activeOpacity={activeOpacity}
          key={key}
          style={[
            itemStyle,
            styles.itemStyle,
            displayedIconArrowDown && styles.isEnableIcon,
          ]}>
          {item?.title && (
            <Text style={titleStyle}>{item.title}</Text>
          )}
          {displayedIconArrowDown && (
            <Animated.Image
              source={iconArrow}
              style={[
                key === currentIndex && {transform: [{rotate: spin}]},
                styleIconArrowDown,
                styles.styleIconArrowDown,
              ]}
            />
          )}
        </TouchableOpacity>
        {item.content && (
          <Animated.View style={(styles.animatedBody, animatedContainerStyle)}>
            {key === currentIndex && item?.content}
          </Animated.View>
        )}
      </>
    );
  };
  return (
    <FlatList
      data={items}
      style={containerStyle && styles.container}
      renderItem={renderItem}
      keyExtractor={item => item.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    paddingHorizontal: 14,
    borderTopWidth: 0.5,
    paddingVertical: 8,
  },
  animatedBody: {
    padding: 8,
  },
  isEnableIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  styleIconArrowDown: {
    height: 18,
    width: 18,
  },
});
export default memo(Accordion);
