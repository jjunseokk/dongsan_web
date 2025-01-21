import styled from "styled-components";
import { px2vw } from "../../../Util/px2vw";
import { SetStateAction } from "react";

interface PrivacyType {
  setShowPrivacy: React.Dispatch<SetStateAction<boolean>>;
}

const PrivacyContainer = styled.div`
  width: ${px2vw(430)};
  height: 100vh;
  overflow: auto;
  position: absolute;
  top: 0;
  background: #ffffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  padding: ${px2vw(10)};
  > img {
    margin-bottom: ${px2vw(20)};
  }
  > p {
    font-size: 15px;
  }
`;

const Privacy = ({ setShowPrivacy }: PrivacyType) => {
  return (
    <PrivacyContainer>
      <img
        onClick={() => setShowPrivacy(false)}
        src="/assets/arrow_back.png"
        alt=""
      />
      <h1>개인정보 처리방침</h1>
      <br />
      <p>
        시심(이하 ‘앱’)은 사용자의 개인정보를 중요하게 생각하며, 『개인정보
        보호법』 등 관련 법령을 준수합니다. 본 개인정보 처리방침은 앱에서
        제공하는 서비스와 관련하여 사용자의 개인정보를 어떻게 수집, 이용, 보관,
        보호하는지에 대해 설명합니다.
      </p>
      <br />
      <h2>1. 수집하는 개인정보 항목</h2>
      <br />
      <p>앱은 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다.</p>
      <br />
      <p>
        1. 회원가입 시 수집 정보 - 필수 항목: 이름, 이메일 주소, 비밀번호,
        전화번호 - 선택 항목: 프로필 사진
      </p>
      <br />
      <p>2. 기타 - 고객 문의 처리 시 필요한 추가 정보</p>
      <br />
      <h2> 2. 개인정보 수집 방법</h2>
      <br />
      <p>- 회원가입 및 서비스 이용 과정에서 사용자가 직접 입력</p>
      <br />
      <p>- 서비스 이용 과정에서 자동으로 수집되는 정보</p>
      <br />
      <h2>3. 개인정보의 이용 목적</h2>
      <br />
      <p>수집한 개인정보는 다음과 같은 목적으로 이용됩니다:</p>
      <br />
      <p>- 서비스 제공 및 유지 관리</p>
      <br />
      <p>- 회원 인증 및 식별</p>
      <br />
      <p>- 고객 문의 응대 및 공지사항 전달</p>
      <br />
      <p>- 앱 개선 및 사용자 경험 최적화</p>
      <br />
      <p>- 법적 의무 준수</p>
      <br />
      <h4>4. 개인정보의 보유 및 이용 기간</h4>
      <br />
      <p>
        사용자의 개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 파기합니다.
        단, 관계 법령에 따라 보관이 필요한 경우, 해당 법령이 정한 기간 동안
        보관합니다.
      </p>
      <br />
      <p>
        - 예: 전자상거래 등에서의 소비자 보호에 관한 법률에 따라 거래 기록은
        5년간 보관
      </p>
      <br />
      <h4>5. 개인정보의 제3자 제공</h4>
      <br />
      <p>
        앱은 사용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 단,
        법적 의무 또는 사용자의 동의가 있는 경우에만 제공됩니다.
      </p>
      <br />
      <h4>6. 개인정보의 처리 위탁</h4>
      <br />
      <p>
        앱은 원활한 서비스 제공을 위해 개인정보 처리를 외부에 위탁할 수
        있습니다. 위탁 시 개인정보 보호가 안전하게 이루어지도록 관리·감독합니다.
      </p>
      <br />
      <h4>7. 개인정보의 보호 조치</h4>
      <br />
      <p>
        앱은 사용자의 개인정보를 보호하기 위해 다음과 같은 기술적, 관리적 조치를
        취합니다:
      </p>
      <br />
      <p>- 개인정보를 암호화하여 보관</p>
      <br />
      <p>- 정기적인 보안 점검 및 교육 시행</p>
      <br />
      <p>- 개인정보 접근 권한 최소화</p>
      <br />
      <h4>8. 사용자의 권리와 행사 방법</h4>
      <br />
      <p>
        사용자는 언제든지 자신의 개인정보에 대한 열람, 수정, 삭제, 처리 정지
        요청을 할 수 있습니다. 요청 시 앱은 관련 법령에 따라 지체 없이
        조치합니다.
      </p>
      <br />
      <h4>9. 개인정보 보호 책임자</h4>
      <br />
      <p>
        앱은 개인정보 처리에 관한 문의와 불만 처리를 위해 개인정보 보호 책임자를
        지정하고 있습니다.
      </p>
      <br />
      <p>- 이름: 박준석</p>
      <br />
      <p>- 이메일: junsee0923@gmail.com</p>
      <br />
      <p>- 전화번호: 01023138636</p>
      <br />
      <h4>10. 개인정보 처리방침 변경</h4>
      <br />
      <p>
        본 개인정보 처리방침은 법령 또는 서비스 정책 변경에 따라 수정될 수
        있으며, 변경 시 앱 내 공지사항을 통해 사전 안내드립니다.
      </p>
      <br />
      <p>- 시행일: 2025년 1월 1일</p>
      <br />
    </PrivacyContainer>
  );
};

export default Privacy;
