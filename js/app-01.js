;(function(){
	// alert(123)
	const todos = [
		{
			id: 1,
			title: "吃饭",
			done: true
		},
		{
			id: 1,
			title: "睡觉",
			done: false
		},
		{
			id: 1,
			title: "逛吃",
			done: true
		},
		{
			id: 1,
			title: "困了",
			done: false
		}
	]
	var app = new Vue({
		el: "#todoapp",
		data: {
			inputTxt: "",
			todos,
			message: "hello",
			currentEdit: null,
			backTitle: ""
		},
		methods: {
			// //添加任务
			// addTodo: function(num,e){
			// 	// console.log(e.keyCode)
			// 	// if(e.keyCode === 13){	
			// 	// }
			// 	const todos = this.todos
			// 	const inputTxt = this.inputTxt
			// 	const lastItem = todos[todos.length-1]
			// 	const id = lastItem ? lastItem.id+1 : 1
			// 	//解决空数组问题

			// 	//非空判断
			// 	if(inputTxt.trim().length === 0){
			// 		return
			// 	}
			// 	this.todos.push({
			// 		id,
			// 		title: inputTxt,
			// 		done: false

			// 	})
			// 	this.inputTxt = "";
			// },

			// //移除任务
			// removeTodo: function(index){
			// 	this.todos.splice(index,1)
			// },

			// //获得编辑样式
			// getEdit: function(item){
			// 	this.backTitle = item.title
			// 	//备份被被编辑任务的title,以便之后取消编辑的时候能够还原title
			// 	console.log(123);
			// 	this.currentEdit = item
			// },

			// //保存编辑
			// saveEdit: function(item,index){ 
			// 	console.log(this.currentEdit);
			// 	console.log(item.title);
			// 	if(item.title.trim().length === 0){
			// 		this.todos.splice(index,1)
			// 		return
			// 	}
			// 	this.currentEdit = null
			// },

			// //取消编辑，
			// cancelEdit: function(){
			// 	this.currentEdit.title = this.backTitle
			// 	this.currentEdit = null
			// //取消编辑的时候esc会出发了失去焦点的事件（null无法读取title属性）
			// //因此保存编辑功能中不要使用currentEdit来获取title属性
				
			// }




			
		}
	})

})()


