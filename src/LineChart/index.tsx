import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import {
  View,
  ScrollView,
  Animated,
  Easing,
  Text,
  ColorValue,
} from 'react-native';
import {styles} from './styles';
import Svg, {
  Path,
  LinearGradient,
  Stop,
  Circle,
  Rect,
  Text as CanvasText,
} from 'react-native-svg';
import {svgPath, bezierCommand} from '../utils';
import Rule from '../Components/lineSvg';

let initialData = null;
let animations = [];

type propTypes = {
  height?: number;
  noOfSections?: number;
  maxValue?: number;
  minValue?: number;
  stepHeight?: number;
  stepValue?: number;
  spacing?: number;
  initialSpacing?: number;
  data?: Array<itemType>;
  data2?: Array<itemType>;
  data3?: Array<itemType>;
  data4?: Array<itemType>;
  data5?: Array<itemType>;
  thickness?: number;
  thickness1?: number;
  thickness2?: number;
  thickness3?: number;
  thickness4?: number;
  thickness5?: number;
  rotateLabel?: Boolean;
  isAnimated?: Boolean;
  animateOnDataChange?: Boolean;
  animationDuration?: number;
  onDataChangeAnimationDuration?: number;
  animationEasing?: any;
  animateTogether?: boolean;
  xAxisThickness?: number;
  xAxisColor?: ColorValue;
  hideRules?: Boolean;
  rulesColor?: ColorValue;
  rulesThickness?: number;
  pressEnabled?: Boolean;
  showDataPointOnPress?: Boolean;
  showStripOnPress?: Boolean;
  showTextOnPress?: Boolean;
  stripHeight?: number;
  stripWidth?: number;
  stripColor?: ColorValue | String | any;
  stripOpacity?: number;
  onPress?: Function;
  unFocusOnPressOut?: Boolean;
  delayBeforeUnFocus?: number;

  rulesType?: String;
  dashWidth?: number;
  dashGap?: number;
  showReferenceLine1?: Boolean;
  referenceLine1Config?: referenceConfigType;
  referenceLine1Position?: number;
  showReferenceLine2?: Boolean;
  referenceLine2Config?: referenceConfigType;
  referenceLine2Position?: number;
  showReferenceLine3?: Boolean;
  referenceLine3Config?: referenceConfigType;
  referenceLine3Position?: number;
  showReferenceLine4?: Boolean;
  referenceLine4Config?: referenceConfigType;
  referenceLine4Position?: number;
  showReferenceLine5?: Boolean;
  referenceLine5Config?: referenceConfigType;
  referenceLine5Position?: number;

  showVerticalLines?: Boolean;
  verticalLinesUptoDataPoint?: Boolean;
  verticalLinesThickness?: number;
  verticalLinesColor?: ColorValue;
  verticalLinesZIndex?: number;
  hideAxesAndRules?: Boolean;
  areaChart?: Boolean;

  disableScroll?: Boolean;
  showScrollIndicator?: Boolean;

  //Indices

  showYAxisIndices?: Boolean;
  showXAxisIndices?: Boolean;
  yAxisIndicesHeight?: number;
  xAxisIndicesHeight?: number;
  yAxisIndicesWidth?: number;
  xAxisIndicesWidth?: number;
  xAxisIndicesColor?: ColorValue;
  yAxisIndicesColor?: ColorValue;
  yAxisSide?: string;

  startIndex?: number;
  startIndex1?: number;
  startIndex2?: number;
  startIndex3?: number;
  startIndex4?: number;
  startIndex5?: number;
  endIndex?: number;
  endIndex1?: number;
  endIndex2?: number;
  endIndex3?: number;
  endIndex4?: number;
  endIndex5?: number;

  color?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
  yAxisThickness?: number;
  yAxisColor?: ColorValue;
  yAxisTextStyle?: any;
  showFractionalValues?: Boolean;
  roundToDigits?: number;
  yAxisLabelWidth?: number;
  hideYAxisText?: Boolean;

  backgroundColor?: ColorValue;
  curved?: Boolean;
  horizSections?: Array<sectionType>;

  //Data points

  hideDataPoints?: Boolean;
  dataPointsHeight?: number;
  dataPointsWidth?: number;
  dataPointsRadius?: number;
  dataPointsColor?: string;
  dataPointsShape?: string;
  hideDataPoints1?: Boolean;
  dataPointsHeight1?: number;
  dataPointsWidth1?: number;
  dataPointsRadius1?: number;
  dataPointsColor1?: string;
  dataPointsShape1?: string;
  hideDataPoints2?: Boolean;
  dataPointsHeight2?: number;
  dataPointsWidth2?: number;
  dataPointsRadius2?: number;
  dataPointsColor2?: string;
  dataPointsShape2?: string;
  hideDataPoints3?: Boolean;
  dataPointsHeight3?: number;
  dataPointsWidth3?: number;
  dataPointsRadius3?: number;
  dataPointsColor3?: string;
  dataPointsShape3?: string;
  hideDataPoints4?: Boolean;
  dataPointsHeight4?: number;
  dataPointsWidth4?: number;
  dataPointsRadius4?: number;
  dataPointsColor4?: string;
  dataPointsShape4?: string;
  hideDataPoints5?: Boolean;
  dataPointsHeight5?: number;
  dataPointsWidth5?: number;
  dataPointsRadius5?: number;
  dataPointsColor5?: string;
  dataPointsShape5?: string;
  customDataPoint?: Function;

  focusedDataPointShape?: String;
  focusedDataPointWidth?: number;
  focusedDataPointHeight?: number;
  focusedDataPointColor?: ColorValue | String | any;
  focusedDataPointRadius?: number;
  focusedCustomDataPoint?: Function;
  dataPointLabelWidth?: number;
  dataPointLabelShiftX?: number;
  dataPointLabelShiftY?: number;

  startFillColor?: string;
  endFillColor?: string;
  startOpacity?: number;
  endOpacity?: number;
  startFillColor1?: string;
  endFillColor1?: string;
  startOpacity1?: number;
  endOpacity1?: number;
  startFillColor2?: string;
  endFillColor2?: string;
  startOpacity2?: number;
  endOpacity2?: number;
  startFillColor3?: string;
  endFillColor3?: string;
  startOpacity3?: number;
  endOpacity3?: number;
  startFillColor4?: string;
  endFillColor4?: string;
  startOpacity4?: number;
  endOpacity4?: number;
  startFillColor5?: string;
  endFillColor5?: string;
  startOpacity5?: number;
  endOpacity5?: number;
  gradientDirection?: string;

  textFontSize?: number;
  textColor?: string;
  textFontSize1?: number;
  textColor1?: string;
  textFontSize2?: number;
  textColor2?: string;
  textFontSize3?: number;
  textColor3?: string;
  textFontSize4?: number;
  textColor4?: string;
  textFontSize5?: number;
  textColor5?: string;
  hideOrigin?: Boolean;
  textShiftX?: number;
  textShiftY?: number;
  yAxisLabelTexts?: Array<string>;
  width?: number;
  yAxisLabelPrefix?: String;
  yAxisLabelSuffix?: String;
  scrollToEnd?: Boolean;
  scrollAnimation?: Boolean;
  noOfSectionsBelowXAxis?: number;
};
type referenceConfigType = {
  thickness: number;
  width: number;
  color: ColorValue | String | any;
  type: String;
  dashWidth: number;
  dashGap: number;
};
type itemType = {
  value?: number;
  label: String;
  labelComponent: Function;
  labelTextStyle?: any;
  dataPointText?: string;
  textShiftX?: number;
  textShiftY?: number;
  textColor?: string;
  textFontSize?: number;

  hideDataPoint?: Boolean;
  dataPointHeight?: number;
  dataPointWidth?: number;
  dataPointRadius?: number;
  dataPointColor?: string;
  dataPointShape?: string;
  customDataPoint?: Function;

  stripHeight?: number;
  stripWidth?: number;
  stripColor?: ColorValue | String | any;
  stripOpacity?: number;

  focusedDataPointShape?: String;
  focusedDataPointWidth?: number;
  focusedDataPointHeight?: number;
  focusedDataPointColor?: ColorValue | String | any;
  focusedDataPointRadius?: number;
  focusedCustomDataPoint?: Function;

  dataPointLabelComponent?: Function;
  focusedDataPointLabelComponent?: Function;
  dataPointLabelWidth?: number;
  dataPointLabelShiftX?: number;
  dataPointLabelShiftY?: number;
  showStrip?: Boolean;

  showVerticalLine?: Boolean;
  verticalLineUptoDataPoint?: Boolean;
  verticalLineColor?: string;
  verticalLineThickness?: number;
};

type sectionType = {
  value: string;
};

export const LineChart = (props: propTypes) => {
  const scrollRef = useRef();
  const [points, setPoints] = useState('');
  const [points2, setPoints2] = useState('');
  const [points3, setPoints3] = useState('');
  const [points4, setPoints4] = useState('');
  const [points5, setPoints5] = useState('');
  const [fillPoints, setFillPoints] = useState('');
  const [fillPoints2, setFillPoints2] = useState('');
  const [fillPoints3, setFillPoints3] = useState('');
  const [fillPoints4, setFillPoints4] = useState('');
  const [fillPoints5, setFillPoints5] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerHeight = props.height || 200;
  const noOfSections = props.noOfSections || 10;
  let data = useMemo(() => props.data || [], [props.data]);
  const data2 = useMemo(() => props.data2 || [], [props.data2]);
  const data3 = useMemo(() => props.data3 || [], [props.data3]);
  const data4 = useMemo(() => props.data4 || [], [props.data4]);
  const data5 = useMemo(() => props.data5 || [], [props.data5]);
  const scrollToEnd = props.scrollToEnd || false;
  const scrollAnimation = props.scrollAnimation === false ? false : true;

  const opacValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const widthValue2 = useMemo(() => new Animated.Value(0), []);
  const widthValue3 = useMemo(() => new Animated.Value(0), []);
  const widthValue4 = useMemo(() => new Animated.Value(0), []);
  const widthValue5 = useMemo(() => new Animated.Value(0), []);

  const animationDuration = props.animationDuration || 800;
  const onDataChangeAnimationDuration =
    props.onDataChangeAnimationDuration || 400;
  const animateTogether = props.animateTogether || false;
  const animateOnDataChange = props.animateOnDataChange || false;

  const yAxisLabelPrefix = props.yAxisLabelPrefix || '';
  const yAxisLabelSuffix = props.yAxisLabelSuffix || '';
  const yAxisSide = props.yAxisSide || 'left';

  const startIndex1 =
    props.startIndex1 === 0 ? 0 : props.startIndex1 || props.startIndex || 0;

  let endIndex1;
  if (props.endIndex1 === undefined || props.endIndex1 === null) {
    if (props.endIndex === undefined || props.endIndex === null) {
      endIndex1 = data.length - 1;
    } else {
      endIndex1 = props.endIndex;
    }
  } else {
    endIndex1 = props.endIndex1;
  }

  const startIndex2 = props.startIndex2 || 0;
  const endIndex2 =
    props.endIndex2 === 0 ? 0 : props.endIndex2 || data2.length - 1;

  const startIndex3 = props.startIndex3 || 0;
  const endIndex3 =
    props.endIndex3 === 0 ? 0 : props.endIndex3 || data3.length - 1;
  const startIndex4 = props.startIndex4 || 0;
  const endIndex4 =
    props.endIndex4 === 0 ? 0 : props.endIndex4 || data4.length - 1;
  const startIndex5 = props.startIndex5 || 0;
  const endIndex5 =
    props.endIndex5 === 0 ? 0 : props.endIndex5 || data5.length - 1;

  if (!initialData) {
    initialData = [...data];
    animations = initialData.map(item => new Animated.Value(item.value));
  }

  let newPoints = '',
    newFillPoints = '';
  let counter = 0;

  if (animateOnDataChange) {
    animations.forEach((item, index) => {
      item.addListener(val => {
        data[index].value = val.value;
        let pp = '',
          ppp = '';
        if (!props.curved) {
          for (let i = 0; i < data.length; i++) {
            pp +=
              'L' +
              (initialSpacing - dataPointsWidth1 / 2 + spacing * i) +
              ' ' +
              (containerHeight +
                10 -
                (data[i].value * containerHeight) / maxValue) +
              ' ';
          }
          if (areaChart) {
            ppp =
              'L' +
              (initialSpacing - dataPointsWidth1 / 2) +
              ' ' +
              (containerHeight + 10 - xAxisThickness) +
              ' ';
            ppp += pp;
            ppp +=
              'L' +
              (initialSpacing -
                dataPointsWidth1 / 2 +
                spacing * (data.length - 1)) +
              ' ' +
              (containerHeight + 10 - xAxisThickness);
            ppp +=
              'L' +
              (initialSpacing - dataPointsWidth1 / 2) +
              ' ' +
              (containerHeight + 10 - xAxisThickness) +
              ' ';
          }
          newPoints = pp;
          newFillPoints = ppp;
          setPointsOnChange();
        }
        counter++;
      });
    });
  }

  const setPointsOnChange = () => {
    if (counter === data.length) {
      // console.log('here.......');
      if (!props.curved) {
        setPoints(newPoints.replace('L', 'M'));
        if (areaChart) {
          setFillPoints(newFillPoints.replace('L', 'M'));
        }
      }
    }
  };

  useEffect(() => {
    if (animateOnDataChange) {
      Animated.parallel(
        animations.map((anItem, index) =>
          Animated.timing(anItem, {
            toValue: data[index].value,
            useNativeDriver: true,
            duration: onDataChangeAnimationDuration,
          }),
        ),
      ).start();
    }
  }, [animateOnDataChange, data, onDataChangeAnimationDuration]);

  const labelsAppear = useCallback(() => {
    opacValue.setValue(0);
    Animated.timing(opacValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [opacValue]);

  const appearingOpacity = opacValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const decreaseWidth = useCallback(() => {
    widthValue.setValue(0);
    Animated.timing(widthValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue]);

  const decreaseWidth2 = useCallback(() => {
    widthValue2.setValue(0);
    Animated.timing(widthValue2, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue2]);

  const decreaseWidth3 = useCallback(() => {
    widthValue3.setValue(0);
    Animated.timing(widthValue3, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue3]);

  const decreaseWidth4 = useCallback(() => {
    widthValue4.setValue(0);
    Animated.timing(widthValue4, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue4]);

  const decreaseWidth5 = useCallback(() => {
    widthValue5.setValue(0);
    Animated.timing(widthValue5, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue5]);

  const areaChart = props.areaChart || false;
  const dataPointsHeight1 =
    props.dataPointsHeight1 || props.dataPointsHeight || 2;
  const dataPointsWidth1 = props.dataPointsWidth1 || props.dataPointsWidth || 2;
  const dataPointsRadius1 =
    props.dataPointsRadius1 || props.dataPointsRadius || 3;
  const dataPointsColor1 =
    props.dataPointsColor1 || props.dataPointsColor || 'black';
  const dataPointsShape1 =
    props.dataPointsShape1 || props.dataPointsShape || 'circular';

  const dataPointsHeight2 =
    props.dataPointsHeight2 || props.dataPointsHeight || 2;
  const dataPointsWidth2 = props.dataPointsWidth2 || props.dataPointsWidth || 2;
  const dataPointsRadius2 =
    props.dataPointsRadius2 || props.dataPointsRadius || 3;
  const dataPointsColor2 =
    props.dataPointsColor2 || props.dataPointsColor || 'blue';
  const dataPointsShape2 =
    props.dataPointsShape2 || props.dataPointsShape || 'circular';

  const dataPointsHeight3 =
    props.dataPointsHeight3 || props.dataPointsHeight || 2;
  const dataPointsWidth3 = props.dataPointsWidth3 || props.dataPointsWidth || 2;
  const dataPointsRadius3 =
    props.dataPointsRadius3 || props.dataPointsRadius || 3;
  const dataPointsColor3 =
    props.dataPointsColor3 || props.dataPointsColor || 'red';
  const dataPointsShape3 =
    props.dataPointsShape3 || props.dataPointsShape || 'circular';

  const dataPointsHeight4 =
    props.dataPointsHeight4 || props.dataPointsHeight || 2;
  const dataPointsWidth4 = props.dataPointsWidth4 || props.dataPointsWidth || 2;
  const dataPointsRadius4 =
    props.dataPointsRadius4 || props.dataPointsRadius || 3;
  const dataPointsColor4 =
    props.dataPointsColor4 || props.dataPointsColor || 'red';
  const dataPointsShape4 =
    props.dataPointsShape4 || props.dataPointsShape || 'circular';

  const dataPointsHeight5 =
    props.dataPointsHeight5 || props.dataPointsHeight || 2;
  const dataPointsWidth5 = props.dataPointsWidth5 || props.dataPointsWidth || 2;
  const dataPointsRadius5 =
    props.dataPointsRadius5 || props.dataPointsRadius || 3;
  const dataPointsColor5 =
    props.dataPointsColor5 || props.dataPointsColor || 'red';
  const dataPointsShape5 =
    props.dataPointsShape5 || props.dataPointsShape || 'circular';

  const textFontSize1 = props.textFontSize1 || props.textFontSize || 10;
  const textFontSize2 = props.textFontSize2 || props.textFontSize || 10;
  const textFontSize3 = props.textFontSize3 || props.textFontSize || 10;
  const textFontSize4 = props.textFontSize4 || props.textFontSize || 10;
  const textFontSize5 = props.textFontSize5 || props.textFontSize || 10;
  const textColor1 = props.textColor1 || props.textColor || 'gray';
  const textColor2 = props.textColor2 || props.textColor || 'gray';
  const textColor3 = props.textColor3 || props.textColor || 'gray';
  const textColor4 = props.textColor4 || props.textColor || 'gray';
  const textColor5 = props.textColor5 || props.textColor || 'gray';
  const initialSpacing =
    props.initialSpacing === 0 ? 0 : props.initialSpacing || 40;
  const thickness = props.thickness || 2;

  const spacing = props.spacing === 0 ? 0 : props.spacing || 60;

  const xAxisThickness = props.xAxisThickness || 1;
  const xAxisColor = props.xAxisColor || 'black';

  let totalWidth = initialSpacing;
  let maxItem = 0,
    minItem = 0;
  data.forEach((item: itemType) => {
    if (item.value > maxItem) {
      maxItem = item.value;
    }
    if (item.value < minItem) {
      minItem = item.value;
    }
    totalWidth += spacing;
  });

  if (props.showFractionalValues || props.roundToDigits) {
    maxItem *= 10 * (props.roundToDigits || 1);
    maxItem = maxItem + (10 - (maxItem % 10));
    maxItem /= 10 * (props.roundToDigits || 1);
    maxItem = parseFloat(maxItem.toFixed(props.roundToDigits || 1));

    if (minItem !== 0) {
      minItem *= 10 * (props.roundToDigits || 1);
      minItem = minItem - (10 + (minItem % 10));
      minItem /= 10 * (props.roundToDigits || 1);
      minItem = parseFloat(minItem.toFixed(props.roundToDigits || 1));
    }
  } else {
    maxItem = maxItem + (10 - (maxItem % 10));
    if (minItem !== 0) {
      minItem = minItem - (10 + (minItem % 10));
    }
  }

  const maxValue = props.maxValue || maxItem;
  const minValue = props.minValue || minItem;

  useEffect(() => {
    // console.log('comes here............')
    decreaseWidth();
    labelsAppear();
    setTimeout(
      () => {
        decreaseWidth2();
      },
      animateTogether ? 0 : animationDuration,
    );
    setTimeout(
      () => {
        decreaseWidth3();
      },
      animateTogether ? 0 : animationDuration * 2,
    );
    setTimeout(
      () => {
        decreaseWidth4();
      },
      animateTogether ? 0 : animationDuration * 3,
    );
    setTimeout(
      () => {
        decreaseWidth5();
      },
      animateTogether ? 0 : animationDuration * 4,
    );
  }, [
    animateTogether,
    animationDuration,
    decreaseWidth,
    decreaseWidth2,
    decreaseWidth3,
    decreaseWidth4,
    decreaseWidth5,
    labelsAppear,
  ]);

  useEffect(() => {
    let pp = '',
      pp2 = '',
      pp3 = '',
      pp4 = '',
      pp5 = '';
    if (!props.curved) {
      for (let i = 0; i < data.length; i++) {
        if (i >= startIndex1 && i <= endIndex1 && !animateOnDataChange) {
          pp +=
            'L' +
            (initialSpacing - dataPointsWidth1 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data[i].value * containerHeight) / maxValue) +
            ' ';
          setPoints(pp.replace('L', 'M'));
        }
        if (data2.length && i >= startIndex2 && i <= endIndex2) {
          pp2 +=
            'L' +
            (initialSpacing - dataPointsWidth2 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data2[i].value * containerHeight) / maxValue) +
            ' ';
        }
        if (data3.length && i >= startIndex3 && i <= endIndex3) {
          pp3 +=
            'L' +
            (initialSpacing - dataPointsWidth3 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data3[i].value * containerHeight) / maxValue) +
            ' ';
        }
        if (data4.length && i >= startIndex4 && i <= endIndex4) {
          pp4 +=
            'L' +
            (initialSpacing - dataPointsWidth4 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data4[i].value * containerHeight) / maxValue) +
            ' ';
        }
        if (data5.length && i >= startIndex5 && i <= endIndex5) {
          pp5 +=
            'L' +
            (initialSpacing - dataPointsWidth5 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data5[i].value * containerHeight) / maxValue) +
            ' ';
        }
      }
      setPoints2(pp2.replace('L', 'M'));
      setPoints3(pp3.replace('L', 'M'));
      setPoints4(pp4.replace('L', 'M'));
      setPoints5(pp5.replace('L', 'M'));

      /***************************          For Area Charts          *************************/
      if (areaChart) {
        let ppp = '',
          ppp2 = '',
          ppp3 = '',
          ppp4 = '',
          ppp5 = '';

        if (!animateOnDataChange) {
          ppp =
            'L' +
            (initialSpacing - dataPointsWidth1 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          ppp += pp;
          ppp +=
            'L' +
            (initialSpacing -
              dataPointsWidth1 / 2 +
              spacing * (data.length - 1)) +
            ' ' +
            (containerHeight + 10 - xAxisThickness);
          ppp +=
            'L' +
            (initialSpacing - dataPointsWidth1 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints(ppp.replace('L', 'M'));
        }

        if (data2.length) {
          ppp2 =
            'L' +
            (initialSpacing - dataPointsWidth2 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          ppp2 += pp2;
          ppp2 +=
            'L' +
            (initialSpacing -
              dataPointsWidth2 / 2 +
              spacing * (data.length - 1)) +
            ' ' +
            (containerHeight + 10 - xAxisThickness);
          ppp2 +=
            'L' +
            (initialSpacing - dataPointsWidth2 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints2(ppp2.replace('L', 'M'));
        }

        if (data3.length) {
          ppp3 =
            'L' +
            (initialSpacing - dataPointsWidth3 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          ppp3 += pp3;
          ppp3 +=
            'L' +
            (initialSpacing -
              dataPointsWidth3 / 2 +
              spacing * (data.length - 1)) +
            ' ' +
            (containerHeight + 10 - xAxisThickness);
          ppp3 +=
            'L' +
            (initialSpacing - dataPointsWidth3 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints3(ppp3.replace('L', 'M'));
        }
        if (data4.length) {
          ppp4 =
            'L' +
            (initialSpacing - dataPointsWidth4 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          ppp4 += pp4;
          ppp4 +=
            'L' +
            (initialSpacing -
              dataPointsWidth4 / 2 +
              spacing * (data.length - 1)) +
            ' ' +
            (containerHeight + 10 - xAxisThickness);
          ppp4 +=
            'L' +
            (initialSpacing - dataPointsWidth4 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints4(ppp4.replace('L', 'M'));
        }

        if (data5.length) {
          ppp5 =
            'L' +
            (initialSpacing - dataPointsWidth5 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          ppp5 += pp5;
          ppp5 +=
            'L' +
            (initialSpacing -
              dataPointsWidth5 / 2 +
              spacing * (data.length - 1)) +
            ' ' +
            (containerHeight + 10 - xAxisThickness);
          ppp5 +=
            'L' +
            (initialSpacing - dataPointsWidth5 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints5(ppp5.replace('L', 'M'));
        }
      }

      // console.log('pp-------->', pp);
      // console.log('ppp-------->', ppp);
      // console.log('pp2-------->', pp2);
      // console.log('ppp2-------->', ppp2);

      /*************************************************************************************/
    } else {
      let p1Array = [],
        p2Array = [],
        p3Array = [],
        p4Array = [],
        p5Array = [];
      for (let i = 0; i < data.length; i++) {
        if (i >= startIndex1 && i <= endIndex1) {
          p1Array.push([
            initialSpacing - dataPointsWidth1 / 2 + spacing * i,
            containerHeight + 10 - (data[i].value * containerHeight) / maxValue,
          ]);
        }
        if (data2.length && i >= startIndex2 && i <= endIndex2) {
          p2Array.push([
            initialSpacing - dataPointsWidth2 / 2 + spacing * i,
            containerHeight +
              10 -
              (data2[i].value * containerHeight) / maxValue,
          ]);
        }
        if (data3.length && i >= startIndex3 && i <= endIndex3) {
          p3Array.push([
            initialSpacing - dataPointsWidth3 / 2 + spacing * i,
            containerHeight +
              10 -
              (data3[i].value * containerHeight) / maxValue,
          ]);
        }
        if (data4.length && i >= startIndex4 && i <= endIndex4) {
          p4Array.push([
            initialSpacing - dataPointsWidth4 / 2 + spacing * i,
            containerHeight +
              10 -
              (data4[i].value * containerHeight) / maxValue,
          ]);
        }
        if (data5.length && i >= startIndex5 && i <= endIndex5) {
          p5Array.push([
            initialSpacing - dataPointsWidth5 / 2 + spacing * i,
            containerHeight +
              10 -
              (data5[i].value * containerHeight) / maxValue,
          ]);
        }
      }
      let xx = svgPath(p1Array, bezierCommand);
      let xx2 = svgPath(p2Array, bezierCommand);
      let xx3 = svgPath(p3Array, bezierCommand);
      let xx4 = svgPath(p4Array, bezierCommand);
      let xx5 = svgPath(p5Array, bezierCommand);
      // console.log('xx', xx);
      setPoints(xx);
      setPoints2(xx2);
      setPoints3(xx3);
      setPoints4(xx4);
      setPoints5(xx5);

      /***************************          For Area Charts          *************************/

      // console.log('xx---->>>', xx)
      if (areaChart) {
        xx =
          'M ' +
          (initialSpacing - dataPointsWidth1 / 2) +
          ',' +
          (containerHeight + 10 - xAxisThickness) +
          ' ' +
          'L ' +
          (initialSpacing - dataPointsWidth1 / 2) +
          ',' +
          (containerHeight +
            10 -
            (data[0].value * containerHeight) / maxValue) +
          ' ' +
          xx +
          ' ' +
          'L ' +
          (initialSpacing -
            dataPointsWidth1 / 2 +
            spacing * (data.length - 1)) +
          ',' +
          (containerHeight + 10 - xAxisThickness) +
          ' ' +
          'L ' +
          (initialSpacing - dataPointsWidth1 / 2) +
          ',' +
          (containerHeight + 10 - xAxisThickness) +
          ' ';
        setFillPoints(xx);
        // console.log('xx later ---->>>', xx)

        if (data2.length) {
          xx2 =
            'M ' +
            (initialSpacing - dataPointsWidth2 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth2 / 2) +
            ',' +
            (containerHeight +
              10 -
              (data2[0].value * containerHeight) / maxValue) +
            ' ' +
            xx2 +
            ' ' +
            'L ' +
            (initialSpacing -
              dataPointsWidth2 / 2 +
              spacing * (data2.length - 1)) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth2 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints2(xx2);
        }

        if (data3.length) {
          xx3 =
            'M ' +
            (initialSpacing - dataPointsWidth3 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth3 / 2) +
            ',' +
            (containerHeight +
              10 -
              (data3[0].value * containerHeight) / maxValue) +
            ' ' +
            xx3 +
            ' ' +
            'L ' +
            (initialSpacing -
              dataPointsWidth3 / 2 +
              spacing * (data3.length - 1)) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth3 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints3(xx3);
        }

        if (data4.length) {
          xx4 =
            'M ' +
            (initialSpacing - dataPointsWidth4 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth4 / 2) +
            ',' +
            (containerHeight +
              10 -
              (data4[0].value * containerHeight) / maxValue) +
            ' ' +
            xx4 +
            ' ' +
            'L ' +
            (initialSpacing -
              dataPointsWidth4 / 2 +
              spacing * (data4.length - 1)) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth4 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints4(xx4);
        }

        if (data5.length) {
          xx5 =
            'M ' +
            (initialSpacing - dataPointsWidth5 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth5 / 2) +
            ',' +
            (containerHeight +
              10 -
              (data5[0].value * containerHeight) / maxValue) +
            ' ' +
            xx5 +
            ' ' +
            'L ' +
            (initialSpacing -
              dataPointsWidth5 / 2 +
              spacing * (data5.length - 1)) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth5 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints5(xx5);
        }
      }

      /*************************************************************************************/
    }
  }, [
    animateOnDataChange,
    areaChart,
    containerHeight,
    data,
    data2,
    data3,
    data4,
    data5,
    dataPointsWidth1,
    dataPointsWidth2,
    dataPointsWidth3,
    dataPointsWidth4,
    dataPointsWidth5,
    initialSpacing,
    maxValue,
    props.curved,
    spacing,
    xAxisThickness,
    startIndex1,
    endIndex1,
    startIndex2,
    endIndex2,
    startIndex3,
    endIndex3,
    startIndex4,
    endIndex4,
    startIndex5,
    endIndex5,
  ]);

  const horizSections = [{value: '0'}];
  const horizSectionsBelow = [];
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const stepValue = props.stepValue || maxValue / noOfSections;
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis || -minValue / stepValue;
  const thickness1 = props.thickness1;
  const thickness2 = props.thickness2;
  const thickness3 = props.thickness3;
  const thickness4 = props.thickness4;
  const thickness5 = props.thickness5;
  const rotateLabel = props.rotateLabel || false;
  const isAnimated = props.isAnimated || false;
  const hideDataPoints1 =
    props.hideDataPoints || props.hideDataPoints1 || false;
  const hideDataPoints2 =
    props.hideDataPoints || props.hideDataPoints2 || false;
  const hideDataPoints3 =
    props.hideDataPoints || props.hideDataPoints3 || false;
  const hideDataPoints4 =
    props.hideDataPoints || props.hideDataPoints4 || false;
  const hideDataPoints5 =
    props.hideDataPoints || props.hideDataPoints5 || false;

  const color1 = props.color1 || props.color || 'black';
  const color2 = props.color2 || props.color || 'black';
  const color3 = props.color3 || props.color || 'black';
  const color4 = props.color4 || props.color || 'black';
  const color5 = props.color5 || props.color || 'black';

  const startFillColor1 =
    props.startFillColor1 || props.startFillColor || 'gray';
  const endFillColor1 = props.endFillColor1 || props.endFillColor || 'white';
  const startOpacity1 = props.startOpacity1 || props.startOpacity || 1;
  const endOpacity1 = props.endOpacity1 || props.endOpacity || 1;

  const startFillColor2 =
    props.startFillColor2 || props.startFillColor || 'gray';
  const endFillColor2 = props.endFillColor2 || props.endFillColor || 'white';
  const startOpacity2 = props.startOpacity2 || props.startOpacity || 1;
  const endOpacity2 = props.endOpacity2 || props.endOpacity || 1;

  const startFillColor3 =
    props.startFillColor3 || props.startFillColor || 'gray';
  const endFillColor3 = props.endFillColor3 || props.endFillColor || 'white';
  const startOpacity3 = props.startOpacity3 || props.startOpacity || 1;
  const endOpacity3 = props.endOpacity3 || props.endOpacity || 1;

  const startFillColor4 =
    props.startFillColor4 || props.startFillColor || 'gray';
  const endFillColor4 = props.endFillColor4 || props.endFillColor || 'white';
  const startOpacity4 = props.startOpacity4 || props.startOpacity || 1;
  const endOpacity4 = props.endOpacity4 || props.endOpacity || 1;

  const startFillColor5 =
    props.startFillColor5 || props.startFillColor || 'gray';
  const endFillColor5 = props.endFillColor5 || props.endFillColor || 'white';
  const startOpacity5 = props.startOpacity5 || props.startOpacity || 1;
  const endOpacity5 = props.endOpacity5 || props.endOpacity || 1;

  const rulesThickness =
    props.rulesThickness === 0 ? 0 : props.rulesThickness || 1;
  const rulesColor = props.rulesColor || 'lightgray';
  const verticalLinesThickness =
    props.verticalLinesThickness === 0 ? 0 : props.verticalLinesThickness || 1;
  const verticalLinesColor = props.verticalLinesColor || 'lightgray';
  const verticalLinesZIndex = props.verticalLinesZIndex || -1;

  const gradientDirection = props.gradientDirection || 'vertical';
  // const animationEasing = props.animationEasing || Easing.ease
  // const opacity = props.opacity || 1;

  const hideRules = props.hideRules || false;
  const showVerticalLines = props.showVerticalLines || false;
  const verticalLinesUptoDataPoint = props.verticalLinesUptoDataPoint || false;

  const showYAxisIndices = props.showYAxisIndices || false;
  const showXAxisIndices = props.showXAxisIndices || false;
  const yAxisIndicesHeight = props.yAxisIndicesHeight || 4;
  const xAxisIndicesHeight = props.xAxisIndicesHeight || 2;
  const yAxisIndicesWidth = props.yAxisIndicesWidth || 2;
  const xAxisIndicesWidth = props.xAxisIndicesWidth || 4;
  const xAxisIndicesColor = props.xAxisIndicesColor || 'black';
  const yAxisIndicesColor = props.yAxisIndicesColor || 'black';

  const yAxisThickness = props.yAxisThickness || 1;
  const yAxisColor = props.yAxisColor || 'black';
  const yAxisTextStyle = props.yAxisTextStyle;
  const showFractionalValues = props.showFractionalValues || false;
  const yAxisLabelWidth = props.yAxisLabelWidth || 35;
  const hideYAxisText = props.hideYAxisText || false;

  const backgroundColor = props.backgroundColor || 'transparent';

  const disableScroll = props.disableScroll || false;
  const showScrollIndicator = props.showScrollIndicator || false;
  const hideOrigin = props.hideOrigin || false;

  const rulesType = props.rulesType || 'line';
  const dashWidth = props.dashWidth === 0 ? 0 : props.dashWidth || 4;
  const dashGap = props.dashGap === 0 ? 0 : props.dashGap || 8;

  const pressEnabled = props.pressEnabled || false;
  const showDataPointOnPress = props.showDataPointOnPress || false;
  const showStripOnPress = props.showStripOnPress || false;
  const showTextOnPress = props.showTextOnPress || false;
  const stripHeight = props.stripHeight;
  const stripWidth = props.stripWidth === 0 ? 0 : props.stripWidth || 2;
  const stripColor = props.stripColor || color1;
  const stripOpacity = props.stripOpacity || (startOpacity1 + endOpacity1) / 2;
  const unFocusOnPressOut = props.unFocusOnPressOut === false ? false : true;
  const delayBeforeUnFocus =
    props.delayBeforeUnFocus === 0 ? 0 : props.delayBeforeUnFocus || 300;

  const defaultReferenceConfig = {
    thickness: rulesThickness,
    width: (props.width || totalWidth) + 11,
    color: 'black',
    type: rulesType,
    dashWidth: dashWidth,
    dashGap: dashGap,
  };

  const showReferenceLine1 = props.showReferenceLine1 || false;
  const referenceLine1Position =
    props.referenceLine1Position === 0
      ? 0
      : props.referenceLine1Position || containerHeight / 2;
  const referenceLine1Config = props.referenceLine1Config
    ? {
        thickness: props.referenceLine1Config.thickness || rulesThickness,
        width:
          (props.referenceLine1Config.width || props.width || totalWidth) + 11,
        color: props.referenceLine1Config.color || 'black',
        type: props.referenceLine1Config.type || rulesType,
        dashWidth: props.referenceLine1Config.dashWidth || dashWidth,
        dashGap: props.referenceLine1Config.dashGap || dashGap,
      }
    : defaultReferenceConfig;

  const showReferenceLine2 = props.showReferenceLine2 || false;
  const referenceLine2Position =
    props.referenceLine2Position === 0
      ? 0
      : props.referenceLine2Position || (3 * containerHeight) / 2;
  const referenceLine2Config = props.referenceLine2Config
    ? {
        thickness: props.referenceLine2Config.thickness || rulesThickness,
        width:
          (props.referenceLine2Config.width || props.width || totalWidth) + 11,
        color: props.referenceLine2Config.color || 'black',
        type: props.referenceLine2Config.type || rulesType,
        dashWidth: props.referenceLine2Config.dashWidth || dashWidth,
        dashGap: props.referenceLine2Config.dashGap || dashGap,
      }
    : defaultReferenceConfig;

  const showReferenceLine3 = props.showReferenceLine3 || false;
  const referenceLine3Position =
    props.referenceLine3Position === 0
      ? 0
      : props.referenceLine3Position || containerHeight / 3;
  const referenceLine3Config = props.referenceLine3Config
    ? {
        thickness: props.referenceLine3Config.thickness || rulesThickness,
        width:
          (props.referenceLine3Config.width || props.width || totalWidth) + 11,
        color: props.referenceLine3Config.color || 'black',
        type: props.referenceLine3Config.type || rulesType,
        dashWidth: props.referenceLine3Config.dashWidth || dashWidth,
        dashGap: props.referenceLine3Config.dashGap || dashGap,
      }
    : defaultReferenceConfig;

  // console.log('data', data);
  horizSections.pop();
  for (let i = 0; i <= noOfSections; i++) {
    let value = maxValue - stepValue * i;
    if (props.showFractionalValues || props.roundToDigits) {
      value = parseFloat(value.toFixed(props.roundToDigits || 1));
    }
    horizSections.push({
      value: props.yAxisLabelTexts
        ? props.yAxisLabelTexts[noOfSections - i] ?? value.toString()
        : value.toString(),
    });
  }
  if (noOfSectionsBelowXAxis) {
    for (let i = 1; i <= noOfSectionsBelowXAxis; i++) {
      let value = stepValue * -i;
      if (props.showFractionalValues || props.roundToDigits) {
        value = parseFloat(value.toFixed(props.roundToDigits || 1));
      }
      horizSectionsBelow.push({
        value: props.yAxisLabelTexts
          ? props.yAxisLabelTexts[noOfSectionsBelowXAxis - i] ??
            value.toString()
          : value.toString(),
      });
    }
  }

  const renderLabel = (
    index: number,
    label: String,
    labelTextStyle: any,
    labelComponent: Function,
  ) => {
    return (
      <View
        style={[
          {
            position: 'absolute',
            bottom: 30,
            zIndex: 10,
            width: spacing,
            left:
              index === 0 && initialSpacing < 10
                ? initialSpacing + spacing * index - spacing / 2 + 8
                : initialSpacing + spacing * index - spacing / 2,
            justifyContent: 'center',
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={labelTextStyle || {textAlign: 'center'}}
            numberOfLines={1}>
            {label || ''}
          </Text>
        )}
      </View>
    );
  };

  const renderAnimatedLabel = (
    index: number,
    label: String,
    labelTextStyle: any,
    labelComponent: Function,
  ) => {
    // console.log('label', label);
    return (
      <Animated.View
        style={[
          {
            height: rotateLabel ? 40 : 20,
            // backgroundColor: 'yellow',
            position: 'absolute',
            bottom: rotateLabel ? 10 : 30,
            zIndex: 10,
            width: spacing,
            left:
              index === 0 && initialSpacing < 10
                ? initialSpacing + spacing * index - spacing / 2 + 8
                : initialSpacing + spacing * index - spacing / 2,
            opacity: appearingOpacity,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={labelTextStyle || {textAlign: 'center'}}
            numberOfLines={1}>
            {label || ''}
          </Text>
        )}
      </Animated.View>
    );
  };

  const animatedWidth = widthValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const animatedWidth2 = widthValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const animatedWidth3 = widthValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const animatedWidth4 = widthValue4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const animatedWidth5 = widthValue5.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  // const sectionsOverlay = () => {
  //     return (
  //         <Animated.View
  //             style={{
  //                 backgroundColor: 'white',
  //                 position: 'absolute',
  //                 zIndex: 1,
  //                 width: animatedWidth
  //             }}>
  //             {renderHorizSections()}
  //         </Animated.View>
  //     )
  // }

  const getLabel = val => {
    let label = '';
    if (showFractionalValues) {
      if (val) {
        label = val;
      } else {
        label = '0';
      }
    } else {
      if (val) {
        label = val.toString().split('.')[0];
      } else {
        label = '0';
      }
    }

    return yAxisLabelPrefix + label + yAxisLabelSuffix;
  };

  const renderHorizSections = () => {
    return (
      <>
        {props.hideAxesAndRules !== true &&
          horizSections.map((sectionItems, index) => {
            let label = getLabel(sectionItems.value);
            if (hideOrigin && index === horizSections.length - 1) {
              label = '';
            }
            return (
              <View
                key={index}
                style={[
                  styles.horizBar,
                  {
                    width: (props.width ? props.width : totalWidth) + 15,
                  },
                  yAxisSide === 'right' && {transform: [{rotateY: '180deg'}]},
                ]}>
                <View
                  style={[
                    styles.leftLabel,
                    {
                      height:
                        index === noOfSections ? stepHeight / 2 : stepHeight,
                      width: yAxisLabelWidth,
                    },
                  ]}>
                  {!hideYAxisText ? (
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'clip'}
                      style={[
                        yAxisTextStyle,
                        yAxisSide === 'right' && {
                          transform: [{rotateY: '180deg'}],
                        },
                        index === noOfSections && {
                          marginBottom: stepHeight / -2,
                        },
                      ]}>
                      {label}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={[
                    index === noOfSections
                      ? styles.lastLeftPart
                      : styles.leftPart,
                    {
                      borderLeftWidth: yAxisThickness,
                      borderColor: yAxisColor,
                      backgroundColor: backgroundColor,
                    },
                  ]}>
                  {index === noOfSections ? (
                    <View
                      style={[
                        styles.lastLine,
                        {height: xAxisThickness, backgroundColor: xAxisColor},
                      ]}
                    />
                  ) : hideRules ? null : (
                    <Rule
                      config={{
                        thickness: rulesThickness,
                        color: rulesColor,
                        width: (props.width || totalWidth) + 11,
                        dashWidth: dashWidth,
                        dashGap: dashGap,
                        type: rulesType,
                      }}
                    />
                  )}
                  {index === 0 && showReferenceLine1 ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom:
                          (referenceLine1Position * containerHeight) /
                            maxValue +
                          stepHeight / 2 -
                          referenceLine1Config.thickness / 2,
                        transform: [{translateY: containerHeight}],
                      }}>
                      <Rule config={referenceLine1Config} />
                    </View>
                  ) : null}
                  {index === 0 && showReferenceLine2 ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom:
                          (referenceLine2Position * containerHeight) /
                            maxValue +
                          stepHeight / 2 -
                          referenceLine2Config.thickness / 2,
                        transform: [{translateY: containerHeight}],
                      }}>
                      <Rule config={referenceLine2Config} />
                    </View>
                  ) : null}
                  {index === 0 && showReferenceLine3 ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom:
                          (referenceLine3Position * containerHeight) /
                            maxValue +
                          stepHeight / 2 -
                          referenceLine3Config.thickness / 2,
                        transform: [{translateY: containerHeight}],
                      }}>
                      <Rule config={referenceLine3Config} />
                    </View>
                  ) : null}
                  {showXAxisIndices && index !== noOfSections ? (
                    <View
                      style={{
                        height: xAxisIndicesHeight,
                        width: xAxisIndicesWidth,
                        left: xAxisIndicesWidth / -2,
                        backgroundColor: xAxisIndicesColor,
                      }}
                    />
                  ) : null}
                </View>
              </View>
            );
          })}

        {horizSectionsBelow.map((sectionItems, index) => {
          let label = getLabel(sectionItems.value);
          if (hideOrigin && index === horizSections.length - 1) {
            label = '';
          }
          return (
            <View
              key={index}
              style={[
                styles.horizBar,
                {
                  width: (props.width ? props.width : totalWidth) + 15,
                },
                index === 0 && {marginTop: stepHeight / 2},
                yAxisSide === 'right' && {transform: [{rotateY: '180deg'}]},
              ]}>
              <View
                style={[
                  styles.leftLabel,
                  {
                    borderRightWidth: yAxisThickness,
                    borderColor: yAxisColor,
                    marginLeft: 1,
                  },
                  {
                    height: index === 0 ? stepHeight * 1.5 : stepHeight,
                    width: yAxisLabelWidth,
                  },
                  index === 0 && {marginTop: -stepHeight / 2},
                ]}>
                {!hideYAxisText ? (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'clip'}
                    style={[
                      yAxisTextStyle,
                      index === 0 && {marginBottom: stepHeight / -2},
                      yAxisSide === 'right' && {
                        transform: [{rotateY: '180deg'}],
                      },
                    ]}>
                    {label}
                  </Text>
                ) : null}
              </View>
              <View
                style={[styles.leftPart, {backgroundColor: backgroundColor}]}>
                {hideRules ? null : (
                  <Rule
                    config={{
                      thickness: rulesThickness,
                      color: rulesColor,
                      width: (props.width || totalWidth) + 11,
                      dashWidth: dashWidth,
                      dashGap: dashGap,
                      type: rulesType,
                    }}
                  />
                )}
              </View>
            </View>
          );
        })}
      </>
    );
  };

  const onStripPress = (item, index) => {
    setSelectedIndex(index);
    if (props.onPress) {
      props.onPress(item, index);
    }
  };

  const renderDataPoints = (
    dataForRender,
    dataPtsShape,
    dataPtsWidth,
    dataPtsHeight,
    dataPtsColor,
    dataPtsRadius,
    textColor,
    textFontSize,
    startIndex,
    endIndex,
  ) => {
    return dataForRender.map((item: itemType, index: number) => {
      if (index < startIndex || index > endIndex) return null;
      if (item.hideDataPoint) {
        return null;
      }
      let dataPointsShape,
        dataPointsWidth,
        dataPointsHeight,
        dataPointsColor,
        dataPointsRadius,
        text,
        customDataPoint,
        dataPointLabelComponent;
      if (index === selectedIndex) {
        dataPointsShape =
          item.focusedDataPointShape ||
          props.focusedDataPointShape ||
          item.dataPointShape ||
          dataPtsShape;
        dataPointsWidth =
          item.focusedDataPointWidth ||
          props.focusedDataPointWidth ||
          item.dataPointWidth ||
          dataPtsWidth;
        dataPointsHeight =
          item.focusedDataPointHeight ||
          props.focusedDataPointHeight ||
          item.dataPointHeight ||
          dataPtsHeight;
        dataPointsColor =
          item.focusedDataPointColor ||
          props.focusedDataPointColor ||
          item.dataPointColor ||
          dataPtsColor;
        dataPointsRadius =
          item.focusedDataPointRadius ||
          props.focusedDataPointRadius ||
          item.dataPointRadius ||
          dataPtsRadius;
        if (showTextOnPress) {
          text = item.dataPointText;
        }
        customDataPoint =
          item.focusedCustomDataPoint ||
          props.focusedCustomDataPoint ||
          item.customDataPoint ||
          props.customDataPoint;
        dataPointLabelComponent =
          item.focusedDataPointLabelComponent || item.dataPointLabelComponent;
      } else {
        dataPointsShape = item.dataPointShape || dataPtsShape;
        dataPointsWidth = item.dataPointWidth || dataPtsWidth;
        dataPointsHeight = item.dataPointHeight || dataPtsHeight;
        dataPointsColor = item.dataPointColor || dataPtsColor;
        dataPointsRadius = item.dataPointRadius || dataPtsRadius;
        if (showTextOnPress) {
          text = '';
        }
        customDataPoint = item.customDataPoint || props.customDataPoint;
        dataPointLabelComponent = item.dataPointLabelComponent;
      }

      const currentStripHeight =
        item.stripHeight === 0 ? 0 : item.stripHeight || stripHeight;
      const currentStripWidth =
        item.stripWidth === 0 ? 0 : item.stripWidth || stripWidth;
      const currentStripOpacity =
        item.stripOpacity === 0 ? 0 : item.stripOpacity || stripOpacity;
      const currentStripColor = item.stripColor || stripColor;

      return (
        <Fragment key={index}>
          {pressEnabled ? (
            <>
              {unFocusOnPressOut ? (
                <Rect
                  onPressIn={() => onStripPress(item, index)}
                  onPressOut={() =>
                    setTimeout(() => setSelectedIndex(-1), delayBeforeUnFocus)
                  }
                  x={initialSpacing + (spacing * index - spacing / 2)}
                  y={8}
                  width={spacing}
                  height={containerHeight - 0}
                  fill={'none'}
                />
              ) : (
                <Rect
                  onPress={() => onStripPress(item, index)}
                  x={initialSpacing + (spacing * index - spacing / 2)}
                  y={8}
                  width={spacing}
                  height={containerHeight - 0}
                  fill={'none'}
                />
              )}
            </>
          ) : null}
          {item.showStrip ||
          (pressEnabled && index === selectedIndex && showStripOnPress) ? (
            <Rect
              x={initialSpacing + (spacing * index - dataPointsWidth / 2)}
              y={
                currentStripHeight
                  ? containerHeight - currentStripHeight + 8
                  : containerHeight -
                    dataPointsHeight / 2 +
                    20 -
                    (item.value * containerHeight) / maxValue
              }
              width={currentStripWidth}
              height={
                currentStripHeight ||
                containerHeight - dataPointsHeight / 2 + 20
              }
              opacity={currentStripOpacity}
              fill={currentStripColor}
            />
          ) : null}
          {customDataPoint ? (
            <View
              style={[
                styles.customDataPointContainer,
                {
                  height: dataPointsHeight,
                  width: dataPointsWidth,
                  top:
                    containerHeight - (item.value * containerHeight) / maxValue,
                  left: initialSpacing - dataPointsWidth + spacing * index,
                },
              ]}>
              {customDataPoint()}
            </View>
          ) : null}
          {dataPointsShape === 'rectangular' ? (
            <Fragment key={index}>
              {customDataPoint ? null : (
                <Rect
                  x={initialSpacing - dataPointsWidth + spacing * index}
                  y={
                    containerHeight -
                    dataPointsHeight / 2 +
                    10 -
                    (item.value * containerHeight) / maxValue
                  }
                  width={dataPointsWidth}
                  height={dataPointsHeight}
                  fill={
                    showDataPointOnPress
                      ? index === selectedIndex
                        ? dataPointsColor
                        : 'none'
                      : dataPointsColor
                  }
                />
              )}
            </Fragment>
          ) : (
            <Fragment key={index}>
              {customDataPoint ? null : (
                <Circle
                  cx={initialSpacing - dataPointsWidth / 2 + spacing * index}
                  cy={
                    containerHeight +
                    10 -
                    (item.value * containerHeight) / maxValue
                  }
                  r={dataPointsRadius}
                  fill={
                    showDataPointOnPress
                      ? index === selectedIndex
                        ? dataPointsColor
                        : 'none'
                      : dataPointsColor
                  }
                />
              )}
            </Fragment>
          )}
          {dataPointLabelComponent ? (
            !showTextOnPress || index === selectedIndex ? (
              <View
                style={[
                  styles.customDataPointContainer,
                  {
                    top:
                      containerHeight +
                      (item.dataPointLabelShiftY ||
                        props.dataPointLabelShiftY ||
                        0) -
                      (item.value * containerHeight) / maxValue,
                    left:
                      initialSpacing +
                      (item.dataPointLabelShiftX ||
                        props.dataPointLabelShiftX ||
                        0) -
                      (item.dataPointLabelWidth
                        ? item.dataPointLabelWidth + 20
                        : props.dataPointLabelWidth
                        ? props.dataPointLabelWidth + 20
                        : 50) /
                        2 +
                      spacing * index,
                  },
                ]}>
                {dataPointLabelComponent()}
              </View>
            ) : null
          ) : text || item.dataPointText ? (
            !showTextOnPress || index === selectedIndex ? (
              <CanvasText
                fill={item.textColor || textColor}
                fontSize={item.textFontSize || textFontSize}
                x={
                  initialSpacing -
                  dataPointsWidth +
                  spacing * index +
                  (item.textShiftX || props.textShiftX || 0)
                }
                y={
                  containerHeight -
                  dataPointsHeight / 2 +
                  10 -
                  (item.value * containerHeight) / maxValue +
                  (item.textShiftY || props.textShiftY || 0)
                }>
                {!showTextOnPress ? item.dataPointText : text}
              </CanvasText>
            ) : null
          ) : null}
        </Fragment>
      );
    });
  };

  const renderSpecificVerticalLines = (dataForRender: any) => {
    return dataForRender.map((item: itemType, index: number) => {
      if (item.showVerticalLine) {
        return (
          <Rect
            x={
              initialSpacing -
              (item.verticalLineThickness || 1) / 2 -
              1 +
              spacing * index
            }
            y={
              item.verticalLineUptoDataPoint
                ? containerHeight -
                  (item.value * containerHeight) / maxValue +
                  10
                : -xAxisThickness
            }
            width={item.verticalLineThickness || 1}
            height={
              item.verticalLineUptoDataPoint
                ? (item.value * containerHeight) / maxValue - xAxisThickness
                : containerHeight + 10 - xAxisThickness
            }
            fill={item.verticalLineColor || 'lightgray'}
          />
        );
      }
      return null;
    });
  };

  const renderLine = (
    points: any,
    currentLineThickness: number | undefined,
    color: string,
    fillPoints: any,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
  ) => {
    return (
      <View
        style={{
          position: 'absolute',
          height: containerHeight + 10 + horizSectionsBelow.length * stepHeight,
          bottom: 60, //stepHeight * -0.5 + xAxisThickness,
          width: totalWidth,
          zIndex: -1,
          // backgroundColor: 'rgba(200,150,150,0.6)'
        }}>
        <Svg>
          <Path
            d={points}
            fill="none"
            stroke={color}
            strokeWidth={currentLineThickness || thickness}
          />

          {/***********************      For Area Chart        ************/}

          {areaChart && (
            <LinearGradient
              id="Gradient"
              x1="0"
              y1="0"
              x2={gradientDirection === 'horizontal' ? '1' : '0'}
              y2={gradientDirection === 'vertical' ? '1' : '0'}>
              <Stop
                offset="0"
                stopColor={startFillColor}
                stopOpacity={startOpacity.toString()}
              />
              <Stop
                offset="1"
                stopColor={endFillColor}
                stopOpacity={endOpacity.toString()}
              />
            </LinearGradient>
          )}
          {areaChart && (
            <Path
              d={fillPoints}
              fill="url(#Gradient)"
              stroke={'transparent'}
              strokeWidth={currentLineThickness || thickness}
            />
          )}

          {/******************************************************************/}

          {renderSpecificVerticalLines(data)}
          {renderSpecificVerticalLines(data2)}
          {renderSpecificVerticalLines(data3)}
          {renderSpecificVerticalLines(data4)}
          {renderSpecificVerticalLines(data5)}

          {/***  !!! Here it's done thrice intentionally, trying to make it to only 1 breaks things !!!  ***/}
          {!hideDataPoints1
            ? renderDataPoints(
                data,
                dataPointsShape1,
                dataPointsWidth1,
                dataPointsHeight1,
                dataPointsColor1,
                dataPointsRadius1,
                textColor1,
                textFontSize1,
                startIndex1,
                endIndex1,
              )
            : null}
          {!hideDataPoints2
            ? renderDataPoints(
                data2,
                dataPointsShape2,
                dataPointsWidth2,
                dataPointsHeight2,
                dataPointsColor2,
                dataPointsRadius2,
                textColor2,
                textFontSize2,
                startIndex2,
                endIndex2,
              )
            : null}
          {!hideDataPoints3
            ? renderDataPoints(
                data3,
                dataPointsShape3,
                dataPointsWidth3,
                dataPointsHeight3,
                dataPointsColor3,
                dataPointsRadius3,
                textColor3,
                textFontSize3,
                startIndex3,
                endIndex3,
              )
            : null}
          {!hideDataPoints4
            ? renderDataPoints(
                data4,
                dataPointsShape4,
                dataPointsWidth4,
                dataPointsHeight4,
                dataPointsColor4,
                dataPointsRadius4,
                textColor4,
                textFontSize4,
                startIndex4,
                endIndex4,
              )
            : null}
          {!hideDataPoints5
            ? renderDataPoints(
                data5,
                dataPointsShape5,
                dataPointsWidth5,
                dataPointsHeight5,
                dataPointsColor5,
                dataPointsRadius5,
                textColor5,
                textFontSize5,
                startIndex5,
                endIndex5,
              )
            : null}
        </Svg>
      </View>
    );
  };

  const renderAnimatedLine = (
    points: any,
    animatedWidth: any,
    currentLineThickness: number | undefined,
    color: string,
    fillPoints: any,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
  ) => {
    // console.log('animatedWidth is-------->', animatedWidth);
    return (
      <Animated.View
        style={{
          position: 'absolute',
          height: containerHeight + 10 + horizSectionsBelow.length * stepHeight,
          bottom: 60, //stepHeight * -0.5 + xAxisThickness,
          width: animatedWidth,
          zIndex: -1,
          // backgroundColor: 'wheat',
        }}>
        <Svg>
          <Path
            d={points}
            fill="none"
            stroke={color}
            strokeWidth={currentLineThickness || thickness}
          />

          {/***********************      For Area Chart        ************/}

          {areaChart && (
            <LinearGradient
              id="Gradient"
              x1="0"
              y1="0"
              x2={gradientDirection === 'horizontal' ? '1' : '0'}
              y2={gradientDirection === 'vertical' ? '1' : '0'}>
              <Stop
                offset="0"
                stopColor={startFillColor}
                stopOpacity={startOpacity.toString()}
              />
              <Stop
                offset="1"
                stopColor={endFillColor}
                stopOpacity={endOpacity.toString()}
              />
            </LinearGradient>
          )}
          {areaChart && (
            <Path
              d={fillPoints}
              fill="url(#Gradient)"
              stroke={'transparent'}
              strokeWidth={currentLineThickness || thickness}
            />
          )}

          {/******************************************************************/}

          {renderSpecificVerticalLines(data)}
          {renderSpecificVerticalLines(data2)}
          {renderSpecificVerticalLines(data3)}
          {renderSpecificVerticalLines(data4)}
          {renderSpecificVerticalLines(data5)}

          {/***  !!! Here it's done thrice intentionally, trying to make it to only 1 breaks things !!!  ***/}
          {!hideDataPoints1
            ? renderDataPoints(
                data,
                dataPointsShape1,
                dataPointsWidth1,
                dataPointsHeight1,
                dataPointsColor1,
                dataPointsRadius1,
                textColor1,
                textFontSize1,
                startIndex1,
                endIndex1,
              )
            : null}
          {!hideDataPoints2
            ? renderDataPoints(
                data2,
                dataPointsShape2,
                dataPointsWidth2,
                dataPointsHeight2,
                dataPointsColor2,
                dataPointsRadius2,
                textColor2,
                textFontSize2,
                startIndex2,
                endIndex2,
              )
            : null}
          {!hideDataPoints3
            ? renderDataPoints(
                data3,
                dataPointsShape3,
                dataPointsWidth3,
                dataPointsHeight3,
                dataPointsColor3,
                dataPointsRadius3,
                textColor3,
                textFontSize3,
                startIndex3,
                endIndex3,
              )
            : null}
          {!hideDataPoints4
            ? renderDataPoints(
                data4,
                dataPointsShape4,
                dataPointsWidth4,
                dataPointsHeight4,
                dataPointsColor4,
                dataPointsRadius4,
                textColor4,
                textFontSize4,
                startIndex4,
                endIndex4,
              )
            : null}
          {!hideDataPoints5
            ? renderDataPoints(
                data5,
                dataPointsShape5,
                dataPointsWidth5,
                dataPointsHeight5,
                dataPointsColor5,
                dataPointsRadius5,
                textColor5,
                textFontSize5,
                startIndex5,
                endIndex5,
              )
            : null}
        </Svg>
      </Animated.View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {height: containerHeight + horizSectionsBelow.length * stepHeight},
        yAxisSide === 'right' && {marginLeft: yAxisLabelWidth + yAxisThickness},
      ]}>
      {props.hideAxesAndRules !== true && renderHorizSections()}
      {/* {sectionsOverlay()} */}
      <ScrollView
        horizontal
        contentContainerStyle={[
          {
            height:
              containerHeight + 130 + horizSectionsBelow.length * stepHeight,
            width: totalWidth - 20,
            paddingBottom: horizSectionsBelow.length * stepHeight,
            // backgroundColor: 'yellow'
          },
          !props.width && {width: totalWidth - 20},
        ]}
        scrollEnabled={!disableScroll}
        ref={scrollRef}
        onContentSizeChange={() => {
          if (scrollRef.current && scrollToEnd) {
            scrollRef.current.scrollToEnd({animated: scrollAnimation});
          }
        }}
        showsHorizontalScrollIndicator={showScrollIndicator}
        style={[
          {
            marginLeft:
              yAxisSide === 'right'
                ? -yAxisLabelWidth - yAxisThickness + 6
                : yAxisLabelWidth + yAxisThickness,
            position: 'absolute',
            bottom: stepHeight * -0.5 - 60, //stepHeight * -0.5 + xAxisThickness,
            paddingRight: 100,
          },
          props.width && {width: props.width + 10},
        ]}>
        {showVerticalLines &&
          data.map((item: itemType, index: number) => {
            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  zIndex: verticalLinesZIndex || -1,
                  marginBottom: xAxisThickness,
                  height: verticalLinesUptoDataPoint
                    ? (item.value * containerHeight) / maxValue - xAxisThickness
                    : containerHeight + 15 - xAxisThickness,
                  width: verticalLinesThickness,
                  backgroundColor: verticalLinesColor,
                  bottom: 60,
                  left:
                    index * spacing + (initialSpacing - dataPointsWidth1 / 2),
                }}
              />
            );
          })}

        {showYAxisIndices &&
          data.map((item: itemType, index: number) => {
            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  height: yAxisIndicesHeight,
                  width: yAxisIndicesWidth,
                  backgroundColor: yAxisIndicesColor,
                  bottom: 60 - yAxisIndicesHeight / 2,
                  left:
                    index * spacing +
                    (initialSpacing - yAxisIndicesWidth / 2) -
                    3,
                }}
              />
            );
          })}

        {isAnimated
          ? renderAnimatedLine(
              points,
              animatedWidth,
              thickness1,
              color1,
              fillPoints,
              startFillColor1,
              endFillColor1,
              startOpacity1,
              endOpacity1,
            )
          : renderLine(
              points,
              thickness1,
              color1,
              fillPoints,
              startFillColor1,
              endFillColor1,
              startOpacity1,
              endOpacity1,
            )}
        {points2
          ? isAnimated
            ? renderAnimatedLine(
                points2,
                animatedWidth2,
                thickness2,
                color2,
                fillPoints2,
                startFillColor2,
                endFillColor2,
                startOpacity2,
                endOpacity2,
              )
            : renderLine(
                points2,
                thickness2,
                color2,
                fillPoints2,
                startFillColor2,
                endFillColor2,
                startOpacity2,
                endOpacity2,
              )
          : null}
        {points3
          ? isAnimated
            ? renderAnimatedLine(
                points3,
                animatedWidth3,
                thickness3,
                color3,
                fillPoints3,
                startFillColor3,
                endFillColor3,
                startOpacity3,
                endOpacity3,
              )
            : renderLine(
                points3,
                thickness3,
                color3,
                fillPoints3,
                startFillColor3,
                endFillColor3,
                startOpacity3,
                endOpacity3,
              )
          : null}
        {points4
          ? isAnimated
            ? renderAnimatedLine(
                points4,
                animatedWidth4,
                thickness4,
                color4,
                fillPoints4,
                startFillColor4,
                endFillColor4,
                startOpacity4,
                endOpacity4,
              )
            : renderLine(
                points4,
                thickness4,
                color4,
                fillPoints4,
                startFillColor4,
                endFillColor4,
                startOpacity4,
                endOpacity4,
              )
          : null}
        {points5
          ? isAnimated
            ? renderAnimatedLine(
                points5,
                animatedWidth5,
                thickness5,
                color5,
                fillPoints5,
                startFillColor5,
                endFillColor5,
                startOpacity5,
                endOpacity5,
              )
            : renderLine(
                points5,
                thickness5,
                color5,
                fillPoints5,
                startFillColor5,
                endFillColor5,
                startOpacity5,
                endOpacity5,
              )
          : null}
        {data.map((item: itemType, index: number) => {
          // console.log('item', item)
          return (
            <View key={index}>
              {isAnimated
                ? renderAnimatedLabel(
                    index,
                    item.label,
                    item.labelTextStyle,
                    item.labelComponent,
                  )
                : renderLabel(
                    index,
                    item.label,
                    item.labelTextStyle,
                    item.labelComponent,
                  )}
              {/* {renderLabel(index, item.label, item.labelTextStyle)} */}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
