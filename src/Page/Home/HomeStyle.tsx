import styled from "styled-components";
import { px2vw } from "../../Util/px2vw";

export const HomeContainer = styled.div`
    width: ${px2vw(430)};
    margin: 0 auto;
    height: calc(100dvh - 56px);
    position: relative;
    overflow: hidden;
    .alert {
        width: 100%;
        height: 100%;
        position: absolute;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        > p {
            &:first-of-type {
                font-size: 20px;
            }
            font-size: 15px;
        }
        > img {
            width: 50%;
        }
    }

    > .home-wrap {
        padding: 0 ${px2vw(24)};

        > .home-date {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: ${px2vw(30)};

            > p {
                color: #427d4f;
                font: 700 25px "Pretendard";
            }
            > .home-myPage {
                width: ${px2vw(30)};
                cursor: pointer;
            }
        }

        .home-today-qt {
            font: 700 20px "Pretendard";
            margin-top: 10px;
        }
        .home-meditation-none {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            > p {
                width: 100%;
                color: #427d4f;
                font-size: 17px;
                font-weight: 700;
                text-align: center;
                margin: ${px2vw(5)} 0px;
            }
            > button {
                margin-top: ${px2vw(20)};
            }
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
                display: flex;
                justify-content: center;
                align-items: center;

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

            .home-audio-time {
                font: 400 16px "Pretendard";
                margin-top: ${px2vw(20)};
            }
            > input {
                width: 100%;
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
                        width: ${px2vw(25)};
                    }
                    > p {
                        color: #427d4f;
                        font: 400 18px "Pretendard";
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
                height: ${px2vw(600)};
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
                    height: ${px2vw(430)};
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
                                border: 1px solid #427d4f;
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
                    position: absolute;
                    width: ${px2vw(390)};
                    height: ${px2vw(60)};
                    border-radius: 10px;
                    border: 1px solid #427d4f;
                    bottom: ${px2vw(5)};
                    left: 50%;
                    transform: translate(-50%, 0%);
                    > textarea {
                        width: ${px2vw(345)};
                        height: ${px2vw(55)};
                        display: block;
                        border: none;
                        padding-left: ${px2vw(10)};
                        background: none;
                        resize: none;
                        padding: ${px2vw(10)};
                        font-size: 16px;
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
    }

    @keyframes playTrack {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes flowing {
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }
    }
`;
