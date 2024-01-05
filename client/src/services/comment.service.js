import httpService from './http.service'
const commentEndpoint = 'comment/'

const commentService = {
    // update: async (id, content) => {
    //     const {data} = await httpService.put(qualityEndpoint + id, content)
    //     return data
    // },
    createComment: async (comment) => {
        // console.log(comment)
        const { data } = await httpService.post(commentEndpoint, comment)
        return data
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: 'pageId',
                equalTo: `${pageId}`
            }
        })
        return data
    },
    removeComment: async (id) => {
        const { data } = await httpService.delete(commentEndpoint + id)
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

export default commentService
