// 'use client'
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { useAxios } from "/src/components/Axios/axios";
import { useState } from 'react';
import ErrorAlert from '/src/components/Qpost/ErrorAlert';

export default function CommentDelete({id, state}) {

  const [forbidden, setForbidden] = useState(false);

  const api = useAxios()
  
  const [del, setDel] = state;

  const handleDelete = async () => {
    try {
      const response = await api.delete('/font/comment/' + id + '/');

      if ( response.status == 204 ) {
        console.log("Post deleted successfully");
        setDel(!del);
      }
    } catch (error) {
      if ( error.response && error.response.status == 403 ) {
        setForbidden(error.response.data.detail);        
        console.log(error.response)
      } else {
        console.log(error.response)
        console.log("Error in deletion");
      }
    }
  };

  return (    
    <>
      <ErrorAlert parentState={[forbidden, setForbidden]}/>
      <IconButton className="CommentDelete" onClick={handleDelete} aria-label="delete" >
        <Icon glyph="X" />
      </IconButton>
    </>
  );
}