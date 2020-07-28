import React from 'react';
import Svg, {LinearGradient, Defs, Stop, Rect} from 'react-native-svg';

interface Props {
  rounded: boolean;
}

// TODO: Replace named export with the default export (also in other files).
// Keep the const name the same as the file name. In that case auto import will work the same.
export const ImageShadow: React.FC<Props> = ({rounded}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 400 225">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="transparent" stopOpacity="0" />
          <Stop offset="1" stopColor="black" stopOpacity="0.9" />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#grad)"
        rx={rounded ? '5' : '0'}
        ry={rounded ? '5' : '0'}
      />
    </Svg>
  );
};
