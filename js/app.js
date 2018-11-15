//匿名自调用函数作用：防止变量污染，模仿块级作用域
//传递window作用: 声明模块依赖项(主要),减少作用域查找范围提高代码性能
//因为函数的参数是按值传递的
// (function(window,document,$){

// })(window,document,$);


;(function(Vue){
	// const todos = [
	// 		{
	// 			id: 1,
	// 			title: "吃饭",
	// 			done: true
	// 		},
	// 		{
	// 			id: 1,
	// 			title: "睡觉",
	// 			done: false
	// 		},
	// 		{
	// 			id: 1,
	// 			title: "逛吃",
	// 			done: true
	// 		}
	// 	];
	// window.localStorage.setItem("todos",JSON.stringify(todos));
	const todos = JSON.parse(window.localStorage.getItem("todos")) || []
	const app = new Vue({
		el: "#todoapp",
		data: {
			message: "hello",
			// todos: JSON.parse(window.localStorage.getItem("todos")),
			todos,
			currentEdit: null,
			// inputTxt: "",
			hash: "",
			filterTodos: ""
		},
		methods: {
			addTodo: function(e){
				const todos = this.todos
				const input = e.target
				const value = input.value
				if(!value.trim()){ return }
				const lastItem = todos[todos.length-1]
				const id = lastItem ? lastItem.id+1 : 1
				todos.push({
						id,
						title: value,
						done: false
				})
				// console.log(e.targ	et)
				input.value = "";
				console.log(e.target.value)
			},
			removeTodo: function(index){
				this.todos.splice(index,1)
			},
			getEdit: function(item){
				this.currentEdit = item

			},
			cancelEdit: function(){
				this.currentEdit = null
			},
			saveEdit: function(item,index,e){
				item.title = e.target.value
				const value = e.target.value 
				if(!value.trim()){
					this.todos.splice(index,1)
				}
				this.currentEdit = null
			},
			// remainCount: function(){
			// 	// const remainCount = this.todos.filter(function(item){return !item.done}).length 
			// 	// return remainCount(不推荐在menthods中使用因为循环每次都会计算消耗性能)
			// 	//可以使用计算属性听侦器中使用
			// }


			//清楚所有已完成项
			clearAllDone: function(){
				//不能使用正向遍历，由于数组是动态的因此美删除一项数据索引就变了
				//解决方式1反向遍历，解决方式2正向遍历if语句中加一句i--即可
				console.log(this.todos)

				for(let i=this.todos.length-1; i>=0; i--){
					if(this.todos[i].done){
						console.log(i)
						this.todos.splice(i,1);
						console.log(this.todos)
					}
				}
			},
			// toggleAll: function(e){
			// 	const checked = e.target.checked
			// 	this.todos.forEach(function(item){
			// 		item.done = checked
			// 	})
			// }使用计算属性优化该功能
		},
		computed: {
			//计算属性听侦器中的计算会缓存
			//计算属性就是带有行为的属性
			//本质是方法，但是按照属性来使用，属性的值是函数的返回值
			//优势：计算属性会把计算的结果进行缓存，如果使用多次计算该属性，实际上只会执行一次
			//如果该函数写在了menthods中，则函数被调用一次就会执行一次
			//简写方式默认是访问get属性
			remainCount: function(){
				const remainCount = this.todos.filter(function(item){return !item.done}).length 
				return remainCount
			},

			//全选框的状态功能,
			toggleAllState: {
				get: function(){
					//计算属性默认指向的是get方法的返回值
					//计算属性的值永远指向get的返回值，与set方法无关
					return this.todos.every(function(item){return item.done })	
				},
				set: function(val){
					//当计算属性 = xxx（为计算属性赋值）赋值的时候会自动调用set方法
				 	//为计算属性赋值会执行set函数，函数传递的参数val是被赋的值xxx
				 	this.todos.forEach(function(item){
				 		item.done = val
				 	})
				}
			}

			
		},
		watch: {
			//侦听器，app实例选项
			//可以监视的实例成员
			todos: {
				handler: function(val,oldVal){
					//默认状态下只能监视数组成员的增加和删除，
					//数组需要被深度监视，需要配置
					window.localStorage.setItem("todos",JSON.stringify(this.todos))
					// window.localStorage.setItem('todos', JSON.stringify(this.todos))
				},
				deep: true
				//默认只能监视对象或者数组的一层数据，
				//true可以检测到数组对象内的成员
			}
	
		}

	});

	window.app = app;


	/*
	http: //hostname主机名:port端口号/path路径#hash锚点
	window有一个事件onhashchange事件，绑定事件处理函数
	*/	
	window.onhashchange = function(){
		const {hash} = window.location
		//console.log(hash)
		app.hash = hash
		//console.log(hash)
		switch(hash){
			case '':
				app.filterTodos = app.todos;
				//console.log(app.filterTodos)
				break;
			case '#/':
				app.filterTodos = app.todos;
				//console.log(app.filterTodos)
				break;
			case "#/active":
				app.filterTodos = app.todos.filter(function(item){
					return !item.done
				})
				//console.log(app.filterTodos)
				break;
			case "#/completed":
				app.filterTodos = app.todos.filter(function(item){
					return item.done
				})
				//console.log(app.filterTodos)
				break;


		}
	}

	window.onhashchange()


})(Vue);


//注意知识点和专业说法：对象没有执行环境，函数有执行环境（this指向的外部环境，因此可以解释this指向没有深度问题）



