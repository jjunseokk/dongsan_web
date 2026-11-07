import BottomMenu from "../../components/BottomMenu";
import BackHeader from "../../components/BackHeader";
import { CommunityContainer } from "./communityStyle";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCommunityType, getCommunityType } from "../../Type";
import { addCommunity, deleteCommunity, getCommunity, showCommunityHeart } from "../../Api/Client";
import { useCookies } from "react-cookie";
import userProfileStore from "../../Store/userProfile";

const Community = () => {
    const navigate = useNavigate();
    const formRef = useRef<HTMLDivElement | null>(null);
    const queryClient = useQueryClient();

    const [createCommunity, setCreateCommunity] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [showMenu, setShowMenu] = useState<number | null>(null);
    const [anonymity, setAnonymity] = useState<boolean>(false);
    const [cookie] = useCookies(["login"]);
    const { profile } = userProfileStore(); // 프로필 상태 관리 불러오기

    const { data } = useQuery({
        queryKey: ["community"],
        queryFn: () => getCommunity(),
    });

    const addCommunityMutation = useMutation({
        mutationKey: ["community add"],
        mutationFn: (data: addCommunityType) => addCommunity(data, cookie.login),
        onSuccess: (res) => {
            if (res.status === 200) {
                setTitle("");
                setContent("");
                setAnonymity(false);
                setCreateCommunity(false);
                queryClient.invalidateQueries({
                    queryKey: ["community"],
                });
            }
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const deleteCommunityMutation = useMutation({
        mutationKey: ["community delete"],
        mutationFn: (id: number) => deleteCommunity(id),
        onSuccess: (res) => {
            if (res.status === 200) {
                queryClient.invalidateQueries({
                    queryKey: ["community"],
                });
            }
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const communityHeartMutation = useMutation({
        mutationKey: ["heart"],
        mutationFn: (communityId: number) => showCommunityHeart(communityId, cookie.login),
        onSuccess: (res) => {
            if (res.status === 200) {
                queryClient.invalidateQueries({
                    queryKey: ["community"],
                });
            }
        },
        onError: (err) => {
            console.log(err);
        },
    });


    const handleAddCommunity = () => {
        addCommunityMutation.mutate({
            title,
            content,
            anonymity,
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setCreateCommunity(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setCreateCommunity]);

    return (
        <CommunityContainer>
            <div className={createCommunity ? "community-form-container active" : "community-form-container"}>
                <div ref={formRef} className={createCommunity ? "community-form active" : "community-form"}>
                    <Input title="제목" setValue={setTitle} value={title} placeholder="제목을 입력해주세요." />
                    <div className="community-anonymity">
                        <input checked={anonymity} onChange={() => setAnonymity(!anonymity)} type="checkBox" />
                        <p>익명으로 작성하기</p>
                    </div>
                    <div>
                        <p>내용</p>
                        <textarea
                            placeholder="내용을 입력해주세요."
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                    </div>

                    <Button
                        width={"100%"}
                        borderColor="#427d4f"
                        color="#427d4f"
                        context="글 발행하기"
                        onClick={() => { if (title.trim() && content.trim()) handleAddCommunity(); }}
                    />
                </div>
            </div>

            <BackHeader backHandle={false} title="커뮤니티" />

            <div className="community-wrap">
                {data?.data.community.length === 0 && <p className="null">커뮤니티를 추가해보세요.</p>}
                {data?.data.community.map((value: getCommunityType) => {
                    const truncatedContent =
                        value?.content?.length > 40 ? value?.content?.slice(0, 40) + "..." : value.content;

                    return (
                        <div key={value.id} className="community-item">
                            <div className="community-item-container">
                                <div className="user">
                                    <div className="user-thumbnail">
                                        <img src="/assets/tree.png" alt="" />
                                    </div>
                                    <div className="user-info">
                                        <p>{value.anonymity === 1 ? value.nickname : value.writer}</p>
                                        <p>{value.createDate}</p>
                                    </div>
                                </div>
                                <div
                                    className="more-btn"
                                    onClick={() => setShowMenu((prev) => (prev === value.id ? null : value.id))}
                                >
                                    <img src="/assets/more_menu.png" alt="" />
                                    {profile.name === value.writer && showMenu === value.id ? (
                                        <div className="menu">
                                            <p onClick={() => deleteCommunityMutation.mutate(value.id)}>삭제</p>
                                        </div>
                                    ) : showMenu === value.id ? (
                                        <div className="menu">
                                            <p onClick={() => { setShowMenu(null); window.dispatchEvent(new CustomEvent("demo-error", { detail: "체험용 샘플 글입니다. 신고는 실제로 접수되지 않습니다." })); }}>신고 안내</p>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="community-content">
                                <p>{truncatedContent}</p>
                                {value.content.length > 20 && (
                                    <button onClick={() => navigate(`/community/${value.id}/detail`)}>더보기</button>
                                )}
                            </div>
                            <div className="community-event">
                                <div>
                                    <img
                                        onClick={() => communityHeartMutation.mutate(value.id)}
                                        src={
                                            Array.isArray(value?.communityHeart) &&
                                            value.communityHeart.some((item: any) => item.userId === profile.userId)
                                                ? "/assets/heart-active.png"
                                                : "/assets/heart.png"
                                        }
                                        alt=""
                                    />
                                    <p>{Array.isArray(value.communityHeart) ? value.communityHeart.length : 0}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div onClick={() => setCreateCommunity(true)} className="community-add">
                <img src="/assets/plus.png" alt="" />
            </div>
            <BottomMenu />
        </CommunityContainer>
    );
};

export default Community;
