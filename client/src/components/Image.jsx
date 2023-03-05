import { imagesURL } from "../api";

const Image = ({ src, ...rest }) => {
  return <img {...rest} src={imagesURL + `/${src}`} />;
};

export default Image;
