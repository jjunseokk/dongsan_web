import styled from "styled-components";
import { px2vw } from "../../Util/px2vw";

export const CommunityContainer = styled.div`
    width: ${px2vw(430)};
    height: 100vh;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background: #f5f5f5;

    .community-form-container {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 100%;
        left: 0%;
        background: #151515db;
        z-index: 10;

        .community-form {
            width: ${px2vw(430)};
            height: 80vh;
            background: #ffffff;
            padding: ${px2vw(15)};
            border-top-right-radius: ${px2vw(10)};
            border-top-left-radius: ${px2vw(10)};
            position: absolute;
            bottom: -100%;
            left: 0px;

            .community-anonymity {
                display: flex;
                align-items: center;
                gap: ${px2vw(10)};
                > input {
                    accent-color: #427d4f;
                }
                > p {
                    color: #151515;
                    font-size: 13px;
                }
            }

            > div {
                margin-top: ${px2vw(10)};
                &:first-of-type {
                    margin-top: 0px;
                }
                textarea {
                    width: 100%;
                    height: ${px2vw(300)};
                    resize: none;
                    margin-top: ${px2vw(10)};
                    font: 600 15px "Pretendard";
                    border: 1px solid #d9d9d9;
                    border-radius: 5px;
                    padding: ${px2vw(11)};
                    &::placeholder {
                        color: #d9d9d9;
                        font: 600 15px "Pretendard";
                    }
                    &:focus {
                        outline: none;
                    }
                }
            }

            > button {
                margin-top: ${px2vw(20)};
            }
        }
        .community-form.active {
            bottom: 0%;
            transition: 0.5s all;
        }
    }
    .community-form-container.active {
        top: 0%;
    }

    > .community-wrap {
        overflow: scroll;
        height: 89%;
        margin-bottom: ${px2vw(55)};
        position: relative;

        &::-webkit-scrollbar {
            display: none;
        }

        .null {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #427d4f;
        }
        > .community-item {
            width: 100%;
            background: #fff;
            padding: ${px2vw(12)};
            margin: ${px2vw(10)} 0;
            &:first-of-type {
                margin-top: 0px;
            }

            .community-item-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .user {
                    display: flex;
                    align-items: center;
                    gap: ${px2vw(10)};

                    .user-thumbnail {
                        width: ${px2vw(50)};
                        height: ${px2vw(50)};
                        border-radius: 50%;
                        overflow: hidden;
                        > img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .user-info {
                        > p {
                            font-size: 16px;
                            font-weight: 700;
                            color: #151515;
                            &:last-of-type {
                                font-size: 14px;
                                font-weight: 400;
                                color: #8f8f8f;
                            }
                        }
                    }
                }
                .more-btn {
                    width: ${px2vw(20)};
                    text-align: center;
                    position: relative;

                    .menu {
                        width: ${px2vw(150)};
                        background: #ffffff;
                        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                        position: absolute;
                        top: 0;
                        right: ${px2vw(20)};
                        > p {
                            width: 100%;
                            height: ${px2vw(50)};
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            &:last-of-type {
                                color: red;
                            }
                        }
                    }
                }
            }
            .community-content {
                margin-top: ${px2vw(10)};

                > p {
                    white-space: pre-wrap;
                }
                > button {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    margin-top: ${px2vw(15)};
                    color: #151515;
                    font-size: 18px;
                }
            }
            .community-event {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: ${px2vw(20)};
                margin-top: ${px2vw(30)};
                position: relative;

                > div {
                    display: flex;
                    align-items: center;
                    gap: ${px2vw(10)};

                    > img {
                        width: ${px2vw(20)};
                        height: ${px2vw(20)};
                    }
                    > p {
                        color: #427d4f;
                    }
                }
            }
        }
    }
    .community-add {
        width: ${px2vw(50)};
        height: ${px2vw(50)};
        border-radius: 50%;
        background: #427d4f;
        position: absolute;
        bottom: 70px;
        right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
