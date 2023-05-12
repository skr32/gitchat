import { useState } from 'react';
import './style.scss'

export function Search() {

    const [isActive, setActiveSearch] = useState(false);

    function activeSearch() {
        setActiveSearch(!isActive);
    }

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Type to search..."
                style={{ width: isActive ? '200px' : '0', opacity: isActive ? '1' : '0' }} />

            <div className="search__btn">
                <svg className="search__icon" onClick={activeSearch} style={{ visibility: isActive ? 'hidden' : 'visible' }}
                    aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19"><g fill="none"><path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" /><circle cx="8" cy="8" r="7" /></g></svg>
                <svg className="search__cancel" onClick={activeSearch} style={{ visibility: !isActive ? 'hidden' : 'visible' }}
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" /></svg>

            </div>
        </div>
    )
}