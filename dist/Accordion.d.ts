import React, { ReactElement } from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
interface ItemInfo<ItemT> {
    item: ReactElement<ItemT>;
    index: number;
}
declare type Item<ItemT> = (info: ItemInfo<ItemT>) => ReactElement | null;
declare type animationPreset = {
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
declare const _default: React.MemoExoticComponent<({ displayedIconArrowDown, containerStyle, items, itemStyle, isOpenFirstItem, styleIconArrowDown, activeOpacity, typeAnimation, animatedContainerStyle, titleStyle, }: AccordionProps) => React.JSX.Element>;
export default _default;
