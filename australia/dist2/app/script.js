let getRequest = (cmd, name, id) => {
    return new Promise((resolve) => {        
        if(cmd === 'region') {
            console.log(cmd, name, id)
            $.get('http://nelis.ru/sandbox/test-api/api.php', { cmd: cmd, name: name, id: id})
            .done((response)=> {
                resolve (response);
            }); 
            
        } else  if (cmd === 'city') {
            $.get('http://nelis.ru/sandbox/test-api/api.php', { cmd: cmd, id: id})
            .done((response)=> {
                resolve (response);
            });  
        }
    });
}
let get = async (id, cityList) => {
    let data = await getRequest('city', null, id);
    $(cityList).text(data.data.join(', '));
}

(function( $ ){
    $.fn.geoSelector = function(regionList, cityList, id) {

       $(this).change( async () => {
            $(cityList).empty();
           let name = this.val();
           let data = await getRequest('region', name, null);
           data.data.forEach((region) => {
                let $newDiv = $('<div>' + region.name  + '</div>')
                $newDiv.attr('id', region.id);
                $newDiv.click( async (event) => {

                    $(regionList).empty();
                    get(event.target.id, cityList);
                });
               $(regionList).append($newDiv);
           });             
       });
       if (id) {
            get(id, cityList);
       }       
       return this;
    }; 
 })( jQuery );