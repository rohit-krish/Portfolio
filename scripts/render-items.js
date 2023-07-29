function createSection(title_str) {
    title = document.createElement('div');
    title.className = 'h2 pt-4 pb-2';
    title.textContent = title_str;

    section = document.createElement('div');
    section.appendChild(title)

    return section

}

function createRow() {
    row = document.createElement('div');
    row.className = 'row';

    return row;
}

function createCol(item, isArticle) {
    h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = item['title'];

    p1 = document.createElement('p');
    p1.className = 'card-text';
    p1.textContent = item['sub-title'];

    card_body = document.createElement('div');
    card_body.className = 'card-body';
    card_body.appendChild(h5);
    card_body.appendChild(p1);

    if (isArticle) {
        small = document.createElement('small');
        small.className = 'text-body-secondary';
        small.textContent = item['time'] + ' \u2022 ' + item['date']

        p2 = document.createElement('p');
        p2.className = 'card-text';
        p2.appendChild(small);

        card_body.appendChild(p2);
    }

    img = document.createElement('img');
    img.src = item['img-path'];
    img.alt = '...';
    img.className = 'card-img-top';

    card = document.createElement('div');
    card.className = 'card mb-3';
    card.appendChild(img);
    card.appendChild(card_body);
    card.addEventListener('click', function () {
        window.open(item['url'], '_blank')
    });
    card.style = 'cursor: pointer;';

    col = document.createElement('div');
    col.className = 'col';
    col.appendChild(card);

    col.className = 'col-sm-6 col-md-4';

    return col;
}

function renderIt(id, json_path, isArticle) {
    const article = document.getElementById(id);

    fetch(json_path)
        .then(response => response.json())
        .then(data => {
            // the sections only need for article page
            if (isArticle) {
                for (let sectionData of data) {
                    const section = createSection(sectionData['section-title']);
                    for (let row_item of sectionData['section-data']) {
                        const row = createRow();
                        for (let item of row_item) {
                            const col = createCol(item, isArticle);
                            row.appendChild(col);
                        }
                        section.appendChild(row);
                    }
                    article.appendChild(section);
                }
            } else {
                for (let row_item of data) {
                    row = createRow();
                    for (let item of row_item) {
                        col = createCol(item, isArticle);
                        row.appendChild(col);
                    }
                    article.appendChild(row);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
