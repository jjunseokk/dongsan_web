import BottomMenu from "../../components/BottomMenu";
import BackHeader from "../../components/BackHeader";
import { StoryContainer } from "./storyStyle";
import { useNavigate } from "react-router-dom";

const Story = () => {
    const navigate = useNavigate();
    const content =
        "안녕하세요. 저는 아무개입니다. 오늘은 날씨가 좋네요. 우리가 할 수 있는 일이라곤 많지 않지만, 그래도 뭔가를 해보려고 합니다.";

    const truncatedContent = content.length > 20 ? content.slice(0, 20) + "..." : content;

    return (
        <StoryContainer>
            <BackHeader backHandle={false} title="커뮤니티" />

            <div className="story-wrap">
                <div className="story-item">
                    <div className="story-item-container">
                        <div className="user">
                            <div className="user-thumbnail">
                                <img src="" alt="" />
                            </div>
                            <div className="user-info">
                                <p>아무개</p>
                                <p>2월 27일</p>
                            </div>
                        </div>
                        <img src="/assets/more_menu.png" alt="" />
                    </div>

                    <div className="story-content">
                        <p>
                            {truncatedContent}
                            {content.length > 20 && (
                                <button onClick={() => navigate(`/story/${1}/detail`)}>더보기</button>
                            )}
                        </p>
                    </div>
                    <div className="story-event">
                        <img src="/assets/heart.png" alt="" />
                        <img src="/assets/comment.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="story-add">
                <img src="/assets/plus.png" alt="" />
            </div>
            <BottomMenu />
        </StoryContainer>
    );
};

export default Story;
