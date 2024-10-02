import { useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { HomeContainer } from "./HomeStyle";
import { PopupContainer } from "../Login/Login";
import Button from "../../components/Button";

const Home = () => {
  const playRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHeart, setIsHeart] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [edit, setEdit] = useState<string>(
    "오늘 묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.오늘 묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다."
  );
  const [showModalMenu, setShowModalMenu] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

  const handlePlayPause = () => {
    const audioElement = playRef.current.audio.current;

    if (isPlaying) {
      audioElement.pause(); // 재생 중이면 정지
      setIsPlaying(false); // 상태를 정지로 변경
    } else {
      audioElement.play(); // 정지 중이면 재생
      setIsPlaying(true); // 상태를 재생으로 변경
    }
  };

  const handleEdit = () => {
    console.log("수정");
  };

  const handleDeleteComment = () => {
    console.log("삭제");
    setShowDeletePopup(false);
  };

  return (
    <HomeContainer>
      {showDeletePopup ? (
        <PopupContainer>
          <p>삭제하시겠습니까?</p>
          <Button
            context="확인"
            color="#427d4f"
            onClick={handleDeleteComment}
            borderColor="#427d4f"
          />
        </PopupContainer>
      ) : null}
      <div className="home-date">
        <p>2024.09.09</p>
        <img src="/assets/home-calendar.png" alt="" />
      </div>
      <p className="home-today-qt">오늘의 묵상</p>
      <div className="home-qt-track">
        <div className="track-bg">
          <img
            className={isPlaying ? "active" : ""}
            src="/assets/track_bg.png"
            alt=""
          />
          <div className="track-center-white"></div>
        </div>
      </div>
      <div className="home-qt-info">
        <p className="qt-title">묵상제목</p>
        <p className="qt-chapter">잠언 12:1</p>
        <div className="qt-audio-controller">
          <img src="/assets/audio-prev.png" alt="prev" />
          <img
            onClick={handlePlayPause}
            src={
              isPlaying ? "/assets/audio-pause.png" : "/assets/audio-play.png"
            }
            alt="play"
          />
          <img src="/assets/audio-next.png" alt="next" />
        </div>
        <AudioPlayer
          ref={playRef}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          showSkipControls={true}
          showJumpControls={false}
          // src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
          src="/assets/play.mp3"
          style={{ display: "none" }}
        />
        <div className="home-qt-activeArea">
          <div>
            <img
              onClick={() => setIsHeart(!isHeart)}
              src={isHeart ? "/assets/heart-active.png" : "/assets/heart.png"}
              alt=""
            />
            <p>1</p>
          </div>
          <div onClick={() => setShowComment(true)}>
            <img src="/assets/comment.png" alt="" />
            <p>1</p>
          </div>
        </div>
      </div>
      <div className={showComment ? "home-comment active" : "home-comment"}>
        <div onClick={() => setShowComment(false)} className="comment-bg"></div>
        <div className="comment-popup">
          <div className="popup-header">
            <p className="title">나눔</p>
            <p className="description">총 2개의 나눔</p>
          </div>

          <div className="popup-body">
            <div className="comment-container">
              <div className="comment-info">
                <div>
                  <p>박준석</p>
                  <p>2024-02-04</p>
                </div>
                <img
                  onClick={() => setShowModalMenu(true)}
                  src="/assets/more_menu.png"
                  alt=""
                />
              </div>
              {showEdit ? (
                <div className="comment-edit">
                  <input
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                    className="edit-input"
                    type="text"
                  />
                  <div>
                    <p onClick={handleEdit}>수정</p>
                    <p onClick={() => setShowEdit(false)}>취소</p>
                  </div>
                </div>
              ) : (
                <p>
                  오늘 묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.오늘
                  묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.
                </p>
              )}

              {showModalMenu ? (
                <div className="modal-menu">
                  <p
                    onClick={() => {
                      setShowEdit(true);
                      setShowModalMenu(false);
                    }}
                  >
                    수정하기
                  </p>
                  <p onClick={() => setShowDeletePopup(true)}>삭제하기</p>
                </div>
              ) : null}
            </div>
            <div className="comment-container">
              <div className="comment-info">
                <div>
                  <p>박준석</p>
                  <p>2024-02-04</p>
                </div>
                <img
                  onClick={() => setShowModalMenu(true)}
                  src="/assets/more_menu.png"
                  alt=""
                />
              </div>
              {showEdit ? (
                <div className="comment-edit">
                  <input
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                    className="edit-input"
                    type="text"
                  />
                  <div>
                    <p onClick={handleEdit}>수정</p>
                    <p onClick={() => setShowEdit(false)}>취소</p>
                  </div>
                </div>
              ) : (
                <p>
                  오늘 묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.오늘
                  묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.
                </p>
              )}

              {showModalMenu ? (
                <div className="modal-menu">
                  <p
                    onClick={() => {
                      setShowEdit(true);
                      setShowModalMenu(false);
                    }}
                  >
                    수정하기
                  </p>
                  <p onClick={() => setShowDeletePopup(true)}>삭제하기</p>
                </div>
              ) : null}
            </div>
            <div className="comment-container">
              <div className="comment-info">
                <div>
                  <p>박준석</p>
                  <p>2024-02-04</p>
                </div>
                <img
                  onClick={() => setShowModalMenu(true)}
                  src="/assets/more_menu.png"
                  alt=""
                />
              </div>
              {showEdit ? (
                <div className="comment-edit">
                  <input
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                    className="edit-input"
                    type="text"
                  />
                  <div>
                    <p onClick={handleEdit}>수정</p>
                    <p onClick={() => setShowEdit(false)}>취소</p>
                  </div>
                </div>
              ) : (
                <p>
                  오늘 묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.오늘
                  묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.
                </p>
              )}

              {showModalMenu ? (
                <div className="modal-menu">
                  <p
                    onClick={() => {
                      setShowEdit(true);
                      setShowModalMenu(false);
                    }}
                  >
                    수정하기
                  </p>
                  <p onClick={() => setShowDeletePopup(true)}>삭제하기</p>
                </div>
              ) : null}
            </div>
            <div className="comment-container">
              <div className="comment-info">
                <div>
                  <p>박준석</p>
                  <p>2024-02-04</p>
                </div>
                <img
                  onClick={() => setShowModalMenu(true)}
                  src="/assets/more_menu.png"
                  alt=""
                />
              </div>
              {showEdit ? (
                <div className="comment-edit">
                  <input
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                    className="edit-input"
                    type="text"
                  />
                  <div>
                    <p onClick={handleEdit}>수정</p>
                    <p onClick={() => setShowEdit(false)}>취소</p>
                  </div>
                </div>
              ) : (
                <p>
                  오늘 묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.오늘
                  묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.
                </p>
              )}

              {showModalMenu ? (
                <div className="modal-menu">
                  <p
                    onClick={() => {
                      setShowEdit(true);
                      setShowModalMenu(false);
                    }}
                  >
                    수정하기
                  </p>
                  <p onClick={() => setShowDeletePopup(true)}>삭제하기</p>
                </div>
              ) : null}
            </div>
            <div className="comment-container">
              <div className="comment-info">
                <div>
                  <p>박준석</p>
                  <p>2024-02-04</p>
                </div>
                <img
                  onClick={() => setShowModalMenu(true)}
                  src="/assets/more_menu.png"
                  alt=""
                />
              </div>
              {showEdit ? (
                <div className="comment-edit">
                  <input
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                    className="edit-input"
                    type="text"
                  />
                  <div>
                    <p onClick={handleEdit}>수정</p>
                    <p onClick={() => setShowEdit(false)}>취소</p>
                  </div>
                </div>
              ) : (
                <p>
                  오늘 묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.오늘
                  묵상으로 하루를 열심히 살아갈 수 있을 것 같습니다.
                </p>
              )}

              {showModalMenu ? (
                <div className="modal-menu">
                  <p
                    onClick={() => {
                      setShowEdit(true);
                      setShowModalMenu(false);
                    }}
                  >
                    수정하기
                  </p>
                  <p onClick={() => setShowDeletePopup(true)}>삭제하기</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="home-input-area">
            <input type="text" />
            <p>입력</p>
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

export default Home;
