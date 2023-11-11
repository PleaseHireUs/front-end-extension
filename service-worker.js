chrome.runtime.onMessage.addListener(
    function(msg){
        alert('hi')
        result = msg.message;
        website = msg.website;
        //case for greenhouse
        if(website == 'greenhouse'){
            alert('in if statement')
            if(window.location.href.includes('confirmation')){
                console.log(result)
            }
        }
    }
)