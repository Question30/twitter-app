const React = require("react");
const DefaultLayout = require("./layout/Default");

function Show({ tweet }) {
  return (
    <DefaultLayout title='Tweet'>
      <div>{tweet.title}</div>
      <div>{tweet.author}</div>
      <div>{tweet.body}</div>
      <div>{tweet.sponsored ? "Sponsored" : ""}</div>
      <div>{new Date(tweet.createdAt).toLocaleDateString()}</div>
        <div>
            <h3>Comments:</h3>
                {tweet.comments.map(comment => {
                    return(
                        <div>
                            <div>{comment.body} </div>
                            <div> {comment.author} </div>
                        </div>
                    )
                })}
        </div> 
        <h3>Comment:</h3>
      <div>
        <form method='POST' action={`/api/tweets/add-comments/${tweet._id}?_method=PUT`}>
         Comment: <input type="text" name="body" required />
          <br/>
          Author: <input type="text" name="author" required />
          <br />
          <input type="submit" value="Add Comment" />
        </form>
      </div>
    </DefaultLayout>
  );
}

module.exports = Show;
