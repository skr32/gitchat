import jwt_decode from 'jwt-decode' 

export const currentChatId: string = '';

// backend_url change port to 5000 for local development
export const backend_url: string = window.location.origin === 'http://localhost:8080' || window.location.origin === 'http://localhost'
  ? 'http://localhost:5000'
  : window.location.origin;


export const getCurrentUsername = () => {
    const token = localStorage.getItem('token')
    if(!token) return null
    const decoded: { name: string } = jwt_decode(token)
    return decoded.name
}

export const getCurrentUserId = () => {
    const token = localStorage.getItem('token')
    if(!token) return null
    const decoded: { id: string } = jwt_decode(token);
    return decoded.id
}

export const getAuthToken = (): string | null => {
  const token: string | null = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  return token;
};


