//set the JSON source URL
const requestURL = 'https://byui-cit230.github.io/canvas-referenced/latter-day-prophets.json';
// use fetch to obtain a promise for
fetch(requestURL).then(function (response){
    return response.json();
})
.then(function (jsonObject) {
    //console.table(jsonObject);//temporary checking for valid response and data parsing

    const prophets = jsonObject['prophets'];
    console.log(prophets);
   // console.log(typeof(prophets)); to check if it works

   //for(let i=0; i< prophets.length; i++){

   //}
// select output location 
   const cards = document.querySelector('.cards');
//for each element of the array prophets do this =>
   prophets.forEach(prophet => {
       let card = document.createElement('section');
       let h2 = document.createElement('h2');
//use template literals
       h2.innerHTML= `${prophet.name} <span style="color:navy">${prophet.lastname}</span>`;
       card.append(h2);
       cards.append(card);

   });



   // select output location 
   

   const utah = document.querySelector('.utah');
   //look for the prophets that born in utah
   const utahfilter = prophets.filter(utahprophet => utahprophet.birthplace == "Utah");

   utahfilter.forEach(utahprophet =>{
       let card = document.createElement('section');
       let h2 = document.createElement('h2');
       let pimg = document.createElement('img');

       h2.innerHTML = `${utahprophet.name} ${utahprophet.lastname}`;
       pimg.setAttribute('src',utahprophet.imageurl);
       pimg.setAttribute('alt',`Portrait of ${utahprophet.name} who was born in ${utahprophet.birthplace} in the year ${utahprophet.birthdate.substring(utahprophet.birthdate.length - 4)}! `)
       pimg.style.boxShadow= '0 0 30px #333';
       pimg.style.width = '200px';

       card.append(h2);
       card.append(pimg);
       utah.append(card);





   });

   
});

