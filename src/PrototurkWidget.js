import {useEffect, useState} from "react";
import styles from "./PrototurkWidget.module.css"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/tr"

dayjs.extend(relativeTime)
dayjs.locale('tr')

function PrototurkWidget({widget}) {

    const cat = widget.getAttribute('data-category')
    const limit = parseInt(widget.getAttribute('data-limit') ?? 5)
    const hasAuthor = !widget.getAttribute('data-no-author')
    const isDarkMode = widget.getAttribute('data-dark')

    const [category, setCategory] = useState(false)
    const [articles, setArticles] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch(`https://prototurk.com/api/articles/${cat}?limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                if (data?.error) {
                    setError(data.error)
                } else {
                    setCategory(data.category)
                    setArticles(data.articles)
                }
            })
    }, [])

    if (error) {
        return (
            <div className={styles.error}>
                {error}
            </div>
        )
    }

    if (!category || !articles) {
        return 'Widget yükleniyor..'
    }

    return (
        <div style={{
            '--bg-color': category.color,
            '--text-color': category.color === '#f7df1e' ? '#333' : '#fff'
        }} className={`${styles.widget} ${isDarkMode ? styles.dark : ''}`}>
            <header>
                <h3>
                    <span>{category.title}</span> hakkında makaleler
                </h3>
            </header>
            <table>
                <thead>
                <tr>
                    <th>Makale</th>
                    {hasAuthor && <th>Yazar</th>}
                    <th style={{width: '60px'}}>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {articles.map(article => (
                    <tr>
                        <td>
                            {article.title}
                            <div className={styles.date}>
                                {dayjs(article.date).fromNow()}
                            </div>
                        </td>
                        {hasAuthor && (
                            <td>
                                <a className={styles.author} target="_blank" href={article.user.url}>
                                    <img src={article.user.avatar} alt=""/>
                                    {article.user.name}
                                </a>
                            </td>
                        )}
                        <td>
                            <a className={styles.link} target="_blank" href={article.url}>
                                Oku
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PrototurkWidget;
