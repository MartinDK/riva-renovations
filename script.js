const bodyEl = document.querySelector('body');
const outputEl = document.getElementById('output');
const infoEl = document.getElementById('info');
const imagesEl = document.getElementById('images');
const urlBase = `https://res.cloudinary.com/dzdv2gzrk/`;
const imageTransformation = ['w_400', 't_square', 't_gsquare'];
let tag = `favourite`;
let url = `https://res.cloudinary.com/dzdv2gzrk/image/list/${tag}.json`;

function tagSelected(tag) {
    url = `https://res.cloudinary.com/dzdv2gzrk/image/list/${tag}.json`;
    console.log('tag clicked:', tag);
    updatePage();
}
function openModal(imageUrl) {
    console.log(typeof imageUrl, imageUrl);
    const modalEl = document.createElement('div');
    const imageEl = document.createElement('img');
    imageEl.src = `${urlBase}${imageTransformation[0]}${imageUrl}`;
    modalEl.id = 'modal';
    modalEl.addEventListener('click', closeModal);
    modalEl.appendChild(imageEl);
    bodyEl.appendChild(modalEl);
    modalEl.classList.add('animate-s');
    modalEl.classList.add('animate-f');
}
function closeModal(e) {
    const el = e.path[0];
    console.log(e.path[0]);
    if (el.id === 'modal') {
        e.path[0].remove();
    }
}
async function getImages(url) {
    const response = await fetch(url);
    const data = await response.json();
    const imgList = await data.resources;
    console.log('res', response);
    // console.log('data', JSON.stringify(data.resources, null, 2));
    // outputEl.textContent = JSON.stringify(data.resources, null, 2);
    return await imgList;
}

async function updateImages(images) {
    infoEl.innerHTML = `<span>tag:</span>${tag} <span>no_images:</span>${images.length} <span>transformation:</span>${imageTransformation}`;
    // console.log('images', images);
    images.forEach((image) => {
        if (image.format !== 'svg') {
            const imageEl = document.createElement('img');
            const imageUrl = `/v${image.version}/${image.public_id}.${image.format}`;
            imageEl.src = `${urlBase}${imageTransformation[1]}${imageUrl}`;
            imageEl.alt = image.context ? image.context.custom.alt : 'image';
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
