
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = appInfo => {
    const config = {};

    config.keys = appInfo.name + '123456';

    config.siteFile = {
        '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.png')),
    };

    config.news = {
        pageSize: 30,
        serverUrl: 'https://hacker-news.firebaseio.com/v0',
    };

    return config;
};