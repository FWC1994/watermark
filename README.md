# watermark
网页水印库的封装 支持文字+图片 可伸缩

## 效果展示
![watemark](https://github.com/FWC1994/watermark/blob/master/demo/demo.gif?raw=true)
## 原理讲解

1、计算水印添加的容器的高度和宽度。

2、根据输入的横向间隔和纵向间隔以及水印的大小计算填充满这个页面所需要的水印行数和列数。

3、如果直接按照行数和列数绘制水印可能会导致 边界出现 部分空白的现象，所以需要根据行数和列数重新计算水印的间隔。

使水印可以刚好填充整个容器。

4、根据行数和列数创建DOM节点 按照行或者列绘制水印。

5、为了水印DOM不会影响下面其他DOM元素的鼠标事件，需要设置核心的CSS属性 pointer-events: none;

6、监听浏览器窗口大小改变事件，重新绘制水印。

## 使用方法
```javascript
    var waterMark = new WaterMark(document.getElementsByTagName('body')[0],{
        text:"这是一条水印",
        color:"#000000",
        imageSrc:'./logo.png'
    });
```
## 外部接口
* show()    显示水印
* hide()    隐藏水印
* refresh()  容器大小改变手动调用
