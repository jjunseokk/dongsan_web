import { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { HomeContainer } from "./HomeStyle";
import { PopupContainer } from "../Login";
import Button from "../../components/Button";
import BottomMenu from "../../components/BottomMenu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteComments,
  editComments,
  getComments,
  getTodayMeditation,
  showHeart,
  writeComment,
} from "../../Api/Client";
import {
  comments,
  deleteCommentsType,
  DeletePopupState,
  editCommentsType,
  getCommentsType,
  showHeartType,
} from "../../Type";
import { useCookies } from "react-cookie";
import { getProfile } from "../../Api/User";
import userProfileStore from "../../Store";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const date = new Date(); //현재 시간
  const currentDate = date.toLocaleDateString("en-CA"); // 현재시간 형식 변경 YYYY-MM-DD
  const queryClient = useQueryClient();
  const playRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const modalRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 음원 재생
  const [showComment, setShowComment] = useState<boolean>(false); // 댓글 쓰기 팝업
  const [showEdit, setShowEdit] = useState<number | null>(null); // 수정 시 input으로 변경
  const [edit, setEdit] = useState<string>(""); // 수정 글
  const [comment, setComment] = useState<string>(""); // 댓글
  const [showModalMenu, setShowModalMenu] = useState<number | null>(null); // 수정or삭제 메뉴창
  const [showDeletePopup, setShowDeletePopup] = useState<DeletePopupState>({
    id: null,
    isOpen: false,
  }); // 삭제 시 팝업
  const [currentTime, setCurrentTime] = useState(0); // 현재시간
  const [duration, setDuration] = useState(0); // 총시간
  const [cookie] = useCookies(["login"]); // token 값
  const { setProfile } = userProfileStore(); //상태관리에서 프로필 불러오기

  // 오늘의 묵상
  const { data: todayMeditation, status } = useQuery({
    queryKey: ["today"],
    queryFn: () => getTodayMeditation(currentDate),
  });

  // 댓글조회
  const { data: comments } = useQuery({
    queryKey: ["comment", status],
    queryFn: () => getComments(todayMeditation?.data?.today?.id),
  });

  // 좋아요 뮤테이션
  const heartMutation = useMutation({
    mutationKey: ["heart"],
    mutationFn: (data: showHeartType) => showHeart(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["today"],
        });
      }
    },
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

  // 댓글삭제 뮤테이션
  const deleteMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (data: deleteCommentsType) => deleteComments(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        setShowDeletePopup({
          id: null,
          isOpen: false,
        });
        queryClient.invalidateQueries({
          queryKey: ["comment", status],
        });
      }
    },
  });

  // 좋아요 버튼
  const handleHeart = () => {
    heartMutation.mutate({
      meditationId: todayMeditation?.data.today.id,
      token: cookie.login,
    });
  };

  // 현재 시간 업데이트 함수
  const handleTimeUpdate = () => {
    if (playRef.current?.audio?.current) {
      const audio = playRef.current.audio.current;
      setCurrentTime(audio.currentTime);
    }
  };

  // 오디오 로드 시 전체 길이 가져오기
  const handleLoadedMetaData = () => {
    if (playRef.current?.audio?.current) {
      const audio = playRef.current.audio.current;
      setDuration(audio.duration);
    }
  };

  // 시간 포맷팅 함수
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

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

  // 10초 앞으로
  const handleJumpForward = () => {
    if (playRef.current?.audio?.current) {
      playRef.current.audio.current.currentTime += 10; // 10초 앞으로
    }
  };

  // 10초 뒤로
  const handleJumpBackward = () => {
    if (playRef.current?.audio?.current) {
      playRef.current.audio.current.currentTime -= 10; // 10초 뒤로
    }
  };

  // 댓글 쓰기 버튼
  const handleAddComment = () => {
    writeMutation.mutate({
      context: comment,
      meditationId: todayMeditation?.data?.today.id,
      token: cookie.login,
    });
  };

  // 댓글 수정 버튼
  const handleEditComment = (id: number) => {
    editMutation.mutate({
      id,
      context: edit,
      meditationId: todayMeditation?.data?.today.id,
    });
  };
  // 댓글 삭제 버튼
  const handleDeleteComment = () => {
    deleteMutation.mutate({
      id: Number(showDeletePopup.id),
      meditationId: todayMeditation?.data?.today.id,
    });
  };

  // 댓글 수정시 해당 아이템에 수정 input 교체 후 내용입력.
  const handleEdit = (index: number) => {
    setShowEdit(index);
    setShowModalMenu(null);
    setEdit(comments?.data.comment[index].context);
  };

  // 프로필
  const { data: profileData, status: profileStatus } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(cookie.login),
  });

  useEffect(() => {
    setProfile(profileData?.data.user as any);
  }, [profileStatus]);

  useEffect(() => {
    const audioElement = playRef.current?.audio?.current;

    if (todayMeditation?.data?.today?.music) {
      // 음악 파일이 설정되었을 때, 자동으로 재생하지 않도록 pause
      audioElement.pause();
      setIsPlaying(false);
    }
  }, [todayMeditation?.data?.today?.music]);

  useEffect(() => {
    if (!cookie.login) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModalMenu(null);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <HomeContainer>
      {showDeletePopup.isOpen ? (
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
      <div className="home-wrap">
        <div className="home-date">
          <p>{todayMeditation?.data?.today?.createDate}</p>
          <img
            onClick={() => navigate("/myPage")}
            className="home-myPage"
            src="/assets/setting-solid.png"
            alt=""
          />
        </div>
        {todayMeditation?.data.today ? (
          <>
            <p className="home-today-qt">오늘의 묵상</p>
            <div className="home-qt-track">
              <div className="track-bg">
                <img
                  className={isPlaying ? "active" : ""}
                  src={
                    todayMeditation?.data.today
                      ? todayMeditation?.data?.today?.thumbnail
                      : "/assets/track_bg.png"
                  }
                  alt=""
                />
                <div className="track-center-white"></div>
              </div>
            </div>
            <div className="home-qt-info">
              <p className="qt-title">{todayMeditation?.data?.today?.title}</p>
              <p className="qt-chapter">{todayMeditation?.data?.today?.word}</p>

              <AudioPlayer
                ref={playRef}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onListen={handleTimeUpdate}
                onLoadedMetaData={handleLoadedMetaData}
                showSkipControls={false}
                showJumpControls={true}
                autoPlay={false}
                src={todayMeditation?.data?.today?.music}
                style={{ display: "none" }}
              />

              <div className="qt-audio-controller">
                <img
                  onClick={handleJumpBackward}
                  src="/assets/audio-prev.png"
                  alt="prev"
                />
                <img
                  onClick={handlePlayPause}
                  src={
                    isPlaying
                      ? "/assets/audio-pause.png"
                      : "/assets/audio-play.png"
                  }
                  alt="play"
                />
                <img
                  onClick={handleJumpForward}
                  src="/assets/audio-next.png"
                  alt="next"
                />
              </div>

              <span className="home-audio-time">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="home-qt-activeArea">
                <div>
                  <img
                    onClick={handleHeart}
                    src={
                      todayMeditation?.data?.heart.some(
                        (item: any) =>
                          item.userId === profileData?.data.user.userId
                      )
                        ? "/assets/heart-active.png"
                        : "/assets/heart.png"
                    }
                    alt=""
                  />
                  <p>{todayMeditation?.data?.heart?.length}</p>
                </div>
                <div onClick={() => setShowComment(true)}>
                  <img src="/assets/comment.png" alt="" />
                  <p>{comments?.data.totalCount}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="home-meditation-none">
              <p>오늘 묵상은 없습니다.</p>
              <p>지난 묵상을 들어보시는건 어떨까요?</p>
              <Button
                context="지난 묵상 듣기"
                color="#427d4f"
                onClick={() => navigate("/meditation")}
                borderColor="#427d4f"
              />
            </div>
          </>
        )}

        <div className={showComment ? "home-comment active" : "home-comment"}>
          <div onClick={() => setShowComment(false)} className="comment-bg" />
          <div className="comment-popup">
            <div className="popup-header">
              <p className="title">나눔</p>
              <p className="description">
                총 {comments?.data.totalCount}개의 나눔
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
                        value.context
                          .split("\n")
                          .map((context) => (
                            <p key={Math.random()}>{context}</p>
                          ))
                      )}

                      {showModalMenu === index ? (
                        profileData?.data.user.userId === value.userId ? (
                          <div className="modal-menu" ref={modalRef}>
                            <p onClick={() => handleEdit(index)}>수정하기</p>
                            <p
                              onClick={() =>
                                setShowDeletePopup({
                                  id: value.commentId,
                                  isOpen: true,
                                })
                              }
                            >
                              삭제하기
                            </p>
                          </div>
                        ) : null
                      ) : // (
                      //   <div className="modal-menu" ref={modalRef}>
                      //     <p onClick={() => console.log("ss")}>신고하기</p>
                      //   </div>
                      // )
                      null}
                    </div>
                  );
                }
              )}
            </div>
            <div className="home-input-area">
              <textarea
                ref={inputRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <p onClick={handleAddComment}>입력</p>
            </div>
          </div>
        </div>
      </div>

      <BottomMenu />
    </HomeContainer>
  );
};

export default Home;
