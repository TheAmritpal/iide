const Model = require('../model/userModel')
const { unlink } = require('fs/promises')

exports.index = async (req, res) => {
    const model = new Model()
    const [blogs] = await model.getBlogs()
    let data = {
        title: 'Blogs',
        blogs,
        blogsExists: blogs.length != 0
    }
    return res.render('index', data);
}

exports.details = async (req, res) => {
    const { id } = req.params
    const model = new Model()
    const [blog] = await model.getBlog(id)
    if (blog.length == 0) {
        return res.redirect('/')
    }
    let data = {
        title: blog[0].title,
        blog: blog[0]
    }
    return res.render('details', data);
}
exports.add = async (req, res) => {
    let data = {
        title: 'Add Blog'
    }
    return res.render('add', data);
}
exports.view = async (req, res) => {
    const model = new Model()
    const [blogs] = await model.getBlogs()
    let data = {
        title: 'List Blogs',
        blogs,
        blogExists: blogs.length != 0
    }
    return res.render('list', data);
}

exports.addBlog = async (req, res) => {
    const { title, description } = req.body
    const data = {
        title,
        description,
        image: `${req.file.filename}`,
        created_date: new Date(),
        status: 1
    }
    try {
        let model = new Model()
        const [response] = await model.addBlog(data);
        if (response.affectedRows == 1) {
            let resData = {
                message: "Blog Added",
                status: 200
            }
            return res.status(200).json(resData)
        } else {
            let resData = {
                message: "Something Went Wrong",
                status: 400
            }
            unlink(`public/${req.file.path}`)
            return res.status(400).json(resData)
        }
    } catch (error) {
        let resData = {
            message: error.message,
            status: 401
        }
        unlink(`public/${req.file.path}`)
        return res.status(401).json(resData)
    }

}

exports.deleteBlog = async (req, res) => {
    let id = req.body.id
    if (!id) return res.status(400).json({
        message: "Blog not Found",
        status: 400
    })
    let model = new Model()
    let [file] = await model.getBlog(id);
    try {
        let [response] = await model.deleteBlog(id)
        if (response.affectedRows == 1) {
            let resData = {
                message: "Blog Deleted",
                status: 200
            }
            unlink(`public/${file[0].image}`)
            return res.status(200).json(resData)
        } else {
            let resData = {
                message: "Something Went Wrong",
                status: 400
            }
            return res.status(400).json(resData)
        }
    } catch (error) {
        let resData = {
            message: error.message,
            status: 401
        }
        return res.status(401).json(resData)
    }
}

exports.editBlog = async (req, res) => {
    let id = req.params.id
    const model = new Model()
    let [blog] = await model.getBlog(id)
    if (blog.length == 0) return res.redirect("/view")
    let data = {
        title: blog[0].title,
        blog: blog[0]
    }
    return res.render('editBlog', data);
}

exports.updateBlog = async (req, res) => {
    const model = new Model();
    const [prevData] = await model.getBlog(req.body.id)
    const data = {
        id: req.body.id,
        title: req.body.title ? req.body.title : prevData[0].title,
        description: req.body.description ? req.body.description : prevData[0].description,
        image: req.file ? `${req.file.filename}` : prevData[0].image,
        updated_date: new Date(),
        status: 1
    }
    try {
        let [response] = await model.updateBlog(data)
        if (response.affectedRows == 1) {
            let resData = {
                message: "Blog Updated",
                status: 200
            }
            if (req.file) {
                unlink(`public/${prevData[0].image}`)
            }
            return res.status(200).json(resData)
        } else {
            let resData = {
                message: "Something Went Wrong",
                status: 400
            }
            return res.status(400).json(resData)
        }
    } catch (error) {
        let resData = {
            message: error.message,
            status: 401
        }
        return res.status(401).json(resData)
    }
}