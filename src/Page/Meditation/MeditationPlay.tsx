import { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import { useDemoAudio } from "../../demo/useDemoAudio";
import "react-h5-audio-player/lib/styles.css";
import { MeditationContainer } from "./MeditationPlayStyle";
import { PopupContainer } from "../Login";
import Button from "../../components/Button";
import BackHeader from "../../components/BackHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import userProfileStore from "../../Store/userProfile";
import {
    deleteComments,
    editComments,
    getComments,
    // showHeart,
    writeComment,
} from "../../Api/Client";
import {
    comments,
    deleteCommentsType,
    DeletePopupState,
    editCommentsType,
    getCommentsType,
    // showHeartType,
} from "../../Type";
import { getMeditationDetail } from "../../Api/Admin";
import { useNavigate, useParams } from "react-router-dom";

const MeditationPlay = () => {
    const queryClient = useQueryClient();
    const playRef = useRef<any>(null);
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
    const [isError, setIsError] = useState(false); // 에러 상태
    const [cookie, _, removeCookie] = useCookies(["login"]); // token 값
    const { profile } = userProfileStore(); // 프로필 상태 관리 불러오기
    const path = useParams<any>(); //path값 가져오기
    const navigate = useNavigate();

    // 묵상상세
    const { data: meditationDetail } = useQuery({
        queryKey: ["meditationDetail", path.id],
        queryFn: () => getMeditationDetail(Number(path?.id)),
    });

    const audioSource = useDemoAudio(meditationDetail?.data?.meditationDetail?.music);

    // 댓글조회
    const { data: comments } = useQuery({
        queryKey: ["comment", path.id],
        queryFn: () => getComments(Number(path.id)),
    });

    // // 좋아요 뮤테이션
    // const heartMutation = useMutation({
    //     mutationKey: ["heart"],
    //     mutationFn: (data: showHeartType) => showHeart(data),
    //     onSuccess: (res) => {
    //         if (res.status === 200) {
    //             queryClient.invalidateQueries({
    //                 queryKey: ["meditationDetail"],
    //             });
    //         }
    //     },
    //     onError: (err: any) => {
    //         console.log(err);
    //         if (err.response?.status === 500) {
    //             setIsError(true);
    //         }
    //     },
    // });

    // 댓글수정 뮤테이션
    const editMutation = useMutation({
        mutationKey: ["editComments"],
        mutationFn: (data: editCommentsType) => editComments(data),
        onSuccess: (res) => {
            if (res.status === 200) {
                setShowEdit(null);
                queryClient.invalidateQueries({
                    queryKey: ["comment", path.id],
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
                    queryKey: ["comment", path.id],
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
                    queryKey: ["comment", path.id],
                });
            }
        },
    });

    // // 좋아요 버튼
    // const handleHeart = () => {
    //     heartMutation.mutate({
    //         meditationId: Number(path?.id),
    //         token: cookie.login,
    //     });
    // };

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
            audioElement.play().catch(() => { setIsPlaying(false); window.dispatchEvent(new CustomEvent('demo-error', { detail: '음원을 재생할 수 없습니다. 다시 시도해주세요.' })); }); // 사용자 조작으로 재생
            setIsPlaying(true); // 상태를 재생으로 변경
        }
    };

    // 10초 앞으로
    const handleJumpForward = () => {
        const audio = playRef.current?.audio?.current as HTMLAudioElement | undefined;
        if (!audio || !Number.isFinite(audio.duration)) return;
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        setCurrentTime(audio.currentTime);
    };

    // 10초 뒤로
    const handleJumpBackward = () => {
        const audio = playRef.current?.audio?.current as HTMLAudioElement | undefined;
        if (!audio || !Number.isFinite(audio.duration)) return;
        audio.currentTime = Math.max(0, audio.currentTime - 10);
        setCurrentTime(audio.currentTime);
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
        deleteMutation.mutate({
            id: Number(showDeletePopup.id),
            meditationId: meditationDetail?.data.meditationDetail.id,
        });
    };

    // 댓글 수정시 해당 아이템에 수정 input 교체 후 내용입력.
    const handleEdit = (index: number) => {
        setShowEdit(index);
        setShowModalMenu(null);
        setEdit(comments?.data.comment[index].context);
    };

    const handleErrorClose = () => {
        setIsError(false);
        removeCookie("login");
        (window as any).ReactNativeWebView?.postMessage("logout");
    };

    useEffect(() => {
        const audioElement = playRef.current.audio.current;

        if (meditationDetail?.data.meditationDetail?.music) {
            // 음악 파일이 설정되었을 때, 자동으로 재생하지 않도록 pause
            audioElement.pause();
            setIsPlaying(false);
        }
    }, [meditationDetail?.data.meditationDetail?.music]);

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

    // 로그아웃 시 첫 화면으로
    useEffect(() => {
        if (cookie.login === undefined) {
            navigate("/home");
        }
    }, [cookie]);

    return (
        <MeditationContainer>
            {isError && (
                <PopupContainer>
                    <p>
                        서버 오류가 발생했습니다. <br />재 로그인 해주세요.
                    </p>
                    <Button context="확인" color="#427d4f" onClick={handleErrorClose} borderColor="#427d4f" />
                </PopupContainer>
            )}
            {showDeletePopup.isOpen ? (
                <PopupContainer>
                    <p>삭제하시겠습니까?</p>
                    <Button context="확인" color="#427d4f" onClick={handleDeleteComment} borderColor="#427d4f" />
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

                    <AudioPlayer
                        ref={playRef}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onListen={handleTimeUpdate}
                        onSeeked={handleTimeUpdate}
                        onEnded={() => { setIsPlaying(false); handleTimeUpdate(); }}
                        onLoadedMetaData={handleLoadedMetaData}
                        showSkipControls={false}
                        showJumpControls={true}
                        autoPlay={false}
                        autoPlayAfterSrcChange={false}
                        src={audioSource}
                        // src="/assets/play.mp3"
                        style={{ display: "none" }}
                    />

                    <div className="qt-audio-controller">
                        <img role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && handleJumpBackward()} onClick={handleJumpBackward} src="/assets/audio-prev.png" alt="10초 뒤로" />
                        <img role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && handlePlayPause()} onClick={handlePlayPause}
                            src={isPlaying ? "/assets/audio-pause.png" : "/assets/audio-play.png"}
                            alt={isPlaying ? "일시정지" : "음원 재생"}
                        />
                        <img role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && handleJumpForward()} onClick={handleJumpForward} src="/assets/audio-next.png" alt="10초 앞으로" />
                    </div>

                    <span className="meditation-audio-time">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>

                    <button className="demo-reflection" onClick={() => setShowComment(true)}>묵상 나눔 {comments?.data.comment.length || 0}개 보기 · 작성</button>
                </div>
                <div className={showComment ? "meditation-comment active" : "meditation-comment"}>
                    <div onClick={() => setShowComment(false)} className="comment-bg"></div>
                    <div className="comment-popup">
                        <div className="popup-header">
                            <p className="title">나눔</p>
                            <p className="description">총 {comments?.data.comment.length}개의 나눔</p>
                        </div>

                        <div className="popup-body">
                            {comments?.data.comment.map((value: getCommentsType, index: number) => {
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
                                                    <p onClick={() => handleEditComment(value.commentId)}>수정</p>
                                                    <p onClick={() => setShowEdit(null)}>취소</p>
                                                </div>
                                            </div>
                                        ) : (
                                            value.context
                                                .split("\n")
                                                .map((context) => <p key={Math.random()}>{context}</p>)
                                        )}

                                        {showModalMenu === index ? (
                                            profile?.userId === value.userId ? (
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
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="meditation-input-area">
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                            <p onClick={handleAddComment}>입력</p>
                        </div>
                    </div>
                </div>
            </div>
        </MeditationContainer>
    );
};

export default MeditationPlay;
