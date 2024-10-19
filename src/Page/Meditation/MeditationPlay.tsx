import { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { MeditationContainer } from "./MeditationPlayStyle";
import { PopupContainer } from "../Login";
import Button from "../../components/Button";
import BackHeader from "../../components/BackHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import userProfileStore from "../../Store";
import { getProfile } from "../../Api/User";
import { editComments, getComments, writeComment } from "../../Api/Client";
import { comments, editCommentsType, getCommentsType } from "../../Type";
import { getMeditationDetail } from "../../Api/Admin";
import { useParams } from "react-router-dom";

const MeditationPlay = () => {
  const queryClient = useQueryClient();
  const playRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 음원 재생
  const [isHeart, setIsHeart] = useState<boolean>(false); // 좋아요 버튼
  const [showComment, setShowComment] = useState<boolean>(false); // 댓글 쓰기 팝업
  const [showEdit, setShowEdit] = useState<number | null>(null); // 수정 시 input으로 변경
  const [edit, setEdit] = useState<string>(""); // 수정 글
  const [comment, setComment] = useState<string>(""); // 댓글
  const [showModalMenu, setShowModalMenu] = useState<number | null>(null); // 수정or삭제 메뉴창
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false); // 삭제 시 팝업
  const [cookie] = useCookies(["login"]); // token 값
  const { setProfile } = userProfileStore();
  const path = useParams<any>();

  // 묵상상세
  const { data: meditationDetail, status } = useQuery({
    queryKey: ["meditationDetail"],
    queryFn: () => getMeditationDetail(Number(path?.id)),
  });

  // 댓글조회
  const { data: comments } = useQuery({
    queryKey: ["comment", status],
    queryFn: () => getComments(Number(path.id)),
  });

  // 댓글수정 뮤테이션
  const editMutation = useMutation({
    mutationKey: ["editComments"],
    mutationFn: (data: editCommentsType) => editComments(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        setShowEdit(null);
        queryClient.invalidateQueries({
          queryKey: ["comment", status],
        });
      }
    },
  });

  // 댓글달기 뮤테이션
  const writeMutation = useMutation({
    mutationKey: ["write"],
    mutationFn: (data: comments) => writeComment(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        setComment("");
        queryClient.invalidateQueries({
          queryKey: ["comment", status],
        });
      }
    },
  });

  // 음원 재생/정지
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

  // 댓글 쓰기 버튼
  const handleAddComment = () => {
    writeMutation.mutate({
      context: comment,
      meditationId: meditationDetail?.data.meditationDetail.id,
      token: cookie.login,
    });
  };

  // 댓글 수정 버튼
  const handleEditComment = (id: number) => {
    editMutation.mutate({
      id,
      context: edit,
      meditationId: meditationDetail?.data.meditationDetail.id,
    });
  };

  // 댓글 삭제 버튼
  const handleDeleteComment = () => {
    console.log("삭제");
    setShowDeletePopup(false);
  };

  // 댓글 수정시 해당 아이템에 수정 input 교체 후 내용입력.
  const handleEdit = (index: number) => {
    setShowEdit(index);
    setShowModalMenu(null);
    setEdit(comments?.data.comment[index].context);
  };

  // 프로필
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(cookie.login),
  });

  useEffect(() => {
    setProfile(profileData?.data.user as any);
  }, [status]);

  return (
    <MeditationContainer>
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
      <BackHeader title={meditationDetail?.data.meditationDetail.createDate} />
      <div className="meditation-wrap">
        <div className="meditation-qt-track">
          <div className="track-bg">
            <img
              className={isPlaying ? "active" : ""}
              src={
                meditationDetail?.data.meditationDetail
                  ? meditationDetail?.data.meditationDetail.thumbnail
                  : "/assets/track_bg.png"
              }
              alt=""
            />
            <div className="track-center-white"></div>
          </div>
        </div>
        <div className="meditation-qt-info">
          <p className="qt-title">
            {meditationDetail?.data.meditationDetail
              ? meditationDetail?.data.meditationDetail.title
              : "오늘의 묵상은 없습니다."}
          </p>
          <p className="qt-chapter">
            {meditationDetail?.data.meditationDetail
              ? meditationDetail?.data.meditationDetail.word
              : "오늘의 묵상은 없습니다."}
          </p>
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
            autoPlay={false}
            src={meditationDetail?.data.meditationDetail}
            // src="/assets/play.mp3"
            style={{ display: "none" }}
          />
          <div className="meditation-qt-activeArea">
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
              <p>{comments?.data.comment.length}</p>
            </div>
          </div>
        </div>
        <div
          className={
            showComment ? "meditation-comment active" : "meditation-comment"
          }
        >
          <div
            onClick={() => setShowComment(false)}
            className="comment-bg"
          ></div>
          <div className="comment-popup">
            <div className="popup-header">
              <p className="title">나눔</p>
              <p className="description">
                총 {comments?.data.comment.length}개의 나눔
              </p>
            </div>

            <div className="popup-body">
              {comments?.data.comment.map(
                (value: getCommentsType, index: number) => {
                  return (
                    <div key={value.commentId} className="comment-container">
                      <div className="comment-info">
                        <div>
                          <p>{value.writer}</p>
                          <p>{value.createDate}</p>
                        </div>
                        <img
                          onClick={() => setShowModalMenu(index)}
                          src="/assets/more_menu.png"
                          alt=""
                        />
                      </div>
                      {showEdit === index ? (
                        <div className="comment-edit">
                          <input
                            value={edit}
                            onChange={(e) => setEdit(e.target.value)}
                            className="edit-input"
                            type="text"
                          />
                          <div>
                            <p
                              onClick={() => handleEditComment(value.commentId)}
                            >
                              수정
                            </p>
                            <p onClick={() => setShowEdit(null)}>취소</p>
                          </div>
                        </div>
                      ) : (
                        <p>{value.context}</p>
                      )}

                      {showModalMenu === index ? (
                        profileData?.data.user.userId === value.userId ? (
                          <div className="modal-menu">
                            <p onClick={() => handleEdit(index)}>수정하기</p>
                            <p onClick={() => setShowDeletePopup(true)}>
                              삭제하기
                            </p>
                          </div>
                        ) : (
                          <div className="modal-menu">
                            <p onClick={() => console.log("ss")}>신고하기</p>
                          </div>
                        )
                      ) : null}
                    </div>
                  );
                }
              )}
            </div>
            <div className="meditation-input-area">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
              />
              <p onClick={handleAddComment}>입력</p>
            </div>
          </div>
        </div>
      </div>
    </MeditationContainer>
  );
};

export default MeditationPlay;
