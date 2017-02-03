'use strict';

module.exports = app => {
    class HackerNews extends app.Service {

        constructor(ctx) {
            super(ctx);
            this.config = this.ctx.app.config.news;
            this.serverUrl = this.config.serverUrl;
            this.pageSize = this.config.pageSize;
        }

        * request(api, opts) {
            const options = Object.assign({
                dataType: 'json',
            }, opts);

            const result = yield this.ctx.curl(`${this.serverUrl}/${api}`, options);
            return result.data;
        }

        * getTopStories(page, pageSize) {
            page = page || 1;
            pageSize = pageSize || this.pageSize;

            const result = yield this.request('topstories.json', {
                data: {
                    orderBy: '"$key"',
                    startAt: `"${pageSize * (page - 1)}"`,
                    endAt: `"${pageSize * page - 1}"`,
                }
            });
            return Object.keys(result).map(key => result[key]);
        }

        * getItem(id) {
            return yield this.request(`item/${id}.json`);
        }

        * getUser(id) {
            return yield this.request(`user/${id}.json`);
        }
    }

    return HackerNews;
};