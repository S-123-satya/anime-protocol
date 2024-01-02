const buyBtn =document.getElementById('buyBtn');
const imgSelect=document.getElementById('imgSelect');
const img=document.getElementById('img');

for(let i=0;i<imgSelect.children.length;i++){
    imgSelect.children[i].addEventListener('click',(e)=>{
        const oldEle=document.getElementsByClassName('z-10');
        oldEle[0].classList.remove("z-10")
        const currEle=document.getElementById(`image${e.target.id}`);
        currEle.classList.add('z-10');
    })
}
