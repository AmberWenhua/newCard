const u = navigator.userAgent;
/**
 * 是否在微信中打开
 */
const isWeixinBrowser = ()=> /micromessenger/i.test(u);
/**
 * 是否Android
 */
const isAndroid = ()=> u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
/**
 * 是否ios
 */
const isIos = ()=> !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

export {
    isWeixinBrowser,
    isAndroid,
    isIos,
};

