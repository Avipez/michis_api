console.log("hello world");

const RANDOM_API_URL = "https://api.thecatapi.com/v1/images/search?limit=2";
const FAVORITES_API_URL = "https://api.thecatapi.com/v1/favourites?api_key=e69ffd14-1134-4bf3-b6dc-b1cb922a6d16"
const SAVE_IMG_URL = "https://api.thecatapi.com/v1/favourites?api_key=e69ffd14-1134-4bf3-b6dc-b1cb922a6d16"
const BUTTON = document.getElementById('button');
const SPAN_ERROR = document.getElementById('error');

//e69ffd14-1134-4bf3-b6dc-b1cb922a6d16  APIKEY

const getRandomCatImage = async () => {
    await fetch(RANDOM_API_URL)
        .then(response => response.json())
        .then(data => {
            console.log("Random");
            console.log(data);
            document.getElementById('img-1').src = data[0].url;
            document.getElementById('img-2').src = data[1].url;
        }
        )
}

const getFavoritesImages = async () => {
    const res = await fetch(FAVORITES_API_URL)
    const data = await res.json();

    console.log("Favoritos");
    console.log(data);
    if(res.status !== 200) {
        SPAN_ERROR.innerHTML = "Hubo un error " + res.status + data.message;
    }
    /* document.getElementById('fav-1').src = data[0].url;
     document.getElementById('fav-2').src = data[1].url; */
}

const saveFavoriteImg = async () => {
    const res = await fetch(SAVE_IMG_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            image_id: "dcv"
        })
    })

    const data = await res.json();
    console.log("Save");
    console.log(res);

    if(res.status !== 200) {
        SPAN_ERROR.innerHTML = "Hubo un error " + res.status + data.message;
    }
}

getRandomCatImage();
getFavoritesImages();

BUTTON.addEventListener('click', getRandomCatImage);
