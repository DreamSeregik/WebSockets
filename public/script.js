var time1 = null
var str_len = 0


$(document).ready(() => {
    $("#input").keyup(() => {
        str_len = $("#input").val().trim().length
        $("#sim-count").html(str_len)        
    })
    var socket = new WebSocket("ws://127.0.0.1:4000")

    $(socket).on("open", () => {
        console.log("WebSocket Opend")
      })

    socket.onmessage = e => {
        var respone_time = new Date() - time1
        $("#messages").append("<li class = 'break-words text-2xl py-2 px-4'> <span class = 'text-red-600'>SERVER: </span>"+e.data+"</li>")    
        $("#messages").append("<li class = 'break-words text-2xl py-2 px-4'> <span class = 'text-blue-600'>LENGTH: </span>"+str_len+"</li>")  
        $("#messages").append("<li class = 'break-words text-2xl py-2 px-4'> <span class = 'text-blue-600'>RESPONE TIME: </span>"+respone_time+"</li>")      
    }  

    $("#form>button").click((e) => {
        e.preventDefault()
        var txt = $("#input").val().trim().toLowerCase()
        $("#messages").append("<li class = 'break-words py-2 px-4 text-2xl'> <span class = 'text-green-600'>YOU: </span>"+txt+"</li>") 
        $("#input").val("")                          
        time1 = new Date()
        socket.send(txt)
    })
})