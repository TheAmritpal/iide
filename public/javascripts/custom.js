const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

$('#addBlog').on('submit', function (e) {
    e.preventDefault()
    const data = new FormData(this);
    axios.post('/addBlog', data).then((res) => {
        if (res.data.status == 200) {
            alert(`${res.data.message}`, 'success')
            $(this).trigger('reset');
        } else if (res.data.status == 400) {
            alert(`${res.data.message}`, 'danger')
        }
    }).catch(err => {
        alert(`${err.message}`, 'danger');
    })
});

let card = document.getElementsByClassName("navigate");
if (card) {
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', function () {
            let id = this.getAttribute('blogId')
            window.location.href = `/details/${id}`;
        })
    }
}

$(".delBlog").on('click', function () {
    let id = $(this).attr('data-id');
    axios.delete('/deleteBlog', { data: { id } }).then(res => {
        if (res.data.status == 200) {
            alert(`${res.data.message}`, 'success')
            setTimeout(() => {
                location.reload();
            }, 500);
        } else if (res.data.status == 400) {
            alert(`${res.data.message}`, 'danger')
        }
    }).catch(err => {
        alert(`${err.message}`, 'danger');
    })
})

$(".editBlog").on('click', function () {
    let id = $(this).attr('data-id');
    window.location.href = `editBlog/${id}`
})

$("#editBlog").on('submit', function (e) {
    e.preventDefault();
    let data = new FormData(this)
    axios.put('/updateBlog', data).then((res) => {
        if (res.data.status == 200) {
            alert(`${res.data.message}`, 'success')
            $(this).trigger('reset');
        } else if (res.data.status == 400) {
            alert(`${res.data.message}`, 'danger')
        }
    }).catch(err => {
        alert(`${err.message}`, 'danger');
    })
})