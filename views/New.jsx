const React = require('react');
const DefaultLayout = require("./layout/Default");

function New() {
    return(
        <DefaultLayout title='Create New Tweet'>
            <form action='/api/tweets' method='POST'>
               Title: <input type='text' name='title' required />
                Author: <input type='text' name='author' required/>
                <textarea name='body' required></textarea>
                <input type='submit' value='Post'/>
            </form>
        </DefaultLayout>
    )
}

module.exports = New;