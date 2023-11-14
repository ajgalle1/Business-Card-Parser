document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = formData.get('businessCard');

    const businessCardLines = formValues.split(/[\r\n]/g);

    let fullName = await getNames(businessCardLines);  //await is necessary because I am using a fetch request which will cause sync/async issues
    let phoneNumber = getPhoneNumber(businessCardLines);
    let emailAddress = getEmailAddress(businessCardLines);

    const ans = `<p>Name:${fullName}<p>
                 <p>Phone:${phoneNumber}</p>
                 <p>Email:${emailAddress}</p>`;

    const ansDiv = document.querySelector('#ansDiv');
    ansDiv.innerHTML = ans;
});

function getPhoneNumber(card) {
    for (let i = 0; i < card.length; i++) {
        let checkThis = card[i].replace(/\D/g, "");
        if (checkThis.length >= 10) {
            return checkThis;
        }
    };
    return "No phone found";
}

function getEmailAddress(card) {
    for (let i = 0; i < card.length; i++) {
        if (card[i].includes("@")) {
            return card[i];
        }
    };
    return "No email found";
}

async function getNames(card) {
    //If the first word of this line on the business card is a common firstname, most likely this line is the full name.
    //As I do not want to maintain my own list of every possible firstname and nickname, I will make requests to an API service
    //This creates an issue where we have to wait for the data to return, hence these promises, await, and async language.

    let promises = [];

    for (let i = 0; i < card.length; i++) {
        let lineBrokenIntoWords = card[i].toLowerCase().split(' ');
        let potentialFirstName = lineBrokenIntoWords[0];
        let requestTerm = `https://api.genderize.io?name=${potentialFirstName}`;

        promises.push(
            fetch(requestTerm)
                .then(response => response.json())
                .then(data => {
                    if (data.count > 500) {  // 500 tends to be for actual names and not outliers in this API.
                        console.log(lineBrokenIntoWords[0] + " matched " + data.count);
                        console.log(card[i]);
                        return card[i];
                    }
                })
        );
    }

    let results = await Promise.all(promises);
    return results.find(result => result !== undefined);
}
