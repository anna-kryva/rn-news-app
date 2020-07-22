import React from 'react';
import Svg, {LinearGradient, Defs, Stop, Rect} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  children?: React.ReactChild;
}

export const ImageShadow: React.FC<Props> = ({width, height, children}) => {
  return (
    <Svg height={height ?? '100%'} width={width ?? '100%'}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="transparent" stopOpacity="0" />
          <Stop offset="1" stopColor="black" stopOpacity="0.5" />
        </LinearGradient>
        {children}
      </Defs>
      <Rect
        x="0"
        y="0"
        width={width ?? '100%'}
        height={height ?? '100%'}
        fill="url(#grad)"
        rx="5"
        ry="5"
      />
    </Svg>
  );
};
