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
                            {
                                "name": name,
                                "year": year, 
                                "email": email, 
                                "color":color
                            });
    console.log(resp);
    handleResponse(resp);
    
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
// First off we'd like to check for any errors available in the response and handle 
// Them accordingly.
res = resp.data
    if(res["errors"]){
    // Now we use a for in loop to handle these errors and display them in their 
    // appropraite spots

    for(itm in res["errors"]){
        $(`#${itm}-err`).text(res["errors"][itm]);
    }
    }
    else{
        $('#name-err').empty();
        $('#email-err').empty();
        $('#year-err').empty();
        $('#color-err').empty();
        $('#lucky-results').text(`
                                 Your lucky number is ${res.num.num} and a random fact about this number is (${res.num.fact}).
                                 Your birth year ${res.year.year}, and your birth fact is (${res.year.fact}).`)
    }
}


$("#lucky-form").on("submit", processForm);
