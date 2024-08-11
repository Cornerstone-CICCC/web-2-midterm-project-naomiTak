const search_btn = document.querySelector("#search_btn")
const toggle_btn = document.querySelector("#postTypeToggle")
const about_btn = document.querySelector("#about")
const close_btn = document.querySelector("#close_btn")

about_btn.addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "grid";
})

close_btn.addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "none";
})


toggle_btn.addEventListener("click", () => {
    if(toggle_btn.checked){
        document.querySelector("body").classList.add("night-mode")
    }else{
        document.querySelector("body").classList.remove("night-mode")
    }
})
search_btn.addEventListener("click", () => {
    const keyword = document.querySelector("#keyword").value
    document.querySelector("#keyword").value = ""

    if(!keyword){
        alert("Please enter the keyword")
        return
    }
    document.querySelector("#result_card").innerHTML = ``
    buildSearchedresult(keyword)
})

async function buildSearchedresult(keyword){
    document.querySelector(".result_area_default").style.display = "none";

    const resultByKeyword = await searchByKeyword(keyword)
    console.log(resultByKeyword)

    document.querySelector("#search_result").innerText = `Search Results: ${keyword}`

    let resultCard
    console.log(resultByKeyword.length)
    if(resultByKeyword.length > 0){
        resultCards = buildCards(resultByKeyword, 12)
    }else{
        resultCards = document.createElement("h4")
        resultCards.innerText = "No Result"
    }
    
    document.querySelector("#result_card").appendChild(resultCards)
}

async function buildDefault(){
    const movieResults = await searchTrendingMovies()
    const tvsResults = await searchTrendingTVs()

    const trendMovies = buildCards(movieResults, 4)
    document.querySelector("#trending_movies").appendChild(trendMovies)

    const trendTVs = buildCards(tvsResults, 4)
    document.querySelector("#trending_tvs").appendChild(trendTVs)

}

function buildCards(data, num){
    const resultArea = document.createElement("div")
    resultArea.classList.add("wrapper")

    for(let i = 0; i < num; i++){
        if(data[i]){
        const div = document.createElement("div")
        div.classList.add("cards")
        const img = document.createElement("img")
        img.setAttribute("src", `https://image.tmdb.org/t/p/w342/${data[i].poster_path}`)

        const media_type = document.createElement("p")
        media_type.innerText = data[i].media_type

        const title = document.createElement("h4")
        if(data[i].media_type === "tv"){
            let years = data[i].first_air_date
            years = years.substr(0, 4)
            title.innerText = `${data[i].name} (${years})`
        }else{
        let years = data[i].release_date
            years = years.substr(0, 4)
            title.innerText = `${data[i].title} (${years})`
            
            
        }

        div.appendChild(img)
        div.appendChild(title)
        div.appendChild(media_type)

        resultArea.appendChild(div)
        }
    }
    return resultArea
}

buildDefault()

async function searchByKeyword(keyword){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzE3YWM2NzUyZmQyMTdkMTAxMDk5YTA0MzhmN2NkMSIsIm5iZiI6MTcyMzA2NDAwMy44NjA4NDEsInN1YiI6IjY2YjNjZDhiY2M5Y2RiM2E5ZTdiOTU5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CW1uooWkLJQrD5VKNWsnFvnLu1IT-EflIS93rqwiiTk'
        }
        };
        
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=en-US&page=1`, options)
        const data = await response.json()
        return data.results
}

async function searchTrendingMovies(){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzE3YWM2NzUyZmQyMTdkMTAxMDk5YTA0MzhmN2NkMSIsIm5iZiI6MTcyMzA2NDAwMy44NjA4NDEsInN1YiI6IjY2YjNjZDhiY2M5Y2RiM2E5ZTdiOTU5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CW1uooWkLJQrD5VKNWsnFvnLu1IT-EflIS93rqwiiTk'
        }
        };

        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        const data = await response.json()
        return data.results
}

async function searchTrendingTVs(){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzE3YWM2NzUyZmQyMTdkMTAxMDk5YTA0MzhmN2NkMSIsIm5iZiI6MTcyMzA2NDAwMy44NjA4NDEsInN1YiI6IjY2YjNjZDhiY2M5Y2RiM2E5ZTdiOTU5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CW1uooWkLJQrD5VKNWsnFvnLu1IT-EflIS93rqwiiTk'
        }
        };
        
        const response = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
        const data = await response.json()
        return data.results
}

