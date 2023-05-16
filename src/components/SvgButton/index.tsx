import './style.scss'

export function SvgButton(info :{text:string, link: string}) {
    return(
        <button className="svgbutton glow-effect">
            <a href={info.link}>{info.text}</a>
                <svg className="glow-container">
                    <rect className="glow-container__blur" pathLength="100" strokeLinecap="round"></rect>
                    <rect className="glow-container__line" pathLength="100" strokeLinecap="round"></rect>
                </svg>
        </button>
    )
}