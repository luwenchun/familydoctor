/**
 * Created by luwenchun on 2017/11/7.
 */
/**
 * @pragam
 * @id ��ȡԪ��id
 * @obj���ѡ��
 * @callback ���ѡ��ص�����
 * ****/
;
(function($) {
    var ModSelect = function(id, obj, callback) {
        var _this = this;
        _this.elm = $(id);
        _this.config = {
            optiontext: ['123', '657'],
            selctList: [{
                name: 'Ĭ��',
                value: ''
            }],
            name: "selectName"
        }
        _this.fun = callback;
        //�ϲ�Ĭ�Ϻʹ��ݵ�������Ϣ
        if (_this.getConfig(obj)) {
            $.extend(_this.config, _this.config, obj);
        }
        // console.log(_this.config);
        _this.createHtml();
        _this.effect();
        _this.selectList();
    }
    ModSelect.prototype = {
        //��ȡ������Ϣ
        getConfig: function(obj) {
            if (obj && obj != '') {
                return obj;
            } else {
                return false;
            }
        },
        //����select
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
        //�����¼�
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
        //��ӵ��ʱ��
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
    //���õķ�ʽ��$$("#selectbox",{"selctList":['ddd11','ddd2'],"name"��"addd"},function(elm){});
})(jQuery);