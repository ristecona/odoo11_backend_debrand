odoo.define('odoo11_backend_debrand.UserMenu', function (require) {
    "use strict";

    /**
     * This widget is appended by the webclient to the right of the navbar.
     * It displays the avatar and the name of the logged user (and optionally the
     * db name, in debug mode).
     * If clicked, it opens a dropdown allowing the user to perform actions like
     * editing its preferences, accessing the documentation, logging out...
     */

    var UserMenu = require('web.UserMenu');
    //避免错误，要再定义
    var session2 = require('web.session');
    var documentation_url = 'http://www.sina.com.cn';
    var documentation_dev_url;
    var support_url;
    var account_title;
    var account_url;

    UserMenu.include({
        init: function () {
            this._super.apply(this, arguments);
            var self = this
            var session = this.getSession();
            var lang_list = '';

            self._rpc({
                model: 'res.lang',
                method: 'search_read',
                domain: [],
                fields: ['name', 'code'],
                lazy: false,
            }).then(function (res) {
                _.each(res, function (lang) {
                    var a = '';
                    if (lang['code'] === session.user_context.lang) {
                        a = '<i class="fa fa-check"></i>';
                    } else {
                        a = '';
                    }
                    lang_list += '<li><a href="#" data-lang-menu="lang" data-lang-id="' + lang['code'] + '"><img class="flag" src="odoo11_backend_debrand/static/src/img/flags/' + lang['code'] + '.png"/>' + lang['name'] + a + '</a></li>';
                });
                lang_list += '<li class="divider"></li>';
                $('switch-lang').replaceWith(lang_list);
            })

            //取参数
            self._rpc({
                model: 'ir.config_parameter',
                method: 'search_read',
                domain: [['key', '=like', 'app_%']],
                fields: ['key', 'value'],
                lazy: false,
            }).then(function (res) {
                $.each(res, function (key, val) {
                    if (val.key == 'app_documentation_url')
                        documentation_url = val.value;
                    if (val.key == 'app_documentation_dev_url')
                        documentation_dev_url = val.value;
                    if (val.key == 'app_support_url')
                        support_url = val.value;
                    if (val.key == 'app_account_title')
                        account_title = val.value;
                    if (val.key == 'app_account_url')
                        account_url = val.value;
                    //  控制显示
                    if (val.key == 'app_show_lang' && val.value == "False") {
                        $('switch-lang').hide();
                    }
                    if (session.user_context.uid!=1 || (val.key == 'app_show_debug' && val.value == "False")) {
                        $('[data-menu="debug"]').parent().hide();
                        $('[data-menu="debugassets"]').parent().hide();
                        $('[data-menu="quitdebug"]').parent().hide();
                    }
                    if (val.key == 'app_show_documentation' && val.value == "False") {
                        $('[data-menu="documentation"]').parent().hide();
                    }
                    if (val.key == 'app_show_documentation_dev' && val.value == "False") {
                        $('[data-menu="documentation_dev"]').parent().hide();
                    }
                    if (val.key == 'app_show_support' && val.value == "False") {
                        $('[data-menu="support"]').parent().hide();
                    }
                    if (val.key == 'app_show_account' && val.value == "False") {
                        $('[data-menu="account"]').parent().hide();
                    }
                    if (val.key == 'app_account_title' && val.value) {
                        $('[data-menu="account"]').html(account_title);
                    }
                    if (val.key == 'app_show_poweredby' && val.value == "False") {
                        $('.o_sub_menu_footer').hide();
                    }
                });
            })
        },
        /**
         * @override
         * 由于odoo11 没传ev到事件，所以要重载
         */
        start: function () {
            var self = this;
            return this._super.apply(this, arguments).then(function () {
                //语言切换特殊处理
                self.$el.on('click', 'li a[data-lang-menu]', function (ev) {
                    ev.preventDefault();
                    var f = self['_onMenuLang']
                    f.call(self, $(this));
                });
                //控制debug显示
                var mMode = 'normal';
                if (window.location.href.indexOf('debug') != -1)
                    mMode = 'debug';
                if (window.location.href.indexOf('debug=assets') != -1)
                    mMode = 'assets';
                if (mMode == 'normal')
                    $('[data-menu="quitdebug"]').parent().hide();
                if (mMode == 'debug')
                    $('[data-menu="debug"]').parent().hide();
                if (mMode == 'assets')
                    $('[data-menu="debugassets"]').parent().hide();
            });
        },
        _onMenuAccount: function () {
            window.open(account_url, '_blank');
        },
        _onMenuDocumentation: function () {
            window.open(documentation_url, '_blank');
        },
        _onMenuSupport: function () {
            window.open(support_url, '_blank');
        },
        //增加的方法
        _onMenuDebug: function () {
            window.location = $.param.querystring(window.location.href, 'debug');
        },
        _onMenuDebugassets: function () {
            window.location = $.param.querystring(window.location.href, 'debug=assets');
        },
        _onMenuQuitdebug: function () {
            window.location.search = "?";
        },
        _onMenuDocumentation_dev: function () {
            window.open(documentation_dev_url, '_blank');
        },
        _onMenuLang: function (ev) {
            var self = this;
            var lang = ($(ev).data("lang-id"));
            var session = this.getSession();
            return this._rpc({
                model: 'res.users',
                method: 'write',
                args: [session.uid, {'lang': lang}],
            }).then(function (result) {
                self.do_action({
                    type: 'ir.actions.client',
                    res_model: 'res.users',
                    tag: 'reload_context',
                    target: 'current',
                });
            });
        },
    })

});
