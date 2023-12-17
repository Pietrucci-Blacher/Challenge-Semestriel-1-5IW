export const urlParameters = (filter) => {
    const param = Object.keys(filter)
        .filter(key => !['minPrice', 'maxPrice'].includes(key) && filter[key])
        .map(key => `${key}=${filter[key]}`)

    if (filter.minPrice)
        param.push(`price[gt]=${filter.minPrice}`);

    if (filter.maxPrice)
        param.push(`price[lt]=${filter.maxPrice}`);

    const allParams = param.join('&');

    return allParams ? `?${allParams}` : '';
}

// TODO : to improve
export const convertDataToHtml = (blocks) => {
    let convertedHtml = "";

    blocks.map(block => {
        switch (block.type) {
            case "header":
                convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                break;
            case "embded":
                convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
                break;
            case "paragraph":
                convertedHtml += `<p>${block.data.text}</p>`;
                break;
            case "delimiter":
                convertedHtml += "<hr />";
                break;
            case "image":
                convertedHtml += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
                break;
            case "list":
                convertedHtml += "<ul>";
                block.data.items.forEach(function(li) {
                    convertedHtml += `<li>${li}</li>`;
                });
                convertedHtml += "</ul>";
                break;
            default:
                console.log("Unknown block type", block.type);
                break;
        }
    });

    return convertedHtml;
}
