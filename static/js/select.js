/**
 * Created by luwenchun on 2017/11/7.
 */
/**
 * @pragam
 * @id 获取元素id
 * @obj添加选项
 * @callback 点击选项回调函数
 * ****/
;
(function($) {
    var ModSelect = function(id, obj, callback) {
        var _this = this;
        _this.elm = $(id);
        _this.config = {
            optiontext: ['123', '657'],
            selctList: [{
                name: '默认',
                value: ''
            }],
            name: "selectName"
        }
        _this.fun = callback;
        //合并默认和传递的配置信息
        if (_this.getConfig(obj)) {
            $.extend(_this.config, _this.config, obj);
        }
        // console.log(_this.config);
        _this.createHtml();
        _this.effect();
        _this.selectList();
    }
    ModSelect.prototype = {
        //获取配置信息
        getConfig: function(obj) {
            if (obj && obj != '') {
                return obj;
            } else {
                return false;
            }
        },
        //创建select
        createHtml: function() {
            var _this = this;
            var _html = '<div class="select-mod">' +
                '<div class="select-text">' +
                '<input name="' + _this.config.name + '" type="hidden" type="text" value="' + (_this.config.selctList[0].value || '') + '" />' +
                '<label title="' + _this.config.selctList[0].name + '">' + _this.config.selctList[0].name + '</label>' +
                '<i></i>' +
                '</div>' +
                '<ul class="select-lsit" style="display:none">';
            for (var i = 0; i < _this.config.selctList.length; i++) {
                _html += '<li title="' + _this.config.selctList[i].name + '" value="' + (_this.config.selctList[i].value || '') + '">' + _this.config.selctList[i].name + '</li>';
            }
            _html += '</ul>' +
                '</div>';
            _this.elm.html(_html);
        },
        //下拉事件
        effect: function() {
            var _this = this;
            _this.elm.find(".select-text").click(function(event) {
                event.stopPropagation();
                $(this).next("ul").slideToggle();
            });
            $(document).click(function() {
                _this.elm.find("ul").slideUp("slow");
            });
        },
        //添加点击时间
        selectList: function() {
            var _this = this;
            _this.elm.find(".select-lsit li").click(function(event) {
                event.stopPropagation();
                //alert($(this).index());
                $(this).parent("ul").slideToggle();
                _this.elm.find(".select-text input").val($(this).attr("value"));
                _this.elm.find(".select-text label").html($(this).html());
                if (_this.fun) {
                    _this.fun($(this));
                }
            });
        }
    }
    window.$$ = function(id, obj, callback) {
        new ModSelect(id, obj, callback)
    }
    //调用的方式：$$("#selectbox",{"selctList":['ddd11','ddd2'],"name"："addd"},function(elm){});
})(jQuery);