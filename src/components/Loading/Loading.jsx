import LoadingSVG from "../../assets/animations/loading.svg";

import styled from "styled-components";

const LoadingBox = styled.div`
  width: ${(props) => props.width || "auto"};
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 90%;
    height: 90%;
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
