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

export const getOnePost = async (id) => {
    const { data } = await http.get(`/posts/getOne/mobile/${id}`);
    return data
}
