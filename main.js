console.log("hello world");

const RANDOM_API_URL = "https://api.thecatapi.com/v1/images/search?limit=2";
const FAVORITES_API_URL = "https://api.thecatapi.com/v1/favourites";
const SAVE_IMG_URL = "https://api.thecatapi.com/v1/favourites";
const UPLOAD_IMG = "https://api.thecatapi.com/v1/images/upload";
const DELETE_IMG_API = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=e69ffd14-1134-4bf3-b6dc-b1cb922a6d16`
const BUTTON = document.getElementById('button');

const SPAN_ERROR = document.getElementById('error');

//e69ffd14-1134-4bf3-b6dc-b1cb922a6d16  APIKEY

/* const getRandomCatImage = async () => {
    await fetch(RANDOM_API_URL)
        .then(response => response.json())
        .then(data => {
            console.log("Random");
            console.log(data);
            document.getElementById('img-1').src = data[0].url;
            document.getElementById('img-2').src = data[1].url;
        }
        )
} */

async function getRandomCatImage() {
    const res = await fetch(RANDOM_API_URL);
    const data = await res.json();
    console.log("Random");
    console.log(data);

    if ( res.status !== 200 ) {
        SPAN_ERROR.innerHTML = "Hubo un error:" + res.status;
    } else {
        const img1 = document.getElementById("img-1");
        const img2 = document.getElementById("img-2");
        const btn1 = document.getElementById("random-btn_1")
        const btn2 = document.getElementById("random-btn_2")

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavoriteImg(data[0].id);
        btn2.onclick = () => saveFavoriteImg(data[1].id);
    }
}

const getFavoritesImages = async () => {
    const res = await fetch(FAVORITES_API_URL, {
        method: "GET",
        headers: {
            "x-api-key": "e69ffd14-1134-4bf3-b6dc-b1cb922a6d16"
        }
    })
    const data = await res.json();

    console.log("Favoritos");
    console.log(data);

    if(res.status !== 200) {
        SPAN_ERROR.innerHTML = "Hubo un error " + res.status + data.message;
    } else {
        const section = document.getElementById("favorite_cats");
        section.innerHTML = "";
        const h2 = document.createElement("h2");
        const h2Text = document.createTextNode("Michis favoritos");
        h2.appendChild(h2Text);

        data.forEach(michi => {
            const article = document.createElement("article");
            const img = document.createElement("img");
            const button = document.createElement("button");
            const btnText = document.createTextNode("Sacar michi de Favoritos");

            button.appendChild(btnText);
            button.onclick = () => deleteFavoriteCat(michi.id);
            img.src = michi.image.url
            img.width = 150;

            article.appendChild(img);
            article.appendChild(button);

            section.appendChild(article);
        })
    }
    /* document.getElementById('fav-1').src = data[0].url;
     document.getElementById('fav-2').src = data[1].url; */
}

const saveFavoriteImg = async (id) => {
    const res = await fetch(SAVE_IMG_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "x-api-key": "e69ffd14-1134-4bf3-b6dc-b1cb922a6d16"
    },
        body: JSON.stringify({
            image_id: id
        })
    })

    const data = await res.json();
    console.log("Save");
    console.log(res);

    if(res.status !== 200) {
        SPAN_ERROR.innerHTML = "Hubo un error " + res.status + data.message;
    } else {
        getFavoritesImages();
    }
}

async function deleteFavoriteCat(id) {
    const res = await fetch(DELETE_IMG_API(id), {
        method: "DELETE",
    });
    const data = await res.json();

    if( res.status !== 200) {
        SPAN_ERROR.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log("Michi eliminado con exito ):");
        getFavoritesImages();
    }
}

getRandomCatImage();
getFavoritesImages();

async function uploadCatImg() {
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);

    const res = await fetch(UPLOAD_IMG, {
        method: "POST",
        headers: {
            /* "Content-Type": "multipart/form-data;", */
            "x-api-key": "e69ffd14-1134-4bf3-b6dc-b1cb922a6d16"
        },
        body: formData,
    });

    const data = await res.json();
    console.log("Minino en la web");

    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
    }
    else {
        console.log("Foto en favoritos :)");
        console.log({ data });
        console.log(data.url);
        saveFavoriteImg(data.id);
    }
}

BUTTON.addEventListener('click', getRandomCatImage);
