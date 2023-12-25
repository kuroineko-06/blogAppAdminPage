import client from "./client"

export const getAllUser = async () => {
    try {
        const { data } = await client(`/user/list-user`);
        return data;
    }
    catch (error) {
        const { respond } = error
        if (respond?.data) {
            return respond.data;
        }
        return { error: error.message || error };
    }
};


export const getUserById = async (userId) => {
    try {
        const { data } = await client(`/user/list-user-id/${userId}`);
        return data;
    }
    catch (error) {
        const { respond } = error
        if (respond?.data) {
            return respond.data;
        }
        return { error: error.message || error };
    }
};

export const deleteUser = async (userId) => {
    try {
        const { data } = await client.delete(`/user/delete-user/${userId}`);
        return data;
    }
    catch (error) {
        const { respond } = error
        if (respond?.data) {
            return respond.data;
        }
        return { error: error.message || error };
    }
};

export const addUser = async (userInfo) => {
    try {
        const { data } = await client.post(`/user/add-user`, {...userInfo});
        return data;
    }
    catch (error) {
        const { respond } = error
        if (respond?.data) {
            return respond.data;
        }
        return { error: error.message || error };
    }
};

export const updateUser = async (userId, values) => {
    try {
        const { data } = await client.put(`/user/update-user/${userId}`, values);
        return data;
    }
    catch (error) {
        const { respond } = error
        if (respond?.data) {
            return respond.data;
        }
        return { error: error.message || error };
    }
};