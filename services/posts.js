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
    const { data } = await http.get('/posts?userId=1', {
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
    return data
}

// export const getPostReactions = async (id) => {
//     const { data } = await http.get(`/posts/reactions/${id}`);
//     return data.data.reactions
// }
