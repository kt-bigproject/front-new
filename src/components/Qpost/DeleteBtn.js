// 'use client'
import { useRouter } from 'next/router';
import Button from '@leafygreen-ui/button';

export default function DeleteBtn(props) {
  
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/blog/blog/' + props.id + '/', {
        method : 'DELETE',
      });
      if (response.ok) {
        console.log("Post deleted successfully");
        router.push('/qpost');
      } else {
        console.log("Error in deletion");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Button className="DeleteBtn" onClick={handleDelete}>삭제</Button>
  );
}