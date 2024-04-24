import { useEffect, useState, useCallback } from 'react';
import './newslist.css';
import config from '../../params/config';

export default function NewsList({limit, paginator = false}) {
    const [news, setNews] = useState([]);

    const fetchNews = useCallback(async () => {
        const response = await fetch(config.api + 'get/news/');
        const answer = await response.json();
        setNews(answer.data);
    }, []);

    useEffect(
        () => {fetchNews()}, [fetchNews]
    );

    return (
        <>
        <h2>Новости</h2>
        <div className='news-list'>   
            {
                news && news.map(el => (
                    <div className='news-card'>
                        <img src={'./' + el.PICTURE} alt={el.TITLE} />
                        <h3><a href={'/news/' + el.CODE}>{el.TITLE}</a></h3>
                        <span>{el.ANOUNCE}</span>
                    </div>
                ))
            }
        </div>
        </>
    )
}