import httpService from './http.service'
import localStorageService from './localStorage.service'
const userEndpoint = 'user/'

const userService = {
    update: async (id, content) => {
        // console.log(id)
        // console.log(content)
        const { data } = await httpService.patch(userEndpoint + id, content)
        return data
    },
    get: async () => {
        const { data } = await httpService.get(userEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload)
        return data
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndpoint + localStorageService.getUserId())
        return data
    }
    // ,
    // fetchAll: async  () => {
    //     const {data} = await httpService.get(qualityEndpoint)
    //     return data
    // },
    // create: async (content) => {
    //     const {data} = await httpService.post(qualityEndpoint, content)
    //     return data
    // },
    // delete: async (id) => {
    //     const {data} = await httpService.delete(qualityEndpoint + id)
    //     return data
    // }
}

export default userService
