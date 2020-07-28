import React from 'react';
import Svg, {Path} from 'react-native-svg';

// TODO: Rename SvgIcon to something more meaningful.
export const SvgIcon: React.FC = () => {
  return (
    <Svg width="45" height="45" viewBox="0 0 32 32" fill="black">
      <Path
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm3.079-11.003c0 1.615-1.332 2.499-3.087 2.499-1.635 0-3.632-.792-4.873-2.407L9 23.649C10.03 25.811 13.207 27 15.931 27c3.965 0 7.083-2.438 7.083-6.033 0-7.1-9.595-5.698-9.595-10.117 0-1.401 1.12-2.346 2.966-2.346 1.695 0 2.724.58 3.753 1.585l1.998-2.804C20.865 5.884 18.686 5 16.083 5c-4.117 0-6.599 2.681-6.599 5.88 0 6.948 9.595 5.912 9.595 10.117z"
        fillRule="evenodd"
      />
    </Svg>
  );
};
