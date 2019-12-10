import { http } from './httpService';

export const getAll1Posts = async (kind, page) => {
    let params = {
        limit: 10,
        page: page,
    }
    switch (kind) {
        case 'mostRead':
            params.kind = 'mostRead'
            break;
        case 'mostComment':
            params.kind = 'mostComment';
            break;
        case 'all':
            break;
    }
    const { data } = await http.get('/posts', {
        params
    });

    return data
}

export const getMySub = async (page) => {
    let params = {
        limit: 1000,
        page: page,
    }
    const { data } = await http.get('/posts/mySubscriptions', {
        params
    });

    return data
}

export const getMyBookmarked = async () => {
    let params = {
        limit: 1000,
        page: 1,
    }
    const { data } = await http.get('/posts', {
        params
    });

    return data
}



export const searchPosts = async (query) => {
    const { data } = await http.get(`/posts?query=${query}&limit=1000`);
    return data
}

export const getOnePost = async (id) => {
    const { data } = await http.get(`/posts/getOne/mobile/${id}`);
    return data.data
}

// export const getPostReactions = async (id) => {
//     const { data } = await http.get(`/posts/reactions/${id}`);
//     return data.data.reactions
// }

export const bookmarkPost = async(id) => {
    const data = await http.put(`/posts/bookmark/${id}`);
    return data
}

export const unbookmarkPost = async(id) => {
    const data = await http.put(`/posts/unbookmark/${id}`);
    return data
}

export const reactPost = async(id,reaction) => {
    const {data} = await http.post(`/posts/reactions/${id}?react=${reaction}`);
    return data.data
}