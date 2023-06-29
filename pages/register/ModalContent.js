export default function ModalContent() {
  const headerStyle = {
    backgroundColor: '#B8B8B8',
    color: '#333333',
    border: '1px solid black',
    padding: '15px',
    textAlign: 'left',
  };
  
  const cellStyle = {
    border: '1px solid black',
    padding: '15px',
    textAlign: 'left',
  };

  return (
    <div>      
      <br/>
      개인정보보호법에 따라 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 확인 후 동의하여 주시기 바랍니다.

      <table style={{width: '100%', borderCollapse: 'collapse', marginTop: 20, marginBottom: 20}}>
        <thead>
          <tr>
            <th style={headerStyle}>수집하는 개인정보</th>
            <th style={headerStyle}>수집한 개인정보의 이용</th>
            <th style={headerStyle}>개인정보의 보관기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>이메일, 아이디, 비밀번호</td>
            <td style={cellStyle}>본인여부 확인 및 이용자 식별</td>
            <td style={cellStyle}>회원 탈퇴 시까지</td>
          </tr>
        </tbody>
      </table>
      개인정보 수집 및 이용 동의를 거부할 권리
      <br/>
이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.

    </div>
  );
}
