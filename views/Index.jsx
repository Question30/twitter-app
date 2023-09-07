const React = require("react");
const DefaultLayout = require("./layout/Default");

function Index({ tweets }) {
  return (
    <DefaultLayout title='Tweets'>
      <nav className="text-slate-200 my-2">
        <a href="/tweets/new">Create a new tweet</a>
      </nav>
      <ul>
        {tweets.map((tweet) => {
          return (
            <li key={tweet._id} className="border rounded p-5 bg-blue-500 my-3 text-slate-300 flex flex-col">
              <a className="text-2xl underline self-center"  href={`/tweets/${tweet._id}`}>{tweet.title}</a>
              <p className="self-center my-2">{tweet.body}</p>
              <p className="self-end order-first text-lg">{tweet.author}</p>
              <div>
              <div>
                <a className="border rounded px-2 bg-slate-200 text-blue-500 mr-3" href={`/api/tweets/add-like/${tweet._id}`}>Like</a>
              <span>likes: {tweet.likes}</span>
                </div>
              <span>{tweet.sponsored ? 'Sponsored' : ''}</span> <br />
              <div>
              <a className="border rounded px-2 bg-slate-200 text-blue-500 mr-3 w-4" href={`/tweets/${tweet._id}/edit`}>Edit Tweet</a>
              </div>
              <form method='POST' action={`/api/tweets/${tweet._id}?_method=DELETE`}>
                <input className="border rounded px-2 bg-slate-200 text-blue-500 mr-3" type='submit' value='Delete'/>
              </form>
              </div>
            </li>
          );
        })}
      </ul>
    </DefaultLayout>
  );
}

module.exports = Index;