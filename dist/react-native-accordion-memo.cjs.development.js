'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');

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
  var _useState = React.useState(null),
    currentIndex = _useState[0],
    setCurrentIndex = _useState[1];
  var configAnimation = function configAnimation() {
    return reactNative.LayoutAnimation.configureNext(
    // @ts-ignore
    reactNative.LayoutAnimation.Presets[typeAnimation]);
  };
  var iconArrow = require('./icons/arrowdown.png');
  var iconChangeValue = new reactNative.Animated.Value(1);
  var spin = iconChangeValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  var iconChange = function iconChange() {
    reactNative.Animated.timing(iconChangeValue, {
      toValue: 1,
      duration: 2000,
      easing: reactNative.Easing.linear,
      useNativeDriver: false
    }).start();
  };
  var onItemPress = function onItemPress(key) {
    iconChange();
    setCurrentIndex(key === currentIndex ? null : key);
    configAnimation();
  };
  React.useEffect(function () {
    if (isOpenFirstItem) {
      onItemPress(0);
    }
  }, [isOpenFirstItem]);
  var renderItem = function renderItem(data) {
    var item = data.item,
      index = data.index;
    var key = keyExtractor(index);
    return React__default.createElement(React__default.Fragment, null, React__default.createElement(reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return onItemPress(key);
      },
      activeOpacity: activeOpacity,
      key: key,
      style: [itemStyle, styles.itemStyle, displayedIconArrowDown && styles.isEnableIcon]
    }, (item == null ? void 0 : item.title) && React__default.createElement(reactNative.Text, {
      style: titleStyle
    }, item.title), displayedIconArrowDown && React__default.createElement(reactNative.Animated.Image, {
      source: iconArrow,
      style: [key === currentIndex && {
        transform: [{
          rotate: spin
        }]
      }, styleIconArrowDown, styles.styleIconArrowDown]
    })), item.content && React__default.createElement(reactNative.Animated.View, {
      style: (animatedContainerStyle)
    }, key === currentIndex && (item == null ? void 0 : item.content)));
  };
  return React__default.createElement(reactNative.FlatList, {
    data: items,
    style: containerStyle && styles.container,
    renderItem: renderItem,
    keyExtractor: function keyExtractor(item) {
      return item.toString();
    }
  });
};
var styles = /*#__PURE__*/reactNative.StyleSheet.create({
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
var Accordion$1 = /*#__PURE__*/React.memo(Accordion);

exports.default = Accordion$1;
//# sourceMappingURL=react-native-accordion-memo.cjs.development.js.map
