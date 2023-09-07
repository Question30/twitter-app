const React = require('react');
const DefaultLayout = require("./layout/Default");

function Edit({tweet}) {

    return(
        <DefaultLayout title='Edit Tweet'>
            <h1>Edit Tweet</h1>
        <form action={`/api/tweets/${tweet._id}?_method=PUT`} method='POST'>
           Title: <input type='text' name='title' defaultValue={tweet.title}  required/>
            <textarea name='body' defaultValue={tweet.body}  required></textarea>
            <input type='submit' value=' Edit Post'/>
            Sponsored: <input type='checkbox' name='sponsored' defaultChecked={tweet.sponsored} />
        </form>
    </DefaultLayout>
    )

}

module.exports = Edit;