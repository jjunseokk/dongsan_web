import styled from "styled-components";
import { px2vw } from "../../Util/px2vw";

export const HomeContainer = styled.div`
  padding: 0 ${px2vw(24)};
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  > .home-date {
    display: flex;
    align-items: center;
    gap: ${px2vw(9)};
    margin-top: ${px2vw(30)};

    > p {
      color: #427d4f;
      font: 700 25px "Pretendard";
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

  .home-comment {
    .comment-bg {
      position: absolute;
      bottom: -100%;
      left: 0px;
      width: 100%;
      height: 100%;
      transition: all 0.5s;
    }
    .comment-popup {
      position: absolute;
      bottom: -100%;
      left: 0px;
      width: ${px2vw(430)};
      height: ${px2vw(495)};
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      border: 1px solid #427d4f;
      background-color: #ffffff;
      transition: all 0.5s;
    }
  }
  .home-comment.active {
    .comment-bg {
      bottom: 0px;
      transition: all 0.5s;
    }
    .comment-popup {
      bottom: 0px;
      transition: all 0.5s;
      z-index: 10;
      > .popup-header {
        border-bottom: 1px solid #ababab;
        padding: ${px2vw(20)};
        > .title {
          font: 600 25px "Pretendard";
        }
        > .description {
          font: 400 15px "Pretendard";
          color: #888888;
          margin-top: ${px2vw(5)};
        }
      }
      > .popup-body {
        height: ${px2vw(340)};
        overflow: scroll;
        &::-webkit-scrollbar {
          display: none;
        }

        .comment-container {
          padding: ${px2vw(20)};
          border-bottom: 1px solid #ababab;
          position: relative;
          > .comment-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            > div {
              display: flex;
              align-items: center;
              gap: ${px2vw(10)};
              > p {
                font: 400 15px "Pretendard";
                color: #427d4f;
                &:last-of-type {
                  color: #888888;
                }
              }
            }
          }
          > .comment-edit {
            .edit-input {
              width: 100%;
              height: ${px2vw(35)};
              margin-top: ${px2vw(10)};
              font: 400 15px "Pretendard";
              padding-left: ${px2vw(5)};
            }
            > div {
              display: flex;
              justify-content: end;
              gap: ${px2vw(10)};
              margin-top: ${px2vw(10)};
              > p {
                color: #427d4f;
                &:last-of-type {
                  color: #ff1919;
                }
              }
            }
          }

          > p {
            font: 400 15px "Pretendard";
            margin-top: ${px2vw(10)};
          }
          .modal-menu {
            width: ${px2vw(116)};
            height: ${px2vw(84)};
            box-shadow: 1px 1px 5px 1px #00000040;
            border-radius: 5px;
            position: absolute;
            top: 70%;
            right: ${px2vw(25)};
            transform: translate(0%, -50%);
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            > p {
              width: 100%;
              padding: ${px2vw(10)};
              text-align: center;
              &:last-of-type {
                color: #ff1919;
              }
            }
          }
        }
      }
      > .home-input-area {
        position: relative;
        width: ${px2vw(390)};
        margin: 0 auto;
        margin-top: ${px2vw(10)};
        height: ${px2vw(34)};
        border-radius: 10px;
        border: 1px solid #427d4f;
        > input {
          width: ${px2vw(345)};
          height: ${px2vw(34)};
          display: block;
          border: none;
          padding-left: ${px2vw(10)};
          background: none;
          &:focus {
            outline: none;
          }
        }
        > p {
          position: absolute;
          top: 50%;
          right: ${px2vw(10)};
          transform: translate(0%, -50%);
          font-size: 15px;
          font-weight: 500;
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
