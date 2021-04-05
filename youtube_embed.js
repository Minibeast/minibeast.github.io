(function() {
    var reqURL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCihs2hxP4Y5bT-J2-35PQqg';
    fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(reqURL))
        .then((res) => {
            res.json()
                .then(data => {
                    var link = data.items[0].link;
                    var id = link.substr(link.indexOf('=')+1);
                    //document.getElementById("youtube_embed").setAttribute('src', 'https://youtube.com/embed/' + id );

                    document.querySelector('meta[property="og:site_name"]').setAttribute("content", "YouTube");
                    document.querySelector('meta[property="og:url"]').setAttribute("content", data.items[0].link);
                    document.querySelector('meta[property="og:title"]').setAttribute("content", data.items[0].title);
                    document.querySelector('meta[property="og:image"]').setAttribute("content", data.items[0].thumbnail);
                    document.querySelector('meta[property="og:video:url"]').setAttribute("content", 'https://youtube.com/embed/' + id);
                    document.querySelector('meta[property="og:video:secure_url"]').setAttribute("content", 'https://youtube.com/embed/' + id);


                });
        });
})();