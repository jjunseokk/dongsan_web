import styled from "styled-components";
import { px2vw } from "../../Util/px2vw";

export const StoryContainer = styled.div`
    width: ${px2vw(430)};
    height: 100vh;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background: #f5f5f5;

    > .story-wrap {
        overflow: scroll;
        height: 89%;
        margin-bottom: ${px2vw(55)};
        border: 1px solid red;

        &::-webkit-scrollbar {
            display: none;
        }
        > .story-item {
            width: 100%;
            background: #fff;
            padding: ${px2vw(12)};

            .story-item-container {
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
                        background: #d9d9d9;
                        border-radius: 50%;
                        overflow: hidden;
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
            }
            .story-content {
                margin-top: ${px2vw(10)};

                > p {
                    white-space: pre-wrap;
                    > button {
                        background: transparent;
                        border: none;
                    }
                }
            }
            .story-event {
                display: flex;
                justify-content: flex-end;
                gap: ${px2vw(20)};
                margin-top: ${px2vw(10)};
                >img{
                    width: ${px2vw(20)};
                    height: ${px2vw(20)};
                }
            }
        }
    }
    .story-add {
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
