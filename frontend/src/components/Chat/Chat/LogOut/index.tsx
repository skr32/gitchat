import './style.scss'

export function LogOut() {
    function logout() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    return (
        <div className='logout' onClick={logout}>
            Log Out
        </div>
    )
}