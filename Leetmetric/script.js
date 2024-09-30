document.addEventListener("DOMContentLoaded", function(){
    
const searchButton = document.getElementById("search-btn");
const usernameInput = document.getElementById("user-input");
const statsContainer = document.querySelector(".stats-contaner");
const easyProgessCircle = document.querySelector(".easy-progress");
const mediumProgessCircle = document.querySelector(".hard-progress");
const hardProgessCircle = document.querySelector(".stats-progress");
const easyLabel = document.getElementById("easy-label");
const mediumlabel = document.getElementById("medium-label");
const hardlabel = document.getElementById("hard-label");
const cardStatsContainer = document.querySelector(".stats-cards");

// return true or false based on a regex
function validateUsername(username){
    if(username.trim() === ""){
        alert("username should not be empty");
        return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
        alert("Invalid Username")
    }
    return isMatching;
}

async function fetchUserDetails(username){


    try{
         searchButton.textContent = "Searching...";
         searchButton.disabled = true;
          
          
         const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
         const targetUrl = 'https://leetcode.com/graphql/';
         
         const myHeaders = new Headers();
         myHeaders.append("content-type", "application/json");

         const graphql = JSON.stringify({
             query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
             variables: { "username": `${username}` }
         })
         const requestOptions = {
             method: "POST",
             headers: myHeaders,
             body: graphql
         };

         const response = await fetch( proxyUrl+targetUrl, requestOptions);


        //  const response = await fetch(url);

        if(!response.ok){
            throw new Error("Unable to fetch the user details");
        }
        const data = await response.json();
        console.log("Logging data:", data);
    }
    catch(error){
        statsContainer.innerHTML = `<p> No data found </p>`
    }
    finally {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}

searchButton.addEventListener('click', function(){
    const username = usernameInput.value;
    console.log("logging username", username);
    if(validateUsername(username)){
       fetchUserDetails(username);
    }
})

})