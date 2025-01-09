import styled from "styled-components";
import BottomMenu from "../../components/BottomMenu";
import { px2vw } from "../../Util/px2vw";
import BackHeader from "../../components/BackHeader";

const StoryContainer = styled.div`
  width: ${px2vw(430)};
  margin: 0 auto;
  > .story-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    > p {
      font: 700 20px "Pretendard";
      color: #427d4f;
    }
  }
`;

const Story = () => {
  return (
    <StoryContainer>
      <BackHeader backHandle={false} title="사연" />

      <div className="story-wrap">
        <p>준비중입니다.</p>
        <p>빠른 시일 내에 만나요!</p>
      </div>

      <BottomMenu />
    </StoryContainer>
  );
};

export default Story;
