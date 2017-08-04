class PAlert {
    constructor(options) { //检测传入的参数类型是否为对象，若不是则抛出错误
        if (arguments.length > 0 && (typeof options).toLowerCase() !== 'object') {
            throw new TypeError(options + 'is not a Object');
        }

        //传入的配置信息覆盖默认值
        this.options = Object.assign({
            'type': 'info', //弹框的类型
            'title': '通知', //标题
            'content': '这是一个提示框，请在此输入你所需要的提示信息。', //内容
            'backdrop': false, //背景触发关闭
            'animate': true, //是否开启动画
            'autoClose': 0 //自动关闭的时间
        }, options);

    }

    //打开弹框
    show() {
        //若已存在弹框，则先删除
        if (document.querySelector('#modal_mask')) {
            document.body.removeChild(document.querySelector('#modal_mask'));
        }
        let _self = this;
        //创建背景
        _createMask();
        //创建弹框
        _createMD();
        //点击背景关闭窗口
        if (this.options.backdrop) {
            this._mask.onclick = (e) => {
                this.hide();
            };
        }
        //自动关闭弹框
        if (this.options.autoClose > 0) {
            let count = Math.ceil(this.options.autoClose / 1000),
                cbtn = document.getElementById('PMClose'),
                cval = cbtn.innerHTML;
            let autoTimer = setInterval(() => {
                count -= 1;
                cbtn.innerHTML = cval + ' (' + count + ')';
                if (count <= 0) {
                    this.hide();
                }
            }, 1000);
        }
        //设置按钮
        this.setCancel('关 闭', (e) => {
            this.hide();
            e.target.disabled = 'disabled';
        }).setConfirm('', (e) => {
            e.target.disabled = 'disabled';
        });
        document.getElementById('PMConfirm').style.display = 'none';

        /**
         * 创建遮罩层
         */
        function _createMask() {
            _self._mask = document.createElement('div');
            _self._mask.id = 'modal_mask';
            _self.options.animate ? addClass(_self._mask, 'fadeIn') : null;
            document.body.appendChild(_self._mask);
            if (needHide()) {
                addClass(document.body, 'hide_scroll');
            }
        }

        /**
         * 创建弹出框
         */
        function _createMD() {
            let tip = '',
                dialogStr = '',
                color = '',
                dialogBg = document.createElement('div'); //弹出框的背景
            dialogBg.className = 'dialog_bg';
            _self.options.animate ? addClass(dialogBg, 'mdScaleIn') : null; //是否执行动画
            switch (_self.options.type) {
                case 'success':
                    tip = '✔';
                    color = 'success';
                    break;
                case 'error':
                    tip = '✖';
                    color = 'error';
                    break;
                case 'warning':
                    tip = '!';
                    color = 'warning';
                    break;
                case 'info':
                    tip = '!';
                    color = 'info';
                    break;
                case 'question':
                    tip = '?';
                    color = 'question';
                    break;
                default:
                    break;
            }
            dialogStr = '<div class="tip_icon"><i class="' + color + '">' + tip + '</i></div><div class="content"><h3></h3><p></p><div class="Pbtns"><button id="PMConfirm">确 定</button><button id="PMClose">关 闭</button></div></div>';

            dialogBg.innerHTML = dialogStr;
            //阻止冒泡，防止点击弹窗面板时关闭窗口
            dialogBg.onclick = (e) => {
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            };
            _self._mask.appendChild(dialogBg);
            //添加标题和内容，不解析其中可能含有的标签
            document.querySelector('.content>h3').innerText = _self.options.title;
            document.querySelector('.content>p').innerText = _self.options.content;
        }

        return this;
    }



    /**
     * 关闭弹窗
     */
    hide() {
        if (this.options.animate) {
            addClass(this._mask, 'fadeOut');
            this._mask.addEventListener('animationend', (e) => {
                removeClass(document.body, 'hide_scroll');
                document.getElementById('modal_mask') ? document.body.removeChild(this._mask) : null;
            }, false);
        } else {
            removeClass(document.body, 'hide_scroll');
            this._mask ? document.body.removeChild(this._mask) : null;
        }

        return this;
    }

    /**
     * 设置确认按钮
     * @param {String} val 按钮的文字
     * @param {function} cb 按钮执行的函数
     */
    setConfirm(val, cb) {
        let btn = document.getElementById('PMConfirm');
        btn.style.display = 'block';
        if (val) {
            btn.innerHTML = val;
        }
        if ((typeof cb).toLowerCase() === 'function') {
            btn.addEventListener('click', cb);
        } else {
            throw new TypeError(cb + 'is not a function!');
        }
        return this;
    }

    /**
     * 设置取消按钮
     * @param {String} val 按钮的文字
     * @param {function} cb 按钮执行的函数
     */
    setCancel(val, cb) {
        let btn = document.getElementById('PMClose');
        if (val) {
            btn.innerHTML = val;
        }
        if ((typeof cb).toLowerCase() === 'function') {
            btn.addEventListener('click', cb);
        } else {
            throw new TypeError(options + 'is not a function!');
        }
        return this;
    }
}

/**
 * 添加元素的指定类名
 * @param {DOM Object} ele 需要添加类名的元素
 * @param {String} cls 类名
 */
function addClass(ele, cls) {
    let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className.match(reg) ? null : ele.className += ' ' + cls;
}

/**
 * 删除元素的指定类名
 * @param {DOM Object} ele 需要删除类名的元素
 * @param {String} cls 类名
 */
function removeClass(ele, cls) {
    let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    if (ele.className.match(reg)) {
        ele.className = ele.className.replace(reg, ' ');
    }
}

/**
 * 是否需要隐藏滚动条，并加上padding-right
 * @return {Boolean} true 需要 false 不需要
 */
function needHide() {
    let isMobile = navigator.userAgent.indexOf('Mobile') > -1;
    if (isMobile) { //移动端浏览器的滚动条不占位置，故不需要
        return false;
    } else {
        return window.innerHeight < document.body.scrollHeight; //有滚动条时则需要
    }
}

//窗口resize时是否需要处理滚动条
window.onresize = function(e) {
    if (document.querySelector('#modal_mask') && needHide()) {
        addClass(document.body, 'hide_scroll');
    } else {
        removeClass(document.body, 'hide_scroll');
    }
}