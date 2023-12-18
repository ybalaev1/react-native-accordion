import React, { memo, useState, useEffect } from 'react';
import { Animated, FlatList, StyleSheet, LayoutAnimation, TouchableOpacity, Text, Easing } from 'react-native';

var keyExtractor = function keyExtractor(index) {
  return index;
};
var Accordion = function Accordion(_ref) {
  var displayedIconArrowDown = _ref.displayedIconArrowDown,
    containerStyle = _ref.containerStyle,
    items = _ref.items,
    itemStyle = _ref.itemStyle,
    isOpenFirstItem = _ref.isOpenFirstItem,
    styleIconArrowDown = _ref.styleIconArrowDown,
    activeOpacity = _ref.activeOpacity,
    typeAnimation = _ref.typeAnimation,
    animatedContainerStyle = _ref.animatedContainerStyle,
    titleStyle = _ref.titleStyle;
  var _useState = useState(null),
    currentIndex = _useState[0],
    setCurrentIndex = _useState[1];
  var configAnimation = function configAnimation() {
    return LayoutAnimation.configureNext(
    // @ts-ignore
    LayoutAnimation.Presets[typeAnimation]);
  };
  var iconArrow = require('./icons/arrowdown.png');
  var iconChangeValue = new Animated.Value(1);
  var spin = iconChangeValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  var iconChange = function iconChange() {
    Animated.timing(iconChangeValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  };
  var onItemPress = function onItemPress(key) {
    iconChange();
    setCurrentIndex(key === currentIndex ? null : key);
    configAnimation();
  };
  useEffect(function () {
    if (isOpenFirstItem) {
      onItemPress(0);
    }
  }, [isOpenFirstItem]);
  var renderItem = function renderItem(data) {
    var item = data.item,
      index = data.index;
    var key = keyExtractor(index);
    return React.createElement(React.Fragment, null, React.createElement(TouchableOpacity, {
      onPress: function onPress() {
        return onItemPress(key);
      },
      activeOpacity: activeOpacity,
      key: key,
      style: [itemStyle, styles.itemStyle, displayedIconArrowDown && styles.isEnableIcon]
    }, (item == null ? void 0 : item.title) && React.createElement(Text, {
      style: titleStyle
    }, item.title), displayedIconArrowDown && React.createElement(Animated.Image, {
      source: iconArrow,
      style: [key === currentIndex && {
        transform: [{
          rotate: spin
        }]
      }, styleIconArrowDown, styles.styleIconArrowDown]
    })), item.content && React.createElement(Animated.View, {
      style: (animatedContainerStyle)
    }, key === currentIndex && (item == null ? void 0 : item.content)));
  };
  return React.createElement(FlatList, {
    data: items,
    style: containerStyle && styles.container,
    renderItem: renderItem,
    keyExtractor: function keyExtractor(item) {
      return item.toString();
    }
  });
};
var styles = /*#__PURE__*/StyleSheet.create({
  container: {
    flex: 1
  },
  itemStyle: {
    paddingHorizontal: 14,
    borderTopWidth: 0.5,
    paddingVertical: 8
  },
  animatedBody: {
    padding: 8
  },
  isEnableIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  styleIconArrowDown: {
    height: 18,
    width: 18
  }
});
var Accordion$1 = /*#__PURE__*/memo(Accordion);

export default Accordion$1;
//# sourceMappingURL=react-native-accordion.esm.js.map
