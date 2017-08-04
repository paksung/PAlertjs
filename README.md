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
* type   
* title
* content
* backdrop
* animate
* autoClose
