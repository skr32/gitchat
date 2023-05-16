import { useState } from 'react';
import './style.scss';

export function ChangeTheme() {
  const [checked, setChecked] = useState(false);

  function handleChange() {
    if (checked) {
        console.log('set data-theme to dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('data-theme', 'dark');
    } else {
        console.log('set data-theme to light');
        document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('data-theme', 'light');
    }
    setChecked(!checked);
  }

  return (
    <li className='changetheme'>
      <input
        type='checkbox'
        id='changeTheme'
        name='changeTheme'
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor='changeTheme'></label>
    </li>
  );
}
