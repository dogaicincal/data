const list = require("./info.json");

let throwList = [];

const checkNullAllProperty = () => {
    list.forEach(element => {
        if (element.code.length < 1) {
            throwList.push(`Code is null (index:${list.indexOf(element)})`);
        }
        if (element.name.length < 1) {
            throwList.push(`Name is null (index:${list.indexOf(element)})`);
        }
        if (element.song.length < 1) {
            throwList.push(`Song is null (index:${list.indexOf(element)})`);
        }
        if (element.year.length < 1) {
            throwList.push(`Year is null (index:${list.indexOf(element)})`);
        }
        if (element.director.length < 1) {
            throwList.push(`Director is null (index:${list.indexOf(element)})`);
        }
        if (element.video.youtubeCode.length < 1) {
            throwList.push(`YoutubeCode is null (index:${list.indexOf(element)})`);
        }
        if (element.video.youtubeLink.length < 1) {
            throwList.push(`YoutubeLink is null (index:${list.indexOf(element)})`);
        }
        if (element.artist.length < 1) {
            throwList.push(`Artist is null (index:${list.indexOf(element)})`);
        }

        element.artist.forEach(elementArtist => {
            if (elementArtist.name.length < 1) {
                throwList.push(`ArtistName is null (index:${list.indexOf(element)}-${element.artist.indexOf(elementArtist)})`);
            }
            if (elementArtist.country.length < 1) {
                throwList.push(`ArtistCountry is null (index:${list.indexOf(element)}-${element.artist.indexOf(elementArtist)})`);
            }
            if (elementArtist.city.length < 1) {
                throwList.push(`ArtistCity is null (index:${list.indexOf(element)}-${element.artist.indexOf(elementArtist)})`);
            }
            if (elementArtist.project.length < 1) {
                throwList.push(`ArtistProject is null (index:${list.indexOf(element)}-${element.artist.indexOf(elementArtist)})`);
            }
        });
    });
}

const checkCodeNumber = () => {
    for (let index = 0; index < list.length; index++) {
        if (list[index].code != `dic${index + 1}`) {
            throwList.push(`CodeNumber failed (index:${index.toString()})`);
        }
    }
}

const checkCodeUnique = () => {
    list.forEach(element => {
        if (list.filter(x => x.code == element.code).length !== 1) {
            throwList.push(`Code unique failed (index:${list.indexOf(element)})`);
        }
    });
}

const checkYoutubeCodeLength = () => {
    list.forEach(element => {
        if (element.video.youtubeCode.length !== 11) {
            throwList.push(`Youtube Code length failed (index:${list.indexOf(element)})`);
        }
    });
}

const checkProjectArtistMatch = () => {
    list.forEach(element => {
        element.artist.forEach(elementArtist => {
            elementArtist.project.forEach(elementProject => {
                if (!list.find(x => x.name == elementProject).artist.find(x => x.name == elementArtist.name)) {
                    throwList.push(`ArtistProject not match or not equal (index:${list.indexOf(element)}-${element.artist.indexOf(elementArtist)}-${elementArtist.name}-${elementProject})`);
                }
            });
        });
    });
}


checkNullAllProperty();
checkCodeNumber();
checkCodeUnique();
checkYoutubeCodeLength();
checkProjectArtistMatch();


if (throwList.length < 1) {
    console.log("Test Success.");
    return 0;
}
else {
    console.log("Test Failed! (Fail: " + throwList.length.toString() + ")\n");
    console.log(throwList.join("\n"));
    throw new Error('Test Failed!');
}