import LoadingSVG from "../../assets/animations/loading.svg";

import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  position: relative;
  -webkit-backdrop-filter: blur(5px);

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
