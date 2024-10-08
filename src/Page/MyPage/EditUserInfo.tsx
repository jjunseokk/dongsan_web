import styled from "styled-components";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import { useRef, useState } from "react";
import { PopupContainer } from "../Login";
import Input from "../../components/Input";
import Button from "../../components/Button";

const EditUserInfoContainer = styled.div`
  .modal-bg {
    width: 100%;
    height: 100%;
    background-color: #4d4d4d8d;
    position: absolute;
    z-index: 100;
    .new-password {
      margin-top: ${px2vw(15)};
    }
  }

  .EditUserInfo-wrap {
    margin-top: ${px2vw(30)};
    .profile {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .profile-thumbnail {
        width: ${px2vw(127)};
        height: ${px2vw(127)};
        background: #d9d9d9;
        position: relative;
        border-radius: 50%;
        > img {
          &:first-of-type {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          &:nth-of-type(2) {
            position: absolute;
            bottom: 0;
            right: 0;
            width: ${px2vw(35)};
            height: ${px2vw(35)};
          }
        }
        > input {
          display: none;
        }
      }
      > p {
        &:first-of-type {
          margin-top: ${px2vw(30)};
          font: 600 25px "Pretendard";
        }
        &:nth-of-type(2) {
          font: 400 20px "Pretendard";
          margin-top: ${px2vw(10)};
        }
      }
    }
    .edit-item {
      padding: ${px2vw(13)} ${px2vw(25)};
      margin-top: ${px2vw(40)};
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`;

const EditUserInfo = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userPw, setUserPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [checkPw, setCheckPw] = useState<string>("");
  const fileRef = useRef<any>(null);
  const [thumbnail, setThumbnail] = useState("");

  const handleGetProfile = (e: any) => {
    const { files } = e.target;
    const uploadFile = files[0];

    console.log(uploadFile);

    const reader: any = new FileReader();
    reader.readAsDataURL(uploadFile);

    reader.onloadend = () => {
      setThumbnail(reader.result);
    };
  };

  return (
    <EditUserInfoContainer>
      {showModal ? (
        <div onClick={() => setShowModal(false)} className="modal-bg">
          <PopupContainer>
            <Input
              title="현재 비밀번호"
              placeholder="현재 비밀번호"
              setValue={setUserPw}
              value={userPw}
              type="password"
              width={px2vw(309)}
            />

            <div className="new-password">
              <Input
                title="새로운 비밀번호"
                placeholder="새로운 비밀번호"
                setValue={setNewPw}
                value={newPw}
                type="password"
                width={px2vw(309)}
              />
              <Input
                title="none"
                placeholder="비밀번호 확인"
                setValue={setCheckPw}
                value={checkPw}
                type="password"
                width={px2vw(309)}
              />
            </div>
            <Button
              context="추가"
              color="#427D4F"
              borderColor="#427D4F"
              onClick={() => console.log("ss")}
            />
          </PopupContainer>
        </div>
      ) : null}
      <BackHeader title="내 정보 수정" />
      <div className="EditUserInfo-wrap">
        <div className="profile">
          <div
            onClick={() => fileRef.current.click()}
            className="profile-thumbnail"
          >
            <img src={thumbnail} alt="" />
            <img src="/assets/setting.png" alt="" />
            <input onChange={handleGetProfile} type="file" ref={fileRef} />
          </div>
          <p>박준석</p>
          <p>청년</p>
        </div>

        <div onClick={() => setShowModal(true)} className="edit-item">
          <div>
            <p>비밀번호 수정</p>
            <img src="/assets/right_arrow.png" alt="" />
          </div>
        </div>
      </div>
    </EditUserInfoContainer>
  );
};

export default EditUserInfo;
