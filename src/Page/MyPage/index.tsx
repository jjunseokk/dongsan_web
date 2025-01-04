import styled from "styled-components";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import { useEffect, useRef, useState } from "react";
import { PopupContainer } from "../Login";
import Input from "../../components/Input";
import Button from "../../components/Button";
import userProfileStore from "../../Store";
import { useMutation } from "@tanstack/react-query";
import { changeProfile } from "../../Api/Client";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const EditUserInfoContainer = styled.div`
  width: ${px2vw(430)};
  margin: 0 auto;
  .modal-bg {
    width: 100%;
    height: 100%;
    background-color: #4d4d4d8d;
    position: absolute;
    left: 0;
    z-index: 100;
  }
  .new-password {
    margin-top: ${px2vw(15)};
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
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: ${px2vw(40)} 0;
        cursor: pointer;
      }
    }
  }
`;

const EditUserInfo = () => {
  // 비밀번호 모달
  const [showModal, setShowModal] = useState<boolean>(false);
  // 유저 비밀번호
  const [userPw, setUserPw] = useState<string>("");
  // 새로운 비밀번호
  const [newPw, setNewPw] = useState<string>("");
  // 새로운 비밀번호 체크
  const [checkPw, setCheckPw] = useState<string>("");
  // 파일 ref
  const fileRef = useRef<any>(null);
  // 유저 프로필
  const [thumbnail, setThumbnail] = useState<string>("");
  // 유저 프로필 상태관리
  const { profile, setProfile } = userProfileStore();
  // 토큰 값 불러오기
  const [cookie, , removeCookie] = useCookies(["login"]);

  const navigate = useNavigate();

  // 유저 정보 변경
  const changeProfileMutation = useMutation({
    mutationKey: ["profileThumbnail"],
    mutationFn: (data: any) => changeProfile(data, cookie.login),
    onSuccess: (res) => {
      // 성공시 프로필 상태관리 이미지만 변경
      setProfile({ thumbnail: res.data.thumbnail });
      location.reload();
    },
  });

  // 프로필 사진 변경
  const handleGetProfile = (e: any) => {
    const { files } = e.target;
    const uploadFile = files[0];

    const reader: any = new FileReader();
    reader.readAsDataURL(uploadFile);

    reader.onloadend = () => {
      setThumbnail(reader.result);
    };

    if (uploadFile) {
      const formData = new FormData();

      formData.append("thumbnail", uploadFile);
      changeProfileMutation.mutate(formData);
    }
  };

  // 로그아웃 시 첫 화면으로
  useEffect(() => {
    if (cookie.login === undefined) {
      navigate("/home");
    }
  }, [cookie]);

  return (
    <EditUserInfoContainer>
      {showModal ? (
        <>
          <div onClick={() => setShowModal(false)} className="modal-bg"></div>
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
        </>
      ) : null}
      <BackHeader title="내 정보 수정" />
      <div className="EditUserInfo-wrap">
        <div className="profile">
          <div
            onClick={() => fileRef.current.click()}
            className="profile-thumbnail"
          >
            <img
              src={profile?.thumbnail ? profile?.thumbnail : thumbnail}
              alt=""
            />
            <img src="/assets/setting.png" alt="" />
            <input
              onChange={handleGetProfile}
              type="file"
              ref={fileRef}
              accept="image/*"
            />
          </div>
          <p>{profile?.name}</p>
        </div>

        <div className="edit-item">
          <div onClick={() => setShowModal(true)}>
            <p>비밀번호 수정</p>
            <img src="/assets/right_arrow.png" alt="" />
          </div>
          <div onClick={() => removeCookie("login")}>
            <p>로그아웃</p>
            <img src="/assets/right_arrow.png" alt="" />
          </div>
        </div>
      </div>
    </EditUserInfoContainer>
  );
};

export default EditUserInfo;
