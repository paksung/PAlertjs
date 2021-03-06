# PAlertjs
闲时为熟悉ES6写的alert小插件，对ES6的class特性不支持的浏览器无法使用。对小屏幕和移动端的显示做了些兼容。
* 支持标题和提示内容的文本修改
* 默认只显示‘关闭’按钮，但可设置‘确认’按钮并显示
* 可修改按钮的文本，添加点击事件
* 弹窗的提示类型有success、error、warning、info、question五种
* 支持自动关闭功能
## 使用前
         引入css文件：<link rel="stylesheet" type="text/css" href="PAlert.min.css" />
         引入js文件：<script type="text/javascript" src="PAlert.min.js"></script>
## 使用方法
示例：

         var pAlert = new PAlert(options);
         pAlert.show();
或者

         new PAlert(options).show();         //该对象下的方法都支持链式调用

### 传入的配置项options
创建弹窗时，需传入该窗口的配置项，类型为Object。包含的属性有：
* type   String   弹窗的类型，默认‘info’,可填的类型有success、error、warning、info、question
* title  String   弹窗的标题
* content   String   提示的内容
* backdrop  Boolean  点击背景是否关闭弹窗，默认false
* animate   Boolean  弹出和消失的动画，默认true
* autoClose Number   弹窗自动关闭的时间，以毫秒数计算，默认0不开启自动关闭

### 方法
#### show()
开启弹窗
#### hide()
关闭弹窗
#### setConfirm(val, cb)
设置确认按钮的文本和点击事件，确认按钮默认不显示，调用该方法后将显示。
参数：
val   String   按钮显示的文本，默认是‘确认’
cb    Function 该按钮的点击方法
#### setCancel(val, cb)
设置取消/关闭按钮的文本和点击事件，不管是否设置了点击的方法，点击该按钮后都会关闭弹窗。
参数：
val   String   按钮显示的文本，默认是‘关闭’
cb    Function 点击该按钮的方法
