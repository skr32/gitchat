import { useState, useEffect } from "react";
import './style.scss'

const headerLinks = [
    {title: 'projects', link: ''}, 
    {title: 'work', link: ''}, 
    {title: 'contact', link: ''}
]

export function Header() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.pageYOffset;
    
          setVisible(prevScrollPos < currentScrollPos);
          setPrevScrollPos(currentScrollPos);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
      }, [prevScrollPos]);
    
    return(
        <div className="header" style={
            { transform: visible ? 'translateY(-100%)' : 'translateY(0%)',
            transition: 'transform 0.5s ease'}}>
            <a className="header__logo" href="">
                TestTest
            </a>
            <ul className="header__items">
                {headerLinks.map( (link) => (
                    <li>
                        <a href={link.link}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}