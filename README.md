grunt前端开发脚手架
----------------------------------------------------------------------------------------------------
node安装完成后，安装grunt运行需要的模块，

测试Nodejs是否已安装：node -v

测试npm版本号：npm -v

npm install -g grunt-cli(全局grunt)

测试grunt是否已安装： grunt -V

然后：

1. 直接全部安装，进入根目录，shift+右键，点击打开命令行窗口，输入：

npm install

或者一个一个安装：

npm install grunt --save-dev
npm install grunt-express --save-dev
......


2. 通过taobao npm 镜像安装：进入根目录，shift+右键，点击打开命令行窗口，输入：

npm install -g cnpm --registry=https://registry.npm.taobao.org

cnpm install

或者一个一个安装：

cnpm install grunt --save-dev
cnpm install grunt-express --save-dev
......

----------------------------------------------------------------------------------------------------

开发环境(grunt dev)即自动弹出浏览器窗口(已生成 grunt dev.bat 文件自动启动)，自动运行监控任务：

1. 'express:dev': 文件路径'<%= pkg.respath %>'

2. 'open:dev'：路径: 'http://localhost:3000/html'

3. 'watch'：<br>
	html：自动刷新(done)<br>
	sass: 自动编译(done)<br>
	css: 自动刷新(done)<br>
	js: 自动刷新(done)

----------------------------------------------------------------------------------------------------

生产环境(grunt app)自动运行任务如下: <br>

1. 'cssmin:app': css压缩(done)<br>

2. 'uglify:app': js合并压缩(done)<br>

3. 'imagemin:app': 图片压缩(done)<br>

4. htmlmin:app: html压缩<br>

5. 将引用的静态资源替换为压缩合并过的版本<br>

6. 同开发环境一样发布预览 'express:dev'->'open:dev', (生产环境只可预览，要调试需要从开发环境发布)
