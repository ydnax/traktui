(function(){

var apikey      = "apikey";
var activities  = "js/data.json";
//var activities  = "http://api.trakt.tv/activity/user.json/"+apikey+"/xandy/?callback=?";

var trakt = function(){
    console.log("hey! :)");
    $.getJSON(activities, function(data) {
        //console.log(data);
        data.activity.forEach(function(i){
            printActivity(i, $("#content"));
        });
    });
};
var printActivity = function(activity, where){
    //console.log(activity.action);
    //console.log(activity);
    var image;
    switch(activity.type){
    case 'movie':
        where.append(printMovie(activity));
    break;
    case 'episode':
        where.append(printEpisode(activity));
    break;
    case 'show':
        where.append(printShow(activity));
    break;
    default:
        console.log(activity);
        console.error("unknown activity");
    }
};

var printEpisode = function(activity){
    var image = activity.show.images.poster;
    var title = activity.show.title + ' - ' + activity.episode.title;
    var description = activity.episode.overview;
    return genInfobox(title, description, image, activity.action, activity);
};

var printMovie = function(activity){
    var image  = activity.movie.images.poster;
    var info   = activity.movie;
    var title  =info.title;
    var description = info.overview;
    return genInfobox(title, description, image, activity.action, activity);
};

var printShow = function(activity){
    var image = activity.show.images.poster;
    var title = activity.show.title;
    var description = activity.show.overview;
    return genInfobox(title, description, image, activity.action, activity);
};

var genInfobox = function(title, text, image, action, activity){
    console.log(action);
    console.log(activity);
    var icont  = $('<div class="span2 thumbnail">')
        .append('<h5>'       + title + '</h5>')
        .append('<img src="' + image + '"/>')
        .append(action);
    var infocont = $('<div class="span5">')
        .append('<h5>'+title+'</h5>')
        .append('<p>'+text+'</p>');
    var row = $('<div class="row well">')
        .append(icont)
        .append(infocont);
    return row;
};

trakt();

})();