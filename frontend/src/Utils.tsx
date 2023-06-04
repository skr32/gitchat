import jwt_decode from 'jwt-decode' 

export const currentChatId: string = '';
export const backend_url: string = window.location.origin + ':5000' || 'http://localhost:5000';
// export const backend_url: string = process.env.REACT_APP_BACKEND_URL || window.location.origin + ':5000' || 'http://localhost:5000';

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


