const signUrl = 'https://jkgame.myj.com.cn/v2/sdk-config';

const jsApiList = [
    // 分享朋友
    // 'onMenuShareAppMessage',
    // 分享朋友圈
    // 'onMenuShareTimeline',
    'hideMenuItems',
];
const wxMenu = {
    share: [
        'menuItem:share:appMessage',
        'menuItem:share:timeline',
        'menuItem:share:qq',
        'menuItem:share:weiboApp',
        'menuItem:share:facebook',
        'menuItem:share:QZone'
    ],
    copy: ['menuItem:copyUrl'],
    originPage: ['menuItem:originPage']
};

let link = require('@assets/imgs/share_icon.png');
if (link.indexOf('//') === 0) {
    link = location.protocol + link;
}

const defaultShareInfo = {
    title: '李庆萍董事长发表二〇二一 新年致辞',
    desc: '李庆萍董事长发表二〇二一 新年致辞',
    link: window.location.href.split('#')[0].split('?')[0],
    imgUrl: 'http://static.via.cool' + link,
    type: 'link',
    dataUrl: ''
};

export {
    signUrl,
    jsApiList,
    defaultShareInfo,
    wxMenu
};