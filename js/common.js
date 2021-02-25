// 时间处理
function formatDate(date, format = "YYYY-MM-DD HH:mm:ss") {
    return moment(date).format(format)
};
// 加载公共页面
$("#navCommon").load("./common/nav.html", function () {
    loadCate();
});

function startNProgress() {
    NProgress.set(0.4);
    let interval = setInterval(function() {
        NProgress.inc();
    },200)
    $(window).on("load",()=>{
        clearInterval(interval);
        NProgress.done()
    })
}
// 开启进度条
startNProgress();
// 获取所有分类
async function loadCate() {
    let data = await axios.get("/cate");
    let liHtml = ``;
    data.forEach(({
        name,
        cat_id
    }) => {
        liHtml += `<li><a href="/cate.html?cat_id=${cat_id}">${name}</a></li>`;
    });
    $("#cateId").html(liHtml);

};
// 获取当前地址栏中的查询字符串
function searchParam(url) {
    let search = location.search.slice(1) || '';
    let params = {};
    search && search.split('&').forEach(v => {
        let [key, value] = v.split('=')
        params[key] = decodeURIComponent(value)
    })
    return params;
}