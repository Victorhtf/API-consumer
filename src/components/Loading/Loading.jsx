import LoadingSVG from "../../assets/animations/loading.svg";

import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 55px;
  }
`;

const Loading = () => {
  return (
    <Box className="loading-container">
      <img src={LoadingSVG}></img>
    </Box>
  );
};

export default Loading;
