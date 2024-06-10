"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpRequestAda_1 = require("../utils/httpRequestAda");
class AdaAPI {
    static async getLastFeedValue(feed_key) {
        const response = await (0, httpRequestAda_1.getFeed)(`feeds/${feed_key}`);
        return response.last_value;
    }
    static async getAllLastFeedValue() {
        const response = await (0, httpRequestAda_1.getAllFeed)('feeds');
        // only get key and value
        const results = [];
        response.forEach((e) => {
            results.push({ key: e.key, value: e.last_value });
        });
        return results;
    }
    static async createFeedValue(feed_key, data) {
        const response = await (0, httpRequestAda_1.post)(`feeds/${feed_key}/data`, data);
        return response;
    }
}
exports.default = AdaAPI;
