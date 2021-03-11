/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {
    // Use teh evt item to prevent the default behaviour of a form which is to refresh the page
    // On submit.
    evt.preventDefault();
    // Collect all details from the input fields in the form
    name = $('#name').val();
    year = Number($('#year').val());
    email = $('#email').val();
    color = $('#color').val();

    resp = await axios.post(
                            "/api/get-lucky-num",
                            JSON.stringify({
                                "name": name,
                                "year": year, 
                                "email": email, 
                                "color":color}));
    console.log(resp);
    handleResponse(resp);
    
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
// First off we'd like to check for any errors available in the response and handle 
// Them accordingly.
    if(resp["errors"]){
    // Now we use a for in loop to handle these errors and display them in their 
    // appropraite spots

    for(itm in resp["errors"]){
        $(`#${itm}-err`).text(resp["errors"][itm]);
    }
    }
    else{
        $('#lucky-results').text(`
                                 Your lucky number is ${resp.num.num} and a random fact about this number is (${resp.num.fact}).
                                 Your birth year ${resp.year.year}, and your birth fact is (${resp.year.fact}).`)
    }
}


$("#lucky-form").on("submit", processForm);
