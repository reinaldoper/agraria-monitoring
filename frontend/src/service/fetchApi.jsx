import { URL } from "../environment/url"

export const fetchUsers = async (path, options) => {
    const response = await fetch(`${URL}/${path}`, options)
    const data = await response.json()
    console.log(data);
    return data
}

export const fetchDevice = async (path, options) => {
    const response = await fetch(`${URL}/${path}`, options);
    if (response.ok) {
      if (response.status === 204 || response.headers.get('Content-Length') === '0') {
        return null;
      }
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.description || 'Erro desconhecido');
    }
  };
  