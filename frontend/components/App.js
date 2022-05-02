import React, { useState, useEffect } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'
import {PrivateRoute} from "./privateRoute"

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate();
  const redirectToLogin = () => { navigate("/") }
  const redirectToArticles = () => { navigate('/articles') }
  const setActiveArticle = (id) =>{
    setCurrentArticleId(id)
    console.log("this is the current article ID: ")
    console.log(currentArticleId)
  }



  const logout = () => {
    // ✨ implement
    const token = localStorage.getItem("token")
    if (token) {
      localStorage.removeItem("token")
      setMessage("Goodbye!")
      navigate("/")
    }
    else {
      redirectToLogin()
    }
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
  }

  const login = (values) => {
    setMessage("")
    setSpinnerOn(true)
    axios
      .post(loginUrl, values)
      .then(res => {
        console.log(res.data.token)
        localStorage.setItem('token', res.data.token);
        setMessage(res.data.message)
        redirectToArticles();
        setSpinnerOn(false)
      
      })
      .catch(err =>{
          console.log(err)
          setSpinnerOn(false)
      })
     // We should flush the message state, turn on the spinner
     // and launch a request to the proper endpoint.
     // On success, we should set the token to local storage in a 'token' key,
     // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
  }

  const getArticles = () => {
    // ✨ implement
    setMessage("")
    setSpinnerOn(true)
    // We should flush the message state, turn on the spinner
      const token = localStorage.getItem("token")
      console.log(token)
      axios
      .get("http://localhost:9000/api/articles",{
         headers: {
             Authorization: token
         } 
      })
      .then((res)=>{
          setArticles(res.data.articles)
          setMessage(res.data.message)
          setSpinnerOn(false)
      })
      .catch((err=>{
        console.log(err.status)//TODO probably not right key
        setSpinnerOn(false)
        redirectToLogin() //TODO we may need an if statement to check if it's a 401 error
      }))
    
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }

  const postArticle = article => {
    // ✨ implement
    setMessage("")
    setSpinnerOn(true)
    const token = localStorage.getItem("token")
      axios
      .post("http://localhost:9000/api/articles",article, {
         headers: {
             Authorization: token
         } 
      })
      .then((res)=>{
          console.log(res.data)
          setArticles([ ...articles, res.data.article])
          setMessage(res.data.message)
          setSpinnerOn(false)
      })
      .catch((err=>{
        console.log(err.status)//TODO probably not right key
        setSpinnerOn(false)
        redirectToLogin() 
      }))
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }
//TODO
  const updateArticle = ( article_id, article ) => {
    // ✨ implement
    setMessage("")
    setSpinnerOn(true)
    const token = localStorage.getItem("token")
      axios
        .put(`http://localhost:9000/api/articles/${currentArticleId}`, article, {
          headers: {
              Authorization: token
          } 
        })
          .then((res)=>{
              const newArray = articles.filter((article)=>{
                if(article.article_id !== article_id) return true
              }) 
              setArticles([...newArray, res.data.article])
              setMessage(res.data.message)
              setCurrentArticleId(0)
              setSpinnerOn(false)
          })
          .catch((err=>{
            console.log(err)
            setSpinnerOn(false)
            redirectToLogin() 
          }))
  }

  const deleteArticle = article_id => {
    setMessage("")
    setSpinnerOn(true)
    const token = localStorage.getItem("token")
      axios
        .delete(`http://localhost:9000/api/articles/${article_id}`,{
          headers: {
              Authorization: token
          } 
        })
          .then((res)=>{

              console.log(res.data)
              const newArray = articles.filter((article)=>{
                if(article.article_id !== article_id) return true
              }) 
              setArticles([newArray])
              // const newArray = articles.filter(()=>{}) //TODO maybe
              // setArticles([ ...articles, res.data.article])
              setMessage(res.data.message)
              setSpinnerOn(false)
          })
          .catch((err=>{
            console.log(err)
            setSpinnerOn(false)
            redirectToLogin() 
          }))
    
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <React.StrictMode>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="articles" element={
            <>
              <ArticleForm articles={articles} setActiveArticle={setActiveArticle} postArticle={postArticle} updateArticle={updateArticle} setCurrentArticleId={setCurrentArticleId} currentArticleId={currentArticleId}/>
              <Articles setActiveArticle={setActiveArticle} articles={articles} getArticles={getArticles} deleteArticle={deleteArticle} setCurrentArticleId={setCurrentArticleId} currentArticleId={currentArticleId}/>
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </React.StrictMode>
  )
}
