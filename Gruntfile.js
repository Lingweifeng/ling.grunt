/* ! 
 * todo: gruntfiles.js监控，更改后重新启动browserSync;
 */
module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%= pkg.respath %>/assets/html/**/*.html',
                        '<%= pkg.respath %>/assets/image/**/*.{png,jpg,jpeg,gif}',
                        '<%= pkg.respath %>/assets/images/**/*.{png,jpg,jpeg,gif}',
                        '<%= pkg.respath %>/assets/css/**/*.css',
                        '<%= pkg.respath %>/assets/css/**/*.min.css',
                        '<%= pkg.respath %>/assets/js/**/*.js',
                        '!<%= pkg.respath %>/assets/js/**/*.min.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: "./",
                    startPath: "<%= pkg.respath %>/assets/html/index.html"
                }
            },
            app: {
                bsFiles: {
                    src: [
                        '<%= pkg.respath %>/public/html/**/*.html',
                        '<%= pkg.respath %>/public/image/**/*.{png,jpg,jpeg,gif}',
                        '<%= pkg.respath %>/public/images/**/*.{png,jpg,jpeg,gif}',
                        '<%= pkg.respath %>/public/css/**/*.css',
                        '<%= pkg.respath %>/public/css/**/*.min.css',
                        '<%= pkg.respath %>/public/js/**/*.js',
                        '!<%= pkg.respath %>/public/js/**/*.min.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: "./",
                    startPath: "<%= pkg.respath %>/public/html/index.html"
                }
            }
        },
		watch: {
			options: {
				livereload: true
			},
			configFiles: {
				files: [ 'Gruntfile.js' ],
				options: {
					reload: true
				}
			},
			html: {
				files: [
					'<%= pkg.respath %>/assets/html/**/*.html',
					'<%= pkg.respath %>/public/html/**/*.html'
				]
			},
			images: {
				files: [
					'<%= pkg.respath %>/assets/image/**/*.{png,jpg,jpeg,gif}',
					'<%= pkg.respath %>/public/image/**/*.{png,jpg,jpeg,gif}',
					'<%= pkg.respath %>/assets/images/**/*.{png,jpg,jpeg,gif}',
					'<%= pkg.respath %>/public/images/**/*.{png,jpg,jpeg,gif}'
				]
			},
			css: {
				files: [
					'<%= pkg.respath %>/assets/css/**/*.css', 
					'<%= pkg.respath %>/public/css/**/*.css'
				]
			},
			sass: {
				files: [
					'<%= pkg.respath %>/assets/sass/**/*.scss'
				],
				tasks: [ 'sass:dev' ]
			},
			scripts: {
				files: [
					'<%= pkg.respath %>/assets/js/**/*.js', 
					'<%= pkg.respath %>/public/js/**/*.js'
				]
			}
		},
		uglify: {
			options: {
		      	banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
		        '<%= grunt.template.today("yyyy-mm-dd") %> */'
		    },
		    dev: {
				files: {
			        '<%= pkg.respath %>/assets/js/lib/iscroll.min.js': ['<%= pkg.respath %>/assets/js/lib/iscroll.js']
			    }
			},
			app: {
				files: [{
					expand: true,
					cwd: '<%= pkg.respath %>/assets/',
					src: [ 'js/**/*.js' ],
					dest: '<%= pkg.respath %>/public/',
					ext: '.min.js'
				}]
			}
		},
		imagemin: {
			app: {
				files: [{
					expand: true,
					cwd: '<%= pkg.respath %>/assets/images/',
					src: [ '**/*.{png,jpg,jpeg,gif}' ],
					dest: '<%= pkg.respath %>/public/images/'
				}]
			}
		},
		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: '<%= pkg.respath %>/assets/sass',
					src: [ '*.scss','!mixin.scss' ],
					dest: '<%= pkg.respath %>/assets/css',
					ext: '.css'
				}]
			}
		},
		clean: {
			app: [ '<%= pkg.respath %>/public' ]
		},
        //压缩HTML
	    htmlmin: {
	      	options: {
	      		removeComments: true,  //清除HTML注释
	        	//collapseWhitespace: true,  //压缩HTML
	        	collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input />
	        	//removeAttributeQuotes: true,  //尽可能地删除html属性的引号
	        	removeRedundantAttributes: true,  //当属性值是默认值时删除该属性
	        	useShortDoctype: true,  //doctype使用简短形式(h5)
	        	//removeOptionalTags: true,  //尽量移除不需要的闭合标签
        		removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        		removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        		removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        		minifyJS: true,  //压缩页面JS
        		minifyCSS: true  //压缩页面CSS
	      	},
	      	app: {
	      		files: [{
	          		expand: true,
	          		cwd: '<%= pkg.respath %>/public/html',
	          		src: ['**/*.html'],
	          		dest: '<%= pkg.respath %>/public/html'
	        	}]
	      	}
	    },
	    /* build:css ../../css/common.min.css */
	    useminPrepare: {
	    	html: ['<%= pkg.respath %>/assets/html/*.html'],
	    	options: {
	    		dest: '<%= pkg.respath %>/public/html/'
	    	}
	    },
	    usemin: {
	    	html: ['<%= pkg.respath %>/public/html/*.html'],
	    	options: {
	    		assetsDirs: ['<%= pkg.respath %>/public/css']
	    	}
		},
		copy: {
			app: {
				expand: true,
	          	cwd: '<%= pkg.respath %>/assets/',
	          	src: ['html/**/*.html','css/**/*.css','!css/mixin.css','js/**/*.js','fonts/*.{eot,svg,ttf,woff}'],
	          	dest: '<%= pkg.respath %>/public'
			}
		},
		includereplace: {
		    dev: {
		      	files: [{
	          		expand: true,
	          		cwd: '<%= pkg.respath %>/assets/html/',
	          		src: ['**/*.html'],
	          		dest: '<%= pkg.respath %>/assets/html-built'
	        	}]
		    },
		    app: {
		      // Files to perform replacements and includes with
		      src: '<%= pkg.respath %>/public/html/**/*.html',
		      // Destination directory to copy files to
		      dest: '<%= pkg.respath %>/public/html/'
		    }
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
	grunt.loadNpmTasks( 'grunt-express' );
	grunt.loadNpmTasks( 'grunt-open' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks( 'grunt-browser-sync' );
	//grunt.loadNpmTasks('grunt-include-replace');

	// 开发
	grunt.registerTask( 'dev', [ 'browserSync:dev', 'watch'] );

	// 打包
	grunt.registerTask( 'app', [
		'clean', 			//删除旧的built文件
		'copy:app',
		'useminPrepare',
		'cssmin:generated',
		'uglify:generated',
		'concat:generated',
		'usemin',           //usemin 合并压缩css
		'htmlmin:app', 		//html压缩
		'imagemin:app',		//图片压缩
		'browserSync:app', 		//打开浏览器预览
		'watch'				//监控
	]);

	grunt.registerTask( 'default', [ 'copy:app' ] );

}