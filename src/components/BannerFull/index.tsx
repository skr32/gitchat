import { useState } from 'react';
import './style.scss'

// to do: import images

const HoverSections = [
  // !important only include 3 sections 
  {
    header: 'Section 1',
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
    link: '/strategie',
    linkText: 'Work',
    // image: image1
  },
  {
    header: 'Section 2',
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
    link: '/technologie',
    linkText: 'databases',
    // image: image2
  },
  {
    header: 'Section 3',
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
    link: '/begeisterung',
    linkText: 'gitlab',
    // image: image3
  }
]

export function BannerFull() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [lastHovered, setLastHovered] = useState(null);

  function handleMouseOver(index: any) {
    setHoveredIndex(index);
    setLastHovered(index);

    const element = document.getElementById(`section-${index}`);
    const p = element?.childNodes[1];
    const button = element?.childNodes[2];
    if (p) {
      // to do: underlined as error because .style cannot refer to childnode
      p.style.display = "block";
    }
    if (button) {
      button.style.display = "block";
    }
    if (element) {
      element.style.backgroundColor = "rgba(0,0,0,0.3)";
    }
  }

  function handleMouseOut() {
    setHoveredIndex(1);
    setLastHovered(1);
    const element = document.getElementById(`section-${lastHovered}`);
    const p = element?.childNodes[1];
    const button = element?.childNodes[2];
    if (p) {
      p.style.display = "none";
    }
    if (button) {
      button.style.display = "none";
    }
    if (element) {
      element.style.backgroundColor = "";
    }
  }

  const bannerFullStyle = hoveredIndex !== null
    ? {
      backgroundImage: `url(${HoverSections[hoveredIndex].image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '99.4vw',
    }
    : {};

  const [isHovered, setIsHovered] = useState(false);


  return (
    <div className="banner-full" style={bannerFullStyle}>
      {HoverSections.map(({ header, text, link, linkText }, index) => (
        <span
          id={`section-${index}`}
          key={index}
          className="banner-full__section"
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={handleMouseOut}
        >
          <h2>{header}</h2>
          <p style={{ display: isHovered ? 'block' : 'none' }}>
            {text}
          </p>
          <button className='banner-full__button' style={{ display: isHovered ? 'block' : 'none' }}>
            <a href={link}>{linkText}</a>
          </button>
        </span>
      ))}
    </div>
  )
}