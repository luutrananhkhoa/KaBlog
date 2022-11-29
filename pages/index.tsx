import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import BlogPreview from '../components/BlogPreview'
import {getBlogs} from '../server/Blogs'
import styles from '../styles/Home.module.css'
import {BlogPost} from '../types/blog'


const Home: NextPage = ({
  blogData,
  tags
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number[]>([])
  const filteredBlog: BlogPost[] = useMemo(()=>{
    return filterWord.length > 0 ?
      blogData.filter((blog: BlogPost)=>{
        return filterWord.every((filter)=>blog.tags.includes(filter))
      } )
      :blogData
  },[filterWord])

  const filterLabel =(tag:any, idx:number)=>{
      if(selectedIdx.includes(idx)){
        setSelectedIdx(selectedIdx.filter((id)=>id!==idx))
        setFilterWord(filterWord.filter((filter)=>filter!==tag.innerText))
      }else{
        setSelectedIdx([...selectedIdx, idx])
        setFilterWord([...filterWord, tag.innerText])
      }
  }
  return (
    <main className="w-screen h-screen overflow-auto flex flex-col items-center bg-[#28272A] font-poppins">
      <title>Home</title>
      <div className="w-full py-8 px-10 flex justify-center">
        <img src="/Logo.svg" alt="Logo" />
      </div>
      <section>
        <div className="mt-8 text-center text-[#E7DACA]">
          <h1 className="text-[4rem] font-yeseva text-[#E7DACA]">
            Welcome to KaBlog
          </h1>
          <p>
            A full-stack website blog made with Next.js, TailwindCSS, Github
            GraphQL
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center text-[1.125rem] mt-12">
        <div className="flex gap-3 mb-12">
          {tags.map((tag: string, idx: number) =>{
            return(
                 <button key={idx} 
                  className={`${selectedIdx.includes(idx)? 'bg-[#4D289D] text-white rounded-2xl py-1 px-8' : 'bg-[#06B38A] rounded-2xl py-1 px-8'}`}
                  onClick={(e)=>filterLabel(e.target, idx)}
                 >{tag}</button>
            )
          })}
        </div>
        {filteredBlog.map((blog: BlogPost) => {
          return (
            <div
              key={blog.id}
              className="max-h-[20em] max-w-[28em] overflow-hidden p-6 mb-8 bg-[#F3E7E6] rounded-lg hover:bg-[#A9BAB6] transaction-all duration-300"
            >
              {/* {blog.title} */}
              <a href={blog.url} target="_blank" rel="noreferrer">
                <BlogPreview 
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
              
            </div>
          )
        })}
      </section>
    </main>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs()
  let tags: string[] = []

  for(const blog of blogs) {
    for(const tag of blog.tags) {
      if(!tags.includes(tag)){
        tags.push(tag)
      }
    }
  }

  console.log(tags)
  return {
    props: {
      blogData: blogs,
      tags: tags
    },
  }
}
