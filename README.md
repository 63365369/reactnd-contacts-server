# MyReads Project

This is the starter template for the final assessment project for Udacity's React Fundamentals course. The goal of this template is to save you time by providing a static example of the CSS and HTML markup that may be used, but without any of the React code that is needed to complete the project. If you choose to start with this template, your job will be to add interactivity to the app by refactoring the static code in this template.

Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

##步骤1
列表和查询拆分为2个组件ListBooks和SearchBooks，并且使用url的方式访问。
主页面简化为：
<div className="app">        
          <Route exact path="/" render={() =>(        
            <ListBooks              
            />
          )}/>     
          <Route path="/search" render={() =>(        
            <SearchBooks              
            />
          )}/>   
      </div>
把ListBooks和SearchBooks相关的渲染拆分出去。

##步骤2 为查询按钮增加链接功能，使其能正常跳转。
##步骤3 
调用componentDidMount生命周期事件获取图书列表。
  componentDidMount(){
    BooksAPI.getAll().then(
      (books) =>{this.setState({books:books})}
    )
  }

在app.js增加状态设置
<ListBooks   
              books={this.state.books}           
            />

在listbook.js直接调用查询
this.props.books.map((book) => (book.titles））

##步骤4通过shelf不同筛选三种不同的书架展示
开始时采用以下方法，
        let currentlyReadingBooks,wantToReadBooks,readBooks
        currentlyReadingBooks= books.filter( book => book.shelf==='currentlyReading' ) 
        wantToReadBooks  = books.filter( book => book.shelf==='wantToRead' ) 
        readBooks = books.filter( book => book.shelf==='read' )
该方法需要为每个书架写一次代码，后优化为使用bookshelves在外层再做一次map

##步骤5
给select增加移动事件
onChange={(event) => this.updateShelf(book,event.target.value)}
updateShelf = (book,shelf) =>{
        BooksAPI.update(book,shelf)
    }
##步骤6增加search页面函数

##待解决:图书状态无法正确更新，1）图书状态调整后无法自动刷新主页面;--解决2）查询页面新增图书返回主页面没有自动更新；--解决3）查询页面的书籍不能对应主页面的书架状态
##待优化：图书查询功能，目前通过text的onchange实现,输入一个字符就搜索,需优化

##修改1：shelves不会变化，从state中调整到无状态组件
##修改2：shelf更新：在后端状态更新后，更新组件状态。
直接更新的父组件的books的状态？？
this.setState(state => ({
              books: this.props.books.filter(b => b.id !== book.id).concat([ book ])
            }))
##修改3：updateshelf改为app.js中定义，在ListBooks和SearchBooks中复用
##修改4（未解决）：如果想让主页和搜索页面的图书状态保持一致，这里也需要把状态传过去。在搜索页面拿到的图书列表是没有 shelf 这个属性的，这个时候就可以把两边的记录做个比较，更新搜索页面图书的 shelf 属性，这样两个页面上的图书属性就能保持一致了。

#如何运行
##STEP1 把reactnd-project-myreads-starter源码取到本地文件夹
##STEP2 运行npm install -g create-react-app安装react
##STEP3 安装运行本应用所需的包
npm install --save prop-types
npm install --save escape-string-regexp sort-by
npm install --save react-router-dom
npm install --save form-serialize
##STEP4 执行npm start 运行应用
##STEP5 打开http://localhost:3000/访问图书跟踪应用，在首页面查看书架信息并实现图书在书架之间的切换，点击右下角的+号切换到更多图书查询页面