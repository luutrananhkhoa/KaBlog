import { BlogPost } from "../types/blog"
import BlogHeader from "./BlogHeader"


const BlogPreview:React.FC<BlogPost> = (props) => {
    const { title, bodyText, createdAt, tags, author} = props
    const previewText = bodyText.substring(0,150) + '...'
  return (
    <section >
        <BlogHeader createdAt={createdAt} author={author} />
        <h2 className="font-bold">{title}</h2>
        <p className="mt-2">{previewText}</p>
        <div className="flex gap-3">
            {tags.map((tag, idx)=>{
                return (
                    <p className="bg-sky-600 p-2 mt-2 font-semibold rounded-xl" key={idx}>{tag}</p>
                )
            })}
        </div>
    </section>
  )
}

export default BlogPreview