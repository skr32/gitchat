import { useState, useEffect } from "react";
import './style.scss'
import { ChangeTheme } from "../ChangeTheme";
import { Search } from "../Search";
import { Cart } from "../Cart";
import { User } from "../User";

export const headerLinks = [
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
    let count:number = 3;
    return(
        <div className="header" style={
            { transform: visible ? 'translateY(-100%)' : 'translateY(0%)',
            transition: 'transform 0.5s ease'}}>
            <a className="header__logo" href="">
                TestTest
            </a>
            <ul className="header__items">
                <ChangeTheme />
                {headerLinks.map( (link) => (
                    <li>
                        <a href={link.link}>{link.title}</a>
                    </li>
                ))}
                <Search />
                <User />
                <Cart count={count}/>
            </ul>
        </div>
    )
}