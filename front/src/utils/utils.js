import React from 'react';

/**
 * Create url parameters from filter object
 *
 * @param {object} filter - filter object
 * @returns {string} parameters string
 */
export const urlParameters = (filter) => {
    const param = Object.keys(filter)
        .filter((key) => !['minPrice', 'maxPrice'].includes(key) && filter[key])
        .map((key) => `${key}=${filter[key]}`);

    if (filter.minPrice) param.push(`price[gt]=${filter.minPrice}`);

    if (filter.maxPrice) param.push(`price[lt]=${filter.maxPrice}`);

    const allParams = param.join('&');

    return allParams ? `?${allParams}` : "";
};

/**
 * convert EditorJS data to React HTML
 *
 * @param {object} blocks - EditorJS data
 * @returns {React} React HTML
 */
export const convertDataToHtml = (blocks) => {
    const convertedHtml = blocks.map((block, key) => {
        if (block.type === 'header') {
            return React.createElement(
                `h${block.data.level}`,
                null,
                block.data.text
            );
        } else if (block.type === 'paragraph') {
            return <p key={key}>{block.data.text}</p>;
        } else if (block.type === 'delimiter') {
            return <hr key={key} />;
        } else if (block.type === 'image') {
            return (
                <img
                    key={key}
                    src={block.data.file.url}
                    alt={block.data.caption}
                />
            );
        } else if (block.type === 'list') {
            const listItems = block.data.items.map((item, i) => (
                <li key={i}>{item}</li>
            ));
            return <ul key={key}>{listItems}</ul>;
        }
    });

    return <div className='editor-html'>{convertedHtml}</div>;
};
