import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import Edit from "./Edit"
import AuthContext from "/src/components/AuthContext/AuthContext";
import { useAxios } from "/src/components/Axios/axios";
import { FormSkeleton } from '@leafygreen-ui/skeleton-loader';
import ErrorAlert from '/src/components/Qpost/ErrorAlert';

export default function EditPage() {

  const {user} = useContext(AuthContext);

  const router = useRouter()
  const { id } = router.query

  const [blog, setBlog] = useState(null);
  const api = useAxios() 
  const [errorMessage, setErrorMessage] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    } else {
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    if (!id) return;

    api.get('/font/blog/' + id)
      .then(response => {
          if (response.data.user_id !== user.user_id) {
            setErrorMessage('수정 권한이 없습니다.');
            router.back();
          } else {
            console.log(response.data);
            setBlog(response.data);
          }
      })
      .catch(error => console.error(error));
  }, [id]);

  if (loading || blog === null) {
    return <FormSkeleton/>;
  }

  return <Edit blog={blog}/>;
}