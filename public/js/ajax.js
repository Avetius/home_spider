/**
 * Created by sirius on 7/10/17.
 */
(function(){
    $.ajax({
        type: "POST",
        url: "37.186.125.22:8088/gate/open/1",
        data: data,
        success: success,
        dataType: dataType
    });
})
