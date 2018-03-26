/**
 * Created by luwenchun on 2017/10/30.
 */
//封装公共方法

//
//  url跳转问题
//
function LoadAjaxContent(url){
    $('.preloader').show();
    $.ajax({
        //mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
        url: url,
        type: 'GET',
        success: function(data) {
            $('#ajax-content').html(data);
            $('.preloader').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        },
        dataType: "html",
        async: false
    });
}
//页面初始化

    //侧边栏菜单的显示和隐藏问题
    $('.show-sidebar').on('click', function () {
        $('div#main').toggleClass('sidebar-show');
    });
    //侧边栏导航跳转问题
    var ajax_url = location.hash.replace(/^#/, '');
    if (ajax_url.length < 1) {
        ajax_url = 'ajax/tdgk.html';
    }
    LoadAjaxContent(ajax_url);
    //侧边栏菜单缩放问题
    $('.main-menu').on('click', 'a', function (e) {
        var parents = $(this).parents('li');
        var li = $(this).closest('li.dropdown');
        var another_items = $('.main-menu li').not(parents);
        another_items.find('a').removeClass('active');
        another_items.find('a').removeClass('active-parent');
        if ($(this).hasClass('dropdown-toggle') || $(this).closest('li').find('ul').length == 0) {
            $(this).addClass('active-parent');
            $(this).children('.pull-right').removeClass("icon-arrow").addClass("icon-arrow-click");
            var current = $(this).next();
            if (current.is(':visible')) {
                li.find("ul.dropdown-menu").slideUp('fast');
                li.find("ul.dropdown-menu a").removeClass('active');
                $(this).children('.pull-right').removeClass("icon-arrow-click").addClass("icon-arrow");
            }
            else {
                another_items.find("ul.dropdown-menu").slideUp('fast');
                current.slideDown('fast');

            }
        }
        else {
            if (li.find('a.dropdown-toggle').hasClass('active-parent')) {
                var pre = $(this).closest('ul.dropdown-menu');
                pre.find("li.dropdown").not($(this).closest('li')).find('ul.dropdown-menu').slideUp('fast');
            }
        }
        if ($(this).hasClass('active') == false) {
            $(this).parents("ul.dropdown-menu").find('a').removeClass('active');
            $(this).addClass('active')

        }
        if ($(this).hasClass('ajax-link')) {
            e.preventDefault();
            if ($(this).hasClass('add-full')) {
                $('#content').addClass('full-content');
            }
            else {
                $('#content').removeClass('full-content');
            }
            var url = $(this).attr('href');
            window.location.hash = url;
            LoadAjaxContent(url);
        }
        if ($(this).attr('href') == '#') {
            e.preventDefault();
        }
    });
    //主体内容展示
    var height = window.innerHeight - 49;
    $('#main').css('min-height', height)
        //主体区卡片区放大
        .on('click', '.expand-link', function (e) {
            var body = $('body');
            e.preventDefault();
            var box = $(this).closest('div.box');
            var button = $(this).find('i');
            button.toggleClass('fa-expand').toggleClass('fa-compress');
            box.toggleClass('expanded');
            body.toggleClass('body-expanded');
            var timeout = 0;
            if (body.hasClass('body-expanded')) {
                timeout = 100;
            }
            setTimeout(function () {
                box.toggleClass('expanded-padding');
            }, timeout);
            setTimeout(function () {
                box.resize();
                box.find('[id^=map-]').resize();
            }, timeout + 50);
        })
        //主体区卡片区缩小
        .on('click', '.collapse-link', function (e) {
            e.preventDefault();
            var box = $(this).closest('div.box');
            var button = $(this).find('i');
            var content = box.find('div.box-content');
            content.slideToggle('fast');
            button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
            setTimeout(function () {
                box.resize();
                box.find('[id^=map-]').resize();
            }, 50);
        })
        //主体区卡片区关闭
        .on('click', '.close-link', function (e) {
            e.preventDefault();
            var content = $(this).closest('div.box');
            content.remove();
        });
    //header区域点击
    $('#top-panel').on('click','a', function(e){
        if ($(this).hasClass('ajax-link')) {
            e.preventDefault();
            if ($(this).hasClass('add-full')) {
                $('#content').addClass('full-content');
            }
            else {
                $('#content').removeClass('full-content');
            }
            var url = $(this).attr('href');
            window.location.hash = url;
            LoadAjaxContent(url);
        }
    });
    //鼠标回车返回搜索页面
    $('#search').on('keydown', function(e){
        if (e.keyCode == 13){
            e.preventDefault();
            $('#content').removeClass('full-content');
            ajax_url = 'ajax/page_search.html';
            window.location.hash = ajax_url;
            LoadAjaxContent(ajax_url);
        }
    });
