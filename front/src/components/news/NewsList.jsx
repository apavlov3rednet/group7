import { useEffect, useState, useCallback } from 'react';
import './style.css';
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
        <div className='news-list'>   
            {
                news && news.map(el => (
                    <div className='news-card'>
                        <img src={'../../' + el.PICTURE} alt={el.TITLE} />
                        <h3>{el.TITLE}</h3>
                        <span>{el.ANOUNCE}</span>
                    </div>
                ))
            }
        </div>
    )
}