import './style.scss'

export function SvgButton(info: { text: string }) {
    return (
        <button className="svgbutton glow-effect">
            {info.text}
            <svg className="glow-container">
                <rect className="glow-container__blur" pathLength="100" strokeLinecap="round"></rect>
                <rect className="glow-container__line" pathLength="100" strokeLinecap="round"></rect>
            </svg>
        </button>
    )
}