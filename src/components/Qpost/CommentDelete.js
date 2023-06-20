// 'use client'
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import X from '@leafygreen-ui/icon/dist/X';


export default function CommentDelete({id, state}) {

  const IconX = () => <Icon glyph="X" fill="#F24822" />;
  
  const [del, setDel] = state;

  const handleDelete = async () => {
    const response = await fetch('http://127.0.0.1:8000/blog/comment/' + id + '/', {
      method : 'DELETE',
    });

    if ( response.ok ) {
      console.log("Post deleted successfully");
      setDel(!del);
    } else {
      console.log("Error in deletion");
    }
  };

  return (    
    <IconButton className="CommentDelete" onClick={handleDelete}>
      <IconX/>
    </IconButton>
  );
}