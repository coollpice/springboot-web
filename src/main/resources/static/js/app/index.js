
// index.js

const listBtn = document.querySelector("#listBtn");
if(listBtn){
    listBtn.addEventListener('click' , (e) => {
        e.preventDefault();

        $.ajax({
            type : 'GET',
            dataType : 'json',
            url : '/posts/test',
            contentType: 'application/json; charset=utf-8',
        }).done(function(data){
            console.log(data);
        }).fail(function(error){
            console.log(error);
        });
    });
}

const main = {
    init:function() {
        const saveBtn = document.querySelector("#btn-save");
        const updateBtn = document.querySelector("#btn-update");
        const deleteBtn = document.querySelector("#btn-delete");

        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.save();
            });
        }

        if (updateBtn) {
            updateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.update();
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click' , (e) =>{
               e.preventDefault();
               this.delete();

            });
        }
    },

    save: function () {
        const data = {
            title: document.querySelector("#title").value,
            author: document.querySelector("#author").value,
            content: document.querySelector("#content").value
        };


        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function () {
            alert('글이 등록되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert("정회원만 글을 작성할 수 있습니다");
        });



        // Fetch 사용해보기
        /*

        //////   형식   ////////

        fetch(url , option)
            .then((res) => {
                if (res.status == 200) {
                    res.json();
                }
        }).then((data) => {
            console.log(data)
        });

        ///////////////////////


        const option = {
            method : 'POST',
            headers : {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(data)
        };

           fetch('/api/v1/posts', option)
            .then((res) => {
                if (res.status === 200) {
                    alert('글이 등록되었습니다.');
                    window.location.href = '/';
                }else{
                    alert(`에러발생 : ${res.status}`);
                }
            });
ㅔ
            */

    },

    update : function(){
        const data = {
            title: document.querySelector("#title").value,
            content: document.querySelector("#content").value
        }

        const id = document.querySelector("#id").value;

        $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            url: '/api/v1/posts/' + id,
            data: JSON.stringify(data)
        }).done(function (data) {
            alert('글이 수정되었습니다');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },

    delete: function () {
        const id = document.querySelector("#id").value;

        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            url: '/api/v1/posts/' + id
        }).done(function (data) {
            alert('글이 삭제되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    }
};

main.init();


