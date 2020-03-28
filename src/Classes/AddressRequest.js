class AddressRequest {

    request(q){

        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        var request_url = api_url
            + '?'
            + 'key=' + process.env.VUE_APP_OCD_API_KEY
            + '&q=' + q
            + '&pretty=1'
            + '&no_annotations=1';

        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward

        let request = new XMLHttpRequest();
        let data;
        request.open('GET', request_url, true);

        request.onload = () => {
            // see full list of possible response codes:
            // https://opencagedata.com/api#codes

            if (request.status == 200){
                // Success!
                data = JSON.parse(request.responseText);
                return data.results[0];

            } else if (request.status <= 500){
                // We reached our target server, but it returned an error

                console.error("unable to geocode! Response code: " + request.status);
                data = JSON.parse(request.responseText);
                console.error(data.status.message);
            } else {
                console.error("server error");
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            console.warn("unable to connect to server");
        };

        request.send();  // make the request

    }


}
