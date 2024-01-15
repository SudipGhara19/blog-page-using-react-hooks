import { useState, useRef, useEffect } from "react";
import { db } from "../firebaseinit";
import { collection, addDoc } from "firebase/firestore";




//Blogging App using Hooks
export default function Blog(){

    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");
    const [formData, setFormData] = useState({title:"", content:""});

    //added an empty arrat to store the blogs after clicking the add button
    const [blogs, setBlogs] = useState([]);

    

    //created for bring back the foucus in title field after submmit the form
    const titleRef = useRef(null);


    useEffect(()=> {
        titleRef.current.focus();
    },[]);

    //for title after add a blog
    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }else{
            document.title = "No blogs!!";
        }
    },[blogs]);
    
    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e){
        e.preventDefault();

        setBlogs([{title: formData.title, content: formData.content}, ...blogs]);

        //adding data to the firebase dataBase
        const docRef = await addDoc(collection(db, "blogs"),{
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
        });


        titleRef.current.focus();

        setFormData({title: "", content: ""});
       
        console.log(blogs);
    }


    //to delete the blog from the array
    function handleDelete(i){
        setBlogs(blogs.filter((blog,index)=> i !== index));
    }

    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={formData.title}
                                onChange={(e)=> 
                                setFormData({title: e.target.value, content: formData.content})}
                                ref={titleRef}
                                required/>
                                
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                onChange={(e)=> 
                                setFormData({title: formData.title, content: e.target.value})}
                                required/>
                                
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn" type="submit">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog,i)=>(
            <div className="blog" key={i}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>

                <div className="blog-btn">
                    <button className="btn remove" onClick={()=> handleDelete(i)}>
                        Delete
                    </button>
                </div>
            </div>
        ))}
        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
