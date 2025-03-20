import styled from "styled-components";
import { px2vw } from "../Util/px2vw";

interface BackHeaderType {
    title: string;
    backHandle?: boolean;
}

const BackHeaderContainer = styled.div`
    position: relative;
    width: 100%;
    height: ${px2vw(50)};
    border-bottom: 1px solid #d9d9d9;
    background: #ffff;
    > img {
        position: absolute;
        top: ${px2vw(11)};
        left: ${px2vw(12)};
        cursor: pointer;
    }
    > p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        font-weight: 600;
    }
`;

const BackHeader = ({ title, backHandle }: BackHeaderType) => {
    return (
        <BackHeaderContainer>
            {backHandle === false ? null : (
                <img onClick={() => history.back()} src="/assets/arrow_back.png" alt="back-arrow" />
            )}

            <p>{title}</p>
        </BackHeaderContainer>
    );
};

export default BackHeader;
