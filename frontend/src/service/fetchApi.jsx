import { URL } from "../environment/url"

export const fetchUsers = async (path, options) => {
    const response = await fetch(`${URL}/${path}`, options)
    const data = await response.json()
    return data
}
