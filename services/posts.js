import { http } from './httpService';

export const getAll1Posts = async (kind) => {
    let params = {
        limit: 10,
        page: 1,
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