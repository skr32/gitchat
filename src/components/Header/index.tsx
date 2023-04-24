import { useState, useEffect } from "react";
import { Burgermenu } from "./Burgermenu";
import { Header } from "./Header";

export function HeaderHandler() {
    const [screenSize, setScreenSize] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize);
    }, [])

    return(
    <div>
        {
            screenSize > 768 ? (
                <Header />
            ) : (
                <Burgermenu />
            )
        }
    </div>
    )


}