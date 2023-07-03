import Modal from '@leafygreen-ui/modal';
import { Footer, FooterUl, FooterUl2 } from "../../../../styles/main";
import Condition from '../../../../src/components/Conditions/Conditions';
import Secure from '../../../../src/components/Secure/secure';
import Link from "next/link";
import {useState} from "react"

export default function Layoutfooter() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <>
      <Footer>
          <FooterUl>						
            <Link href="https://twitter.com/"><a target='_blank'><img src='/icon/1.png' /></a></Link>
            <Link href="https://www.google.com/"><a target='_blank'><img src='/icon/2.png' /></a></Link>
            <Link href="https://ko-kr.facebook.com/"><a target='_blank'><img src='/icon/3.png' /></a></Link>
            <Link href="https://www.instagram.com/"><a target='_blank'><img src='/icon/4.png' /></a></Link>
            <Link href="https://github.com/"><a target='_blank'><img src='/icon/5.png' /></a></Link>
          </FooterUl>
					<FooterUl2>
            <span style={{cursor:"pointer"}} onClick={() => setOpen(curr => !curr)}>개인정보 처리방침</span> | <span style={{cursor:"pointer"}} onClick={() => setOpen2(curr => !curr)}>이용약관</span><br/><br/>
						<div>&copy; kt AIVLE. All rights reserved.</div>
					</FooterUl2>
          <Modal open={open} setOpen={setOpen}>
          <Secure />
          </Modal>
          <Modal open={open2} setOpen={setOpen2}>
          <Condition />
          </Modal>
      </Footer>
    </>
    )
}