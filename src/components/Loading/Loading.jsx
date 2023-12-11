import LoadingSVG from "../../assets/animations/loading.svg";

import styled from "styled-components";

const LoadingBox = styled.div`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  position: relative;
  -webkit-backdrop-filter: blur(5px);
  position: fixed;
  z-index: 1000000;

  img {
    width: 55px;
  }
`;

const Loading = (props) => {
  return (
    <LoadingBox width={props.width} height={props.height}>
      <img src={LoadingSVG}></img>
    </LoadingBox>
  );
};

export default Loading;
