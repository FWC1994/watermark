/*
 * 水印
 * 说明: 可以添加图片水印和文字水印
 * 当水印容器大小发生变化时需要调用refresh方法重新填充水印
 *  */

function WaterMark(node, options){
    if(!options){
        options = {};
    }
    this._init(node, options);
    this._resizeSpace();
    this._fillContent();
    this._bindEvent();
}
WaterMark.prototype = {
    /* 初始化 */
    _init: function(node, options){
        this.options = {
            node:node,                                               // 添加水印的节点
            text: options.text?options.text:"",                      // 水印文字内容
            opacity: options.opacity?options.opacity:0.15,           // 水印透明度
            startX: options.startX?options.startX:0,                 // X轴开始位置
            startY: options.startY?options.startY:15,                // Y轴开始位置
            xSpace: 100,                                             // 横向间隔
            ySpace: 50,                                              // 纵向间隔
            rows: 0,                                                 // 行数
            cols:0,                                                  // 列数
            markWidth: options.markWidth?options.markWidth:210,      // 水印高度
            markHeight: options.markHeight?options.markHeight:80,    // 水印宽度
            angle: options.angle?options.angle:20,                   // 倾斜角度
            fontSize: options.fontSize?options.fontSize:12,          // 字体大小
            color: options.color?options.color:"#000",               // 字体颜色
            fontFamily: options.fontFamily?options.fontFamily: '微软雅黑', // 字体
            imageSrc: options.imageSrc?options.imageSrc: '',         // 图片地址
        };
        node.style.overflow = 'hidden'
    },
    /* 自动调整每个水印间距 使其可以填充整个页面 */
    _resizeSpace: function(){
        this.pageWidth =  Math.max(this.options.node.scrollWidth,this.options.node.clientWidth);
        this.pageHeight =  1 + Math.max(this.options.node.scrollHeight,this.options.node.clientHeight);
        // 计算旋转后的元素所占宽度和高度
        // var radian = this.options.angle / 180 * Math.PI;
        // var newMarkHeight = this.options.markHeight * Math.cos(radian) + this.options.markWidth * Math.sin(radian);

        // 获取水印行数 并根据行数调整间距使水印填满屏幕
        this.options.rows = Math.ceil((this.pageHeight - this.options.startY) / (this.options.markHeight + this.options.ySpace));
        this.options.ySpace = Math.floor((this.pageHeight - this.options.startY) / this.options.rows - this.options.markHeight);
        // 获取水印列数 并根据列数调整间距使水印填满屏幕
        this.options.cols =  1 + Math.ceil((this.pageWidth - this.options.startX) / (this.options.markWidth + this.options.xSpace));
        this.options.xSpace = Math.floor((this.pageWidth - this.options.startX) / this.options.cols - this.options.markWidth);
    },
    /* 填充水印 */
    _fillContent:function(){
        var domTemp = document.createDocumentFragment();
        for(var i = 0; i < this.options.rows; i++){
            var posY = i * (this.options.markHeight + this.options.ySpace) + this.options.startY;
            for(var j = 0; j < this.options.cols; j++){
                var posX = j * (this.options.markWidth + this.options.xSpace) + this.options.startX;
                domTemp.appendChild(this._createWaterMark(posX, posY));
            }
        }
        this.markContainer = document.createElement('div');
        this.markContainer.className = 'water-mark-container';
        this.markContainer.appendChild(domTemp);
        this.options.node.appendChild(this.markContainer);
    },
    /* 构造每个水印节点 */
    _createWaterMark: function(x, y){
        var markDiv = document.createElement('div');
        markDiv.className = 'water-mark-item';
        if(this.options.imageSrc){
            markDiv.innerHTML = "<div>"+this.options.text+"</div><img src='"+this.options.imageSrc+"'/>";
        }else{
            markDiv.appendChild(document.createTextNode(this.options.text));
        }
        //设置水印div倾斜显示
        markDiv.style.webkitTransform = "rotate(-" + this.options.angle + "deg)";
        markDiv.style.MozTransform = "rotate(-" + this.options.angle + "deg)";
        markDiv.style.msTransform = "rotate(-" + this.options.angle + "deg)";
        markDiv.style.OTransform = "rotate(-" + this.options.angle + "deg)";
        markDiv.style.transform = "rotate(-" + this.options.angle + "deg)";
        markDiv.style.position = "absolute";
        markDiv.style.left = x + 'px';
        markDiv.style.top = y + 'px';
        markDiv.style.overflow = "hidden";
        markDiv.style.zIndex = "99999";
        markDiv.style.width = this.options.markWidth + 'px';
        markDiv.style.height = this.options.markHeight + 'px';
        markDiv.style.display = "block";
        markDiv.style.pointerEvents='none';
        markDiv.style.opacity = this.options.opacity;
        markDiv.style.textAlign = "center";
        markDiv.style.fontFamily = this.options.fontFamily;
        markDiv.style.fontSize = this.options.fontSize;
        markDiv.style.color = this.options.color;
        return markDiv;
    },
    /* 事件监听 */
    _bindEvent: function(){
        var that = this;
        // 监听浏览器大小变化事件 动态调整水印
        window.onresize = function() {
            that.refresh()
        }
    },
    /* 刷新水印 水印容器大小发生变化是调用 */
    refresh: function() {
        if(this.markContainer){
            this.markContainer.innerHTML = ''
        }
        this._init(this.options.node, this.options);
        this._resizeSpace();
        this._fillContent();
    },
    /* 显示水印图层 */
    show: function(){
        this.markContainer.style.display = 'block';
    },
    /* 隐藏水印图层 */
    hide: function(){
        this.markContainer.style.display = 'none';
    }
};