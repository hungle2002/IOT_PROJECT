// axios using
import axios from 'axios';
import {DrawFeedValue, FeedUpdateValue} from '../interfaces/ada';

const request = axios.create({
  baseURL: 'https://io.adafruit.com/api/v2/heriota/',
  headers: {
    // 'X-AIO-KEY': 'aio_oyxU69bENbv6Eb4N46eTy2W4MIbD',
  },
});

async function getFeed(path: string, options: undefined | Object = undefined): Promise<DrawFeedValue> {
  const response = await request.get(path, options);
  return response.data;
}

async function getAllFeed(path: string, options: undefined | Object = undefined): Promise<DrawFeedValue[]> {
  const response = await request.get(path, options);
  return response.data;
}

async function post(
  path: string,
  data: undefined | Object,
  options: undefined | Object = undefined
): Promise<FeedUpdateValue> {
  const response = await request.post(path, data, options);
  return response.data;
}

async function patch(path: string, data: undefined | Object, options: undefined | Object = undefined): Promise<Object> {
  const response = await request.patch(path, data, options);
  return response.data;
}

export {getFeed, getAllFeed, post, patch};
