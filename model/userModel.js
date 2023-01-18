const db = require('../db/db')

module.exports = class User {

    getBlogs() {
        const query = "SELECT * from blog where status = 1";
        return db.query(query);
    }

    getBlog(id) {
        const query = "SELECT * from blog where status = 1 and id = ?";
        return db.query(query, [id]);
    }

    addBlog(data) {
        const query = "INSERT INTO blog (title,description,image,created_date,status) VALUES (?,?,?,?,?)";
        return db.query(query, [data.title, data.description, data.image, data.created_date, data.status]);
    }

    deleteBlog(id) {
        const query = "DELETE from blog where id = ?";
        return db.query(query, [id])
    }

    updateBlog(data) {
        const query = "UPDATE blog set title = ? , description = ? , image = ?, updated_date = ? where id = ?";
        return db.query(query, [data.title, data.description, data.image, data.updated_date, data.id])
    }
}   