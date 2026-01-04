let list = document.querySelectorAll('.list .item');

list.forEach(item => {
    item.addEventListener('click', function (event){
        if(item.classList.contains('active')){
            if(event.target.classList.contains('dropdown')){
                item.classList.remove('active');
            }
        }else{
            item.classList.add('active');
        }
    })
})