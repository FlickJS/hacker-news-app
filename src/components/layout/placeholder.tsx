import React from "react";
import ContentLoader from "react-content-loader";

interface PlaceholderProps {
  speed?: number;
  width?: string | number;
  height?: number;
  viewBox?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  uniqueKey?: string;
  [key: string]: any;
}

const Placeholder: React.FC<PlaceholderProps> = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height={props.height}
    viewBox={props.viewBox}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    uniqueKey="key-placeholder"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />
    <rect x="0" y="30" rx="5" ry="5" width="90%" height="15" />
    <rect x="0" y="60" rx="5" ry="5" width="95%" height="15" />
    <rect x="0" y="90" rx="5" ry="5" width="85%" height="15" />
    <rect x="0" y="120" rx="5" ry="5" width="80%" height="15" />
  </ContentLoader>
);

export default Placeholder;
