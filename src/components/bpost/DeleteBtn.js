// 'use client'
import { useRouter } from 'next/router';
import Button from '@leafygreen-ui/button';
import { useAxios } from "/src/components/Axios/axios";
import { useState } from "react";
import DialogAlert from "/src/components/Qpost/DialogAlert"
// import ErrorAlert from '/src/components/Qpost/ErrorAlert';

export default function DeleteBtn(props) {
  
  const router = useRouter()
  const api = useAxios()
  
  const [showDialog, setShowDialog] = useState(false);
  // const [forbidden, setForbidden] = useState(false);
  
  const handleDelete = async () => {
    try {
      const response = await api.delete('/blog/blog/' + props.id + '/');

      if (response.status == 204) {
        console.log("Post deleted successfully");
        router.reload()
      } else {
        console.log("Error in deletion");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = async () => {
    if (props.auth) {
      setForbidden('삭제권한이 없습니다.');
      return;
    } else {
      setShowDialog(true);
    }
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <>
      {/* <ErrorAlert parentState={[forbidden, setForbidden]}/> */}
      <Button className="DeleteBtn" onClick={handleClick}>
        삭제하기
      </Button>
      {showDialog && <DialogAlert errorMessage={"정말 삭제하시겠습니까?"} handleAgree={handleDelete} handleClose={handleClose} />}
    </>
  );
}