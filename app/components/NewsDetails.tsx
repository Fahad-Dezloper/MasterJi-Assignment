/* eslint-disable @next/next/no-img-element */
"use client"
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Article {
  urlToImage: string | null;
  title: string;
  author: string | null | undefined;
  publishedAt: string | number | Date;
  description: string | null;
  url: string | undefined;
}

const NewsDetails: React.FC<{ currentPage: number; articlesPerPage: number }> = ({ currentPage, articlesPerPage }) => {
    const [news, setnews] = useState(null)
    const [loading, setLoading] = useState(true);

    const newsApi = "8e4114d1455d44e4850431bf5e2885fe"
    
    async function getNews() {
        try {
            setLoading(true)
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApi}`);
            if (response.data && Array.isArray(response.data.articles)) {
                setnews(response.data.articles);
            } else {
                console.error("Invalid data structure:", response.data);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    function formatDate(datee: string | number | Date) {
        const date = new Date(datee);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    }

    function trunucateDescription(description: string) {
        if (!description) {
            return "";
        }
        
        if (description.length > 110) {
            return description.slice(0, 110) + '...';
        }

        return description
    }

    function trunucatetitle(title: string) {
        if (!title) {
            return "";
        }

        if (title.length > 89) {
            return title.slice(0, 89) + '...';
        }

        return title
    }

    useEffect(() => {
        getNews();
    }, [])

    if (!news || news.length === 0) return <div className='w-[90vw] sm:w-[55vw] min-h-[65vh] flex flex-col justify-center items-center'><Loader2 className="animate-spin w-12 h-12" />Loading News</div>;

    const startIndex = currentPage * articlesPerPage;
    const selectedArticles = news.slice(startIndex, startIndex + articlesPerPage);

    return (
      loading ? (
        <div className='w-full min-h-[65vh] flex items-center justify-center'><Loader2 className="animate-spin w-12 h-12" /></div>
      ) : (
        <>
          {selectedArticles.map((article: Article, index: React.Key) => (
            <div key={index} className='p-3 min-h-[65vh] bg-white shadow-md rounded-md flex flex-col gap-2'>
              <div className='w-full h-[28vh] overflow-hidden'>
                <img 
                  src={article.urlToImage || "https://st.depositphotos.com/1014014/1808/i/450/depositphotos_18087651-stock-photo-latest-news-concept.jpg"} 
                  className='w-full h-full object-cover rounded-md' 
                  alt="News Articles" 
                />
              </div>
              <h3 className='font-semibold'>{trunucatetitle(article.title)}</h3>
              <p className='text-sm text-gray-500'>By {article.author || 'Unknown'} - {formatDate(article.publishedAt)}</p>
              <p className='text-sm'>
                {article.description ? trunucateDescription(article.description) : 'No description available.'}
              </p>
              <a href={article.url} className='text-blue-500'>Read More</a>
            </div>
          ))}
        </>
      )
    );
}

export default NewsDetails;