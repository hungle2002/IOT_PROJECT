import * as request from "../utils/http";

export const search = async ({ path, options = null }) => {
  try {
    const response = await request.get(path, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const create = async ({ path, data, options = null }) => {
  try {
    const response = await request.post(path, data, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const update = async ({ path, data, options = null }) => {
  try {
    const response = await request.put(path, data, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
