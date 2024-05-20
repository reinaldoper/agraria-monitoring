const URL = 'http://localhost:3001'

export const fetchUsers = async (path, options) => {
    const response = await fetch(`${URL}/${path}`, options)
    const data = await response.json()
    return data
}
