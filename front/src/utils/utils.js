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
