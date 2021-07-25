import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { useHistory } from 'react-router';

const BlogDetails = () => {
  const history = useHistory();

  const { id } = useParams();
  const url = `http://localhost:8000/blogs/${id}`;

  const { data: blog, isPending, error } = useFetch(url);

  const handleDelete = _ => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE',
    }).then(() => {
      history.push('/');
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
