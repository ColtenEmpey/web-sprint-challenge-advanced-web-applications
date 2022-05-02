import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const {currentArticleId, setCurrentArticleId, updateArticle, postArticle, setActiveArticle, articles} = props
  // ✨ where are my props? Destructure them here

  useEffect(() => {
    // ✨ implement
    if(currentArticleId){
      const currentArticle = articles.filter((article)=>{
        if(article.article_id === currentArticleId){
          return article
        }
      })
      setValues({ title: currentArticle[0].title, text: currentArticle[0].text, topic: currentArticle[0].topic })
    }
    else{
      setValues(initialFormValues)
    }
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
  },[currentArticleId])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    if(currentArticleId){
      console.log("current article id:")
      console.log(currentArticleId)
      console.log(values)
      // const putValues = { "title": "Colten", "text": "is Awesome at: ", "topic": "React" }
      // {"title": `${values.title}`, "text": `${values.text}`, "topic": `${values.topic}`}
      updateArticle(currentArticleId, values)
    }
    else{
      postArticle(values)
      setValues(initialFormValues)
    }
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
  }

  const isDisabled = () => {
    // ✨ implement
    const {title, text, topic} = values
    if( title.trim().length >=1 && text.trim().length >=1 && topic ){
      return false
    }
    else return true
    // Make sure the inputs have some values
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function //TODO
    <form id="form" onSubmit={onSubmit}>
      {currentArticleId ? 
      <h2>Edit Article</h2> 
      : 
      <h2> Create Article</h2> }
      
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        {currentArticleId ? 
          <button onClick={()=>setActiveArticle(0)} disabled={isDisabled()}>Cancel edit</button>  
          : null
        }
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update") 
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
