import {getFeed, getAllFeed, post} from '../utils/httpRequestAda';
import {FeedValue, DrawFeedValue} from '../interfaces/ada';

class AdaAPI {
  public static async getLastFeedValue(feed_key: string) {
    const response: DrawFeedValue = await getFeed(`feeds/${feed_key}`);
    return response.last_value;
  }

  public static async getAllLastFeedValue() {
    const response: DrawFeedValue[] = await getAllFeed('feeds');
    // only get key and value
    const results: FeedValue[] = [];
    response.forEach((e) => {
      results.push({key: e.key, value: e.last_value});
    });
    return results;
  }

  public static async createFeedValue(feed_key: string, data: Object) {
    const response = await post(`feeds/${feed_key}/data`, data);
    return response;
  }
}

export default AdaAPI;
