const bodyEl = document.querySelector('body');
const outputEl = document.getElementById('output');
const infoEl = document.getElementById('info');
const imagesEl = document.getElementById('images');
const urlBase = `https://res.cloudinary.com/dzdv2gzrk/`;
const imageTransformation = ['w_400', 't_square', 't_gsquare'];
let tag = `kitchens`;
let url = `https://res.cloudinary.com/dzdv2gzrk/image/list/${tag}.json`;

function tagSelected(tag) {
    url = `https://res.cloudinary.com/dzdv2gzrk/image/list/${tag}.json`;
    console.log('tag clicked:', tag);
    updatePage();
}
function openModal(imageUrl) {
    console.log(typeof imageUrl, imageUrl);
    const modalEl = document.createElement('div');
    const loadingEl = document.createElement('span');
    const closeEl = document.createElement('span');
    const imageEl = document.createElement('img');

    imageEl.src = `${urlBase}${imageTransformation[0]}${imageUrl}`;
    imageEl.className = 'modal-image';

    modalEl.id = 'modal';

    loadingEl.classList.add('loading');
    loadingEl.innerText = 'loading...';

    closeEl.classList.add('close-btn');
    closeEl.innerText = 'CLOSE';

    modalEl.addEventListener('click', closeModal);
    modalEl.appendChild(imageEl);
    modalEl.appendChild(loadingEl);
    modalEl.appendChild(closeEl);
    modalEl.classList.add('animate-s');
    modalEl.classList.add('animate-f');

    bodyEl.appendChild(modalEl);
}
function closeModal(e) {
    const el = e.target;
    const modalEl = document.getElementById('modal');
    console.log(e);
    if (el.id === 'modal' || el.className === 'close-btn') {
        modalEl.remove();
    }
}
async function getImages(url) {
    const response = await fetch(url);
    const data = await response.json();
    const imgList = await data.resources;
    return await imgList;
}

async function updateImages(images) {
    images.forEach((image) => {
        if (image.format !== 'svg') {
            const imageEl = document.createElement('img');
            const imageUrl = `/v${image.version}/${image.public_id}.${image.format}`;
            imageEl.src = `${urlBase}${imageTransformation[1]}${imageUrl}`;
            imageEl.alt = image.context ? image.context.custom.alt : 'image';
            imageEl.classList.add('thumbnail');
            imageEl.setAttribute('onClick', `openModal('${imageUrl}')`);
            imagesEl.appendChild(imageEl);
        }
    });
}

async function updatePage() {
    imagesEl.innerHTML = '';
    const images = await getImages(url);
    const page = await updateImages(images);
}

updatePage();
