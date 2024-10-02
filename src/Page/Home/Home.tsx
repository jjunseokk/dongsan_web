import { useRef, useState } from "react";
import styled from "styled-components";
import { px2vw } from "../../Util/px2vw";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import track_bg from "/assets/track_bg.png";
import next from "/assets/audio-next.png";
import prev from "/assets/audio-prev.png";
import play from "/assets/audio-play.png";
import pause from "/assets/audio-pause.png";
import heart from "/assets/heart.png";
import heart_on from "/assets/heart-active.png";
import comment from "/assets/comment.png";

const HomeContainer = styled.div`
  padding: 0 ${px2vw(24)};

  > .home-date {
    display: flex;
    align-items: center;
    gap: ${px2vw(9)};

    > p {
      color: #427d4f;
      font: 700 25px "Pretendard";
    }
    > img {
      width: ${px2vw(18)};
    }
  }
  .home-today-qt {
    font: 700 20px "Pretendard";
    margin-top: 10px;
  }
  .home-qt-track {
    width: ${px2vw(300)};
    height: ${px2vw(300)};
    border: 1px solid #427d4f;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: ${px2vw(40)};
    position: relative;
    .track-bg {
      width: ${px2vw(270)};
      height: ${px2vw(270)};
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .active {
        animation: playTrack 5s linear infinite;
      }
      .track-center-white {
        width: ${px2vw(60)};
        height: ${px2vw(60)};
        background: #ffffff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .home-qt-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: ${px2vw(30)};

    .qt-title {
      font: 700 25px "Pretendard";
    }
    .qt-chapter {
      font: 500 18px "Pretendard";
      margin-top: ${px2vw(10)};
    }
    .qt-audio-controller {
      display: flex;
      gap: ${px2vw(45)};
      align-items: center;
      margin-top: ${px2vw(30)};
      cursor: pointer;
    }
    .home-qt-activeArea {
      display: flex;
      align-items: center;
      gap: ${px2vw(40)};
      margin-top: ${px2vw(30)};
      > div {
        display: flex;
        align-items: center;
        gap: ${px2vw(5)};
        > img {
          cursor: pointer;
        }
        > p {
          color: #427d4f;
        }
      }
    }
  }

  @keyframes playTrack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Home = () => {
  const playRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHeart, setIsHeart] = useState<boolean>(false);

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
  return (
    <HomeContainer>
      <div className="home-date">
        <p>2024.09.09</p>
        <img src="/assets/home-calendar.png" alt="" />
      </div>
      <p className="home-today-qt">오늘의 묵상</p>
      <div className="home-qt-track">
        <div className="track-bg">
          <img className={isPlaying ? "active" : ""} src={track_bg} alt="" />
          <div className="track-center-white"></div>
        </div>
      </div>
      <div className="home-qt-info">
        <p className="qt-title">묵상제목</p>
        <p className="qt-chapter">잠언 12:1</p>
        <div className="qt-audio-controller">
          <img src={prev} alt="prev" />
          <img
            onClick={handlePlayPause}
            src={isPlaying ? pause : play}
            alt="play"
          />
          <img src={next} alt="next" />
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
              src={isHeart ? heart_on : heart}
              alt=""
            />
            <p>1</p>
          </div>
          <div>
            <img src={comment} alt="" />
            <p>1</p>
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

export default Home;
