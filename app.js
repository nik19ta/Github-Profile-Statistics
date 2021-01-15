const fetch = require('node-fetch');


async function get_stats(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const json = await response.json();
    return json
}

async function main(username) {
    let data = await get_stats(username);

    let languages = {};

    let main_size = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i]['language'] != null) {
            if (data[i]['language'] != 'null') {
                if (languages[data[i]['language']] == undefined) {
                    languages[data[i]['language']] = data[i]['size'];
                } else {
                    languages[data[i]['language']] = languages[data[i]['language']] + data[i]['size'];
                }
            }
        }
    }

    console.log('');
    console.log(`Статистика по языкам профиля ${username}:`);
    for (let key in languages) {
        main_size=main_size+languages[key];
    }
    console.log(`Всего ${main_size}`);
    console.log('');

    for (let key in languages) {
        console.log(`   ${key}: ${(languages[key]/main_size*100).toFixed(2)}%`);
    }
    console.log(' ');
}

// тест
main('nik19ta')
main('egorkaBurkenya')