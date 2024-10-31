import styled from "styled-components";
import BottomMenu from "../../components/BottomMenu";
import { px2vw } from "../../Util/px2vw";

const StoryContainer = styled.div`
  width: ${px2vw(430)};
  margin: 0 auto;
`;

const Story = () => {
  return (
    <StoryContainer>
      <BottomMenu />
    </StoryContainer>
  );
};

export default Story;
