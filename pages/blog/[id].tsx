import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import React from 'react'
import BlogHeader from '../../components/BlogHeader';
import { getBlogDetail } from '../../server/Blogs'
import { BlogDetail } from './../../types/blog';
import parse from 'html-react-parser'
import styles from './id.module.css'

const BlogPost:NextPage = ({blogData}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const {author, bodyHTML, createdAt, title} = blogData
  return (
    <section className="w-screen h-screen overflow-auto flex flex-col items-center bg-[#28272A] font-poppins">
        <title>{title}</title>
        <div className="max-w-[50%] p-8">
            <h1 className="text-center my-10 font-bold text-[2.5rem] text-[#E7DACA]">{title}</h1>
            <div className="flex justify-center mb-4 text-[#E7DACA]">
                <BlogHeader createdAt={createdAt} author={author} />
            </div>
            <div className={`${styles.html} flex flex-col text-[#E7DACA]`}>{parse(bodyHTML)}</div>
        </div>
    </section>
  )
}

export default BlogPost

export const getServerSideProps: GetServerSideProps = async (context)=>{
    const route: string[] |string | undefined = context.query.id
    const id = Number(route)

    let blogDetail = await getBlogDetail(id)
    return { 
        props:{
            blogData: blogDetail
        }
    }
}